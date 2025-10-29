import { FileUpload } from "@/components/common/FileUpload";
import { FormTextarea } from "@/components/common/FormTextArea";
import { useApplicationFormStore } from "@/features/application/application.store";

export const DocumentsSection = () => {
  const { form, handleChange, handleFileChange, errors } =
    useApplicationFormStore();
  const { documents } = form;
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange("documents", e.target.name, e.target.value);
  };

  return (
    <div className="card p-6 sm:p-8 flex flex-col gap-4">
      <h2
        className="text-lg font-bold"
        style={{ color: "var(--text-headings)" }}
      >
        Section 5: Resume and Cover Letter
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-4">
        <FileUpload
          label="Resume / CV Upload"
          name="resume"
          fileName={documents.resume?.name || null}
          onChange={handleFileChange}
          instructions="Please upload your resume or CV in PDF format only (max 512 KB)."
          error={errors.resume}
        />
        <FormTextarea
          label="Cover Letter"
          name="coverLetter"
          value={documents.coverLetter}
          onChange={handleTextAreaChange}
          instructions="Please type or paste your cover letter below (250-400 words recommended)."
          error={errors.coverLetter}
        />
      </div>
    </div>
  );
};
