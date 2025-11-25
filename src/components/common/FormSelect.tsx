import React from "react";

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  children: React.ReactNode;
  isOptional?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  error,
  children,
  isOptional,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-2 text-sm font-semibold text-[var(--text-primary)] ml-1">
        {label} {isOptional && <span className="text-[var(--text-secondary)] font-normal">(Optional)</span>}
      </label>
      <div className="relative">
        <select
          className={`w-full appearance-none rounded-lg border bg-white px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:ring-1 transition-all duration-200
            ${error
              ? "border-[var(--border-error)] focus:border-[var(--border-error)] focus:ring-[var(--border-error)]"
              : "border-[var(--border-default)] focus:border-[var(--border-focus)] focus:ring-[var(--border-focus)]"
            }`}
          {...props}
        >
          {children}
        </select>
        {/* Chevron Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[var(--text-secondary)]">
          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
        </div>
      </div>
      {error && <span className="text-xs text-[var(--text-error)] mt-1.5 ml-1 font-medium">{error}</span>}
    </div>
  );
};