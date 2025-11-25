import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase";

export async function POST(request: NextRequest) {
  try {
    // 1. Initialize Supabase Client
    const supabase = await createClient();

    // 2. Parse FormData (native Web API - no formidable needed!)
    const formData = await request.formData();

    // 3. Extract data from FormData
    const resumeFile = formData.get("resume") as File | null;
    const detailsString = formData.get("details") as string | null;
    const scoreString = formData.get("score") as string | null;

    // 4. Validate required fields
    if (!resumeFile || !detailsString || !scoreString) {
      return NextResponse.json(
        { error: "Missing required fields: resume, details, or score." },
        { status: 400 }
      );
    }

    // 5. Parse the details JSON
    const details = JSON.parse(detailsString);
    const score = scoreString;

    // Log the request for debugging
    console.log(`[API /apply] Request received for email: ${details.email}`);
    console.log(`[API /apply] Resume file: ${resumeFile.name}, Size: ${resumeFile.size} bytes`);

    // 6. Check if application already exists (email is primary key)
    const { data: existingApp } = await supabase
      .from("application")
      .select("email")
      .eq("email", details.email)
      .single();

    if (existingApp) {
      console.log(`[API /apply] Duplicate submission blocked for: ${details.email}`);
      return NextResponse.json(
        { error: "An application with this email has already been submitted." },
        { status: 409 } // Conflict status
      );
    }

    // 7. Convert File to Buffer for Supabase upload
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 8. Sanitize filename
    const sanitizedFilename = resumeFile.name.replace(/[^a-zA-Z0-9-._]/g, "_");

    // 9. Create unique resume path (removed 'public/' prefix since bucket is public)
    const resumePath = `resumes/${details.email}/${Date.now()}-${sanitizedFilename}`;

    console.log(`[API /apply] Uploading resume to: ${resumePath}`);

    // 10. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("applications")
      .upload(resumePath, buffer, {
        contentType: resumeFile.type || "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Resume Upload Failed: ${uploadError.message}`);
    }

    // 11. Get public URL for the resume
    const { data: publicUrlData } = supabase.storage
      .from("applications")
      .getPublicUrl(resumePath);

    if (!publicUrlData?.publicUrl) {
      // Clean up uploaded file if we can't get public URL
      await supabase.storage.from("applications").remove([resumePath]);
      throw new Error("Failed to generate public URL for resume");
    }

    // 12. Insert data into database with correct data types
    // Explicitly destructure only the fields we need to prevent cached/old fields from being sent
    const applicationData = {
      firstName: details.firstName,
      lastName: details.lastName,
      email: details.email,
      phone: parseInt(details.phone, 10), // Convert phone to numeric
      linkedin: details.linkedin || null,
      city: details.city,
      country: details.country,
      dob: details.dob,
      firstChoiceProject: details.firstChoiceProject,
      secondChoiceProject: details.secondChoiceProject || null,
      institution: details.institution,
      degreeProgram: details.degreeProgram,
      yearOfStudy: details.yearOfStudy,
      currentGrade: details.currentGrade,
      graduationDate: details.graduationDate,
      skills: details.skills,
      previousExperience: details.previousExperience || null,
      publicationsPatents: details.publicationsPatents || null,
      coverLetter: details.coverLetter || null,
      score: parseInt(score, 10), // Convert to number
      resume: publicUrlData.publicUrl, // Store the public download URL
    };

    const { error: insertError } = await supabase
      .from("application")
      .insert(applicationData);

    if (insertError) {
      // Clean up uploaded file if database insert fails
      await supabase.storage.from("applications").remove([resumePath]);
      throw new Error(`Database Insert Failed: ${insertError.message}`);
    }

    // 13. Return success response
    return NextResponse.json(
      { message: "Application submitted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Route Error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An internal server error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
