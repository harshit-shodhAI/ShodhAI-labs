type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  isOptional?: boolean;
  error?: string;
};

export const FormInput = ({ label, isOptional, error, ...props }: Props) => (
  <label className="flex flex-col">
    <p className="form-label">
      {label} {isOptional && <span className="text-text-body">(Optional)</span>}
    </p>
    <input
      className={`form-input ${error ? "border-red-400" : "border-border"}`}
      {...props}
    />
    {error && <p className="text-red-400">{error}</p>}
  </label>
);
