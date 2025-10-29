type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  isOptional?: boolean;
  children: React.ReactNode;
  error?: string;
};

export const FormSelect = ({
  label,
  isOptional,
  error,
  children,
  ...props
}: Props) => (
  <label className="flex flex-col">
    <p className="form-label">
      {label} {isOptional && <span className="text-text-body">(Optional)</span>}
    </p>
    <select
      className={`form-select ${error ? "border-red-400" : "border-border"}`}
      {...props}
    >
      {children}
    </select>
    {error && <p className="text-red-400">{error}</p>}
  </label>
);
