import React from "react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isOptional?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  isOptional,
  className = "",
  ...props
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-2 text-sm font-semibold text-[var(--text-primary)] ml-1">
        {label} {isOptional && <span className="text-[var(--text-secondary)] font-normal">(Optional)</span>}
      </label>
      <input
        className={`w-full rounded-lg border bg-white px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-placeholder)] focus:outline-none focus:ring-1 transition-all duration-200 
          ${error
            ? "border-[var(--border-error)] text-[var(--text-error)] focus:border-[var(--border-error)] focus:ring-[var(--border-error)]"
            : "border-[var(--border-default)] focus:border-[var(--border-focus)] focus:ring-[var(--border-focus)]"
          } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-[var(--text-error)] mt-1.5 ml-1 font-medium">{error}</span>}
    </div>
  );
};