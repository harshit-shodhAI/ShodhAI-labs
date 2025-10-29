import { ApplicationFormState } from "@/features/application/application.model";
const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "";

type ServiceResponse = Promise<[string | null, string | null]>;

export const submitApplication = async (
  form: ApplicationFormState["form"],
  score: number
): ServiceResponse => {
  try {
    if (!form.documents.resume) {
      return [null, "Resume file is missing. Please select a file to upload."];
    }

    const formData = new FormData();
    formData.append("resume", form.documents.resume);
    formData.append("score", String(score));
    const otherDetails = {
      ...form.basicDetails,
      ...form.projectSelection,
      ...form.education,
      ...form.experience,
      coverLetter: form.documents.coverLetter,
    };
    formData.append("details", JSON.stringify(otherDetails));

    const response = await fetch(`${API_BASE_URL}/api/apply`, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || "An unknown error occurred on the server."
      );
    }

    return [result.message, null];
  } catch (error) {
    console.error("Application submission service failed:", error);
    if (error instanceof Error) {
      return [null, error.message];
    }
    return [null, "An unexpected error occurred. Please try again."];
  }
};
