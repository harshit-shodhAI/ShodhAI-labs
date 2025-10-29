import { FormInput } from "@/components/common/FormInput";
import { useApplicationFormStore } from "@/features/application/application.store";

export const BasicDetailsSection = () => {
  const { form, handleChange, errors } = useApplicationFormStore();
  const { basicDetails } = form;
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange("basicDetails", e.target.name, e.target.value);
  };

  return (
    <div className="card p-6 sm:p-8 flex flex-col gap-4">
      <h2
        className="text-lg font-bold"
        style={{ color: "var(--text-headings)" }}
      >
        Section 1: Basic Details
      </h2>
      <p>
        Let&apos;s start with the basics. Please fill out your personal
        information.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-4">
        <FormInput
          label="First Name"
          name="firstName"
          value={basicDetails.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
        />
        <FormInput
          label="Last Name"
          name="lastName"
          value={basicDetails.lastName}
          onChange={handleInputChange}
          error={errors.lastName}
        />
        <FormInput
          label="Email Address"
          name="email"
          type="email"
          value={basicDetails.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={basicDetails.phone}
          onChange={handleInputChange}
          error={errors.phone}
        />
        <div className="sm:col-span-2">
          <FormInput
            label="LinkedIn Profile"
            name="linkedin"
            isOptional
            value={basicDetails.linkedin || ""}
            onChange={handleInputChange}
          />
        </div>
        <FormInput
          label="City"
          name="city"
          value={basicDetails.city}
          onChange={handleInputChange}
          error={errors.city}
        />
        <FormInput
          label="Country"
          name="country"
          value={basicDetails.country}
          onChange={handleInputChange}
          error={errors.country}
        />
        <FormInput
          label="Date of Birth"
          name="dob"
          type="date"
          value={basicDetails.dob}
          onChange={handleInputChange}
          error={errors.dob}
        />
        <FormInput
          label="Nationality"
          name="nationality"
          value={basicDetails.nationality}
          onChange={handleInputChange}
          error={errors.nationality}
        />
      </div>
    </div>
  );
};
