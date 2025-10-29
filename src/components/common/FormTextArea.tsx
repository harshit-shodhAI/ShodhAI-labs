type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  instructions: string;
  rows?: number;
  error?: string;
};

export const FormTextarea = ({
  label,
  instructions,
  error,
  ...props
}: Props) => (
  <label className="flex flex-col sm:col-span-2">
    <p className="form-label">{label}</p>
    <textarea
      className={`form-textarea ${error ? "border-red-400" : "border-border"}`}
      rows={5}
      {...props}
    />
    <p className="mt-1 text-sm text-text-body">{instructions}</p>
    {error && <p className="text-red-400">{error}</p>}
  </label>
);
