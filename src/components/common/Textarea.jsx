
export default function Textarea({ label, className = "", ...props }) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm font-medium text-neutral-700">{label}</div>}
      <textarea className={`w-full rounded-xl border border-neutral-300 px-3 py-2 focus:border-orange-500 transition ${className}`} {...props} />
    </label>
  );
}
