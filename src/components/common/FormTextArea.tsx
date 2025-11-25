import React from "react";

interface FormTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  instructions?: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  error,
  instructions,
  ...props
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-2 text-sm font-semibold text-[var(--text-primary)] ml-1">
        {label}
      </label>
      <textarea
        className={`w-full rounded-lg border bg-white px-4 py-3 text-[var(--text-primary)] placeholder-[var(--text-placeholder)] focus:outline-none focus:ring-1 h-32 resize-none transition-all duration-200
          ${error
            ? "border-[var(--border-error)] focus:border-[var(--border-error)] focus:ring-[var(--border-error)]"
            : "border-[var(--border-default)] focus:border-[var(--border-focus)] focus:ring-[var(--border-focus)]"
          }`}
        {...props}
      />
      {instructions && !error && (
        <span className="text-xs text-[var(--text-secondary)] mt-1.5 ml-1">{instructions}</span>
      )}
      {error && <span className="text-xs text-[var(--text-error)] mt-1.5 ml-1 font-medium">{error}</span>}
    </div>
  );
};