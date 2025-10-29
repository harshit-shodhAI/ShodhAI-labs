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

    // 6. Convert File to Buffer for Supabase upload
    const arrayBuffer = await resumeFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 7. Sanitize filename
    const sanitizedFilename = resumeFile.name.replace(/[^a-zA-Z0-9-._]/g, "_");

    // 8. Create unique resume path
    const resumePath = `public/resumes/${
      details.email
    }/${Date.now()}-${sanitizedFilename}`;

    // 9. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("applications")
      .upload(resumePath, buffer, {
        contentType: resumeFile.type || "application/pdf",
        upsert: false,
      });

    if (uploadError) {
      throw new Error(`Resume Upload Failed: ${uploadError.message}`);
    }

    // 10. Insert data into database
    const applicationData = {
      ...details,
      score: score,
      resume: resumePath,
    };

    const { error: insertError } = await supabase
      .from("application")
      .insert(applicationData);

    if (insertError) {
      // Clean up uploaded file if database insert fails
      await supabase.storage.from("applications").remove([resumePath]);
      throw new Error(`Database Insert Failed: ${insertError.message}`);
    }

    // 11. Return success response
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
