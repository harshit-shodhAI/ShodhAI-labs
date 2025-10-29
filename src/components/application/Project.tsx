import { FormSelect } from "@/components/common/FormSelect";
import { useApplicationFormStore } from "@/features/application/application.store";

const projectOptions = [
  "SMILES-2-vec: Molecular Representation Learning",
  "LLM Memory Framework",
  "Simulation based LLM Test Suite",
];

export const ProjectSelectionSection = () => {
  const { form, handleChange, errors } = useApplicationFormStore();
  const { projectSelection } = form;
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleChange("projectSelection", e.target.name, e.target.value);
  };

  return (
    <div className="card p-6 sm:p-8 flex flex-col gap-4">
      <h2
        className="text-lg font-bold"
        style={{ color: "var(--text-headings)" }}
      >
        Section 2: Project Selection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-4">
        <FormSelect
          label="First Choice Project"
          name="firstChoiceProject"
          value={projectSelection.firstChoiceProject}
          onChange={handleSelectChange}
          error={errors.firstChoiceProject}
        >
          <option value="" disabled>
            Select a project
          </option>
          {projectOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </FormSelect>
        <FormSelect
          label="Second Choice Project"
          name="secondChoiceProject"
          isOptional
          value={projectSelection.secondChoiceProject || ""}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Select a project
          </option>
          {projectOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </FormSelect>
      </div>
    </div>
  );
};
