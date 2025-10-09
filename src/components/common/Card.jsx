
export default function Card({ className = "", ...props }) {
  return (
    <div className={"bg-white rounded-2xl shadow-sm border border-neutral-200 " + className} {...props} />
  );
}
