import { FormSelect } from "@/components/common/FormSelect";
import { useApplicationFormStore } from "@/features/application/application.store";

const projectOptions = [
  "SMILES-2-vec: Molecular Representation Learning",
  "LLM Memory Framework",
  "Simulation based LLM Test Suite",
  "Swarm Intelligence in Multi-Agent Robotics",
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
      <div className="text-sm leading-relaxed">
        <p className="mb-2">
          Select your preferred projects for the internship. We have three
          projects available:
        </p>
        <ol className="list-decimal list-inside space-y-2 mb-4">
          <li>
            <strong>SMILES-2-vec: Molecular Representation Learning</strong> —
            Learn representations of SMILES into vector space in a generalized
            manner to predict corresponding chemical properties.
          </li>
          <li>
            <strong>LLM Memory Framework</strong> — A framework for managing
            memory in large language models; inspiration will draw from
            relation-related and time-related memory streams.
          </li>
          <li>
            <strong>Simulation based LLM Test Suite</strong> — Develop a test
            suite that uses simulations to evaluate the performance of large
            language models in various scenarios.
          </li>
          <li>
            <strong>Swarm Intelligence in Multi-Agent Robotics</strong> — Study
            coordination and collective behavior in autonomous quadruped robots
            using Raspberry Pi, ROS, and Gazebo. The project explores how
            decentralized swarm systems compare to centrally guided teams in
            dynamic, football-based simulations.
          </li>
        </ol>
        <p>
          Please choose your first and second choice projects from the dropdowns
          below.
        </p>
      </div>
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
