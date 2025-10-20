export default function Card({ className = "", ...props }) {
  return (
    <div
      className={
        "bg-white rounded-2xl shadow-[0_2px_6px_rgba(0,0,0,0.04)] border border-neutral-200/70 card-hover " +
        className
      }
      {...props}
    />
  );
}