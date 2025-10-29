import { FormTextarea } from "@/components/common/FormTextArea";
import { useApplicationFormStore } from "@/features/application/application.store";

export const ExperienceSection = () => {
  const { form, handleChange, errors } = useApplicationFormStore();
  const { experience } = form;
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleChange("experience", e.target.name, e.target.value);
  };

  return (
    <div className="card p-6 sm:p-8 flex flex-col gap-4">
      <h2
        className="text-lg font-bold"
        style={{ color: "var(--text-headings)" }}
      >
        Section 4: Experience and Publications
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-4">
        <FormTextarea
          label="Skills"
          name="skills"
          value={experience.skills}
          onChange={handleTextAreaChange}
          instructions="List technical skills (e.g., Python, MATLAB, PCR, SolidWorks)."
          error={errors.skills}
        />
        <FormTextarea
          label="Previous Experience (Optional)"
          name="previousExperience"
          value={experience.previousExperience || ""}
          onChange={handleTextAreaChange}
          instructions="List relevant experience (position, organization, dates, responsibilities)."
        />
        <FormTextarea
          label="Publications & Patents (Optional)"
          name="publicationsPatents"
          value={experience.publicationsPatents || ""}
          onChange={handleTextAreaChange}
          instructions="Use a standard citation format. If none, leave blank."
        />
      </div>
    </div>
  );
};
