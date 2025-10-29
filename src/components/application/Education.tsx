import { FormInput } from "@/components/common/FormInput";
import { useApplicationFormStore } from "@/features/application/application.store";

export const EducationSection = () => {
  const { form, handleChange, errors } = useApplicationFormStore();
  const { education } = form;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("education", e.target.name, e.target.value);
  };

  return (
    <div className="card p-6 sm:p-8 flex flex-col gap-4">
      <h2
        className="text-lg font-bold"
        style={{ color: "var(--text-headings)" }}
      >
        Section 3: Education
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-4">
        <FormInput
          label="Current Institution"
          name="institution"
          value={education.institution}
          onChange={handleInputChange}
          placeholder="e.g., University of Toronto"
          error={errors.institution}
        />
        <FormInput
          label="Degree Program"
          name="degreeProgram"
          value={education.degreeProgram}
          onChange={handleInputChange}
          placeholder="e.g., B.S. in Biology"
          error={errors.degreeProgram}
        />
        <FormInput
          label="Current Year of Study"
          name="yearOfStudy"
          value={education.yearOfStudy}
          onChange={handleInputChange}
          placeholder="e.g., 3rd Year"
          error={errors.yearOfStudy}
        />
        <FormInput
          label="Current CGPA / Grade"
          name="currentGrade"
          value={education.currentGrade}
          onChange={handleInputChange}
          placeholder="e.g., 8.5/10 or 3.8/4.0"
          error={errors.currentGrade}
        />
        <FormInput
          label="Expected Graduation Date"
          name="graduationDate"
          type="month"
          value={education.graduationDate}
          onChange={handleInputChange}
          error={errors.graduationDate}
        />
      </div>
    </div>
  );
};
