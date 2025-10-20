
export default function GhostButton({ className = "", ...props }) {
  return (
    <button
      className={
        "px-3 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-50 transition text-neutral-700 " +
        className
      }
      {...props}
    />
  );
}
