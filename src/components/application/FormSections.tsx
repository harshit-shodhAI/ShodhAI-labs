import { FormInput } from "@/components/common/FormInput";
import { FormTextArea } from "@/components/common/FormTextArea";
import { FormSelect } from "@/components/common/FormSelect";
import { useApplicationFormStore } from "@/features/application/application.store";

// --- BASIC DETAILS ---
export const BasicDetailsSection = () => {
  const { form, handleChange, errors } = useApplicationFormStore();
  const { basicDetails } = form;

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          name="firstName"
          value={basicDetails.firstName}
          onChange={(e) =>
            handleChange("basicDetails", "firstName", e.target.value)
          }
          error={errors.firstName}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          value={basicDetails.lastName}
          onChange={(e) =>
            handleChange("basicDetails", "lastName", e.target.value)
          }
          error={errors.lastName}
        />
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={basicDetails.email}
          onChange={(e) =>
            handleChange("basicDetails", "email", e.target.value)
          }
          error={errors.email}
        />
        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={basicDetails.phone}
          onChange={(e) =>
            handleChange("basicDetails", "phone", e.target.value)
          }
          error={errors.phone}
        />
        <div className="md:col-span-2">
          <FormInput
            label="LinkedIn Profile"
            name="linkedin"
            isOptional
            value={basicDetails.linkedin || ""}
            onChange={(e) =>
              handleChange("basicDetails", "linkedin", e.target.value)
            }
          />
        </div>
        <FormInput
          label="Date of Birth"
          name="dob"
          type="date"
          value={basicDetails.dob}
          onChange={(e) => handleChange("basicDetails", "dob", e.target.value)}
          error={errors.dob}
        />
        <FormInput
          label="City"
          name="city"
          value={basicDetails.city}
          onChange={(e) => handleChange("basicDetails", "city", e.target.value)}
          error={errors.city}
        />
        <FormInput
          label="Country"
          name="country"
          value={basicDetails.country}
          onChange={(e) =>
            handleChange("basicDetails", "country", e.target.value)
          }
          error={errors.country}
        />
      </div>
    </div>
  );
};

// --- EDUCATION ---
export const EducationSection = () => {
  const { form, handleChange, errors } = useApplicationFormStore();
  const { education } = form;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormInput
        label="Current Institution"
        name="institution"
        value={education.institution}
        onChange={(e) =>
          handleChange("education", "institution", e.target.value)
        }
        placeholder="e.g. IIT Bombay"
        error={errors.institution}
      />
      <FormInput
        label="Degree Program"
        name="degreeProgram"
        value={education.degreeProgram}
        onChange={(e) =>
          handleChange("education", "degreeProgram", e.target.value)
        }
        placeholder="e.g. B.Tech Computer Science"
        error={errors.degreeProgram}
      />
      <FormInput
        label="Current Year"
        name="yearOfStudy"
        value={education.yearOfStudy}
        onChange={(e) =>
          handleChange("education", "yearOfStudy", e.target.value)
        }
        placeholder="e.g. 3rd Year"
        error={errors.yearOfStudy}
      />
      <FormInput
        label="Current CGPA"
        name="currentGrade"
        value={education.currentGrade}
        onChange={(e) =>
          handleChange("education", "currentGrade", e.target.value)
        }
        placeholder="e.g. 8.5/10"
        error={errors.currentGrade}
      />
      <FormInput
        label="Expected Graduation Date"
        name="graduationDate"
        type="date"
        value={education.graduationDate}
        onChange={(e) =>
          handleChange("education", "graduationDate", e.target.value)
        }
        error={errors.graduationDate}
      />
    </div>
  );
};

// --- PROJECTS ---
const projectOptions = [
  "SMILES-2-vec: Molecular Representation Learning",
  "LLM Memory Framework",
  "Simulation based LLM Test Suite",
  "Material Generation and property prediction",
];

export const ProjectSelectionSection = () => {
  const { form, handleChange, errors } = useApplicationFormStore();
  const { projectSelection } = form;

  return (
    <div className="flex flex-col gap-6">
      {/* Project Description Box */}
      <div className="bg-[var(--neutral-50)] border border-[var(--border-default)] rounded-lg p-5 text-sm text-[var(--text-secondary)] leading-relaxed">
        <p className="font-semibold text-[var(--text-primary)] mb-2">
          Available Projects:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>SMILES-2-vec:</strong> Molecular representation learning.
          </li>
          <li>
            <strong>LLM Memory:</strong> Relation and time-related memory
            streams.
          </li>
          <li>
            <strong>Sim-based LLM Test:</strong> Evaluate LLMs via simulation.
          </li>
          <li>
            <strong>Swarm Intelligence:</strong> Multi-agent robotics
            (ROS/Gazebo).
          </li>
          <li>
            <strong>Material Generation:</strong> Generative models for new
            materials.
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormSelect
          label="First Choice Project"
          name="firstChoiceProject"
          value={projectSelection.firstChoiceProject}
          onChange={(e) =>
            handleChange(
              "projectSelection",
              "firstChoiceProject",
              e.target.value
            )
          }
          error={errors.firstChoiceProject}
        >
          <option value="" disabled>
            Select your primary preference
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
          onChange={(e) =>
            handleChange(
              "projectSelection",
              "secondChoiceProject",
              e.target.value
            )
          }
        >
          <option value="" disabled>
            Select your secondary preference
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

// --- EXPERIENCE ---
export const ExperienceSection = () => {
  const { form, handleChange, errors } = useApplicationFormStore();
  const { experience } = form;

  return (
    <div className="flex flex-col gap-6">
      <FormTextArea
        label="Technical Skills"
        name="skills"
        value={experience.skills}
        onChange={(e) => handleChange("experience", "skills", e.target.value)}
        instructions="e.g. Python, PyTorch, React, CAD"
        error={errors.skills}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormTextArea
          label="Previous Experience (Optional)"
          name="previousExperience"
          value={experience.previousExperience || ""}
          onChange={(e) =>
            handleChange("experience", "previousExperience", e.target.value)
          }
          instructions="Briefly list roles and dates."
        />
        <FormTextArea
          label="Publications (Optional)"
          name="publicationsPatents"
          value={experience.publicationsPatents || ""}
          onChange={(e) =>
            handleChange("experience", "publicationsPatents", e.target.value)
          }
          instructions="Links or citations."
        />
      </div>
    </div>
  );
};
