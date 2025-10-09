
export default function Badge({ color = "gray", children }) {
  const palette = {
    gray: "bg-neutral-100 text-neutral-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
    yellow: "bg-yellow-100 text-yellow-700",
    blue: "bg-blue-100 text-blue-700",
    orange: "bg-orange-100 text-orange-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${palette[color]}`}>
      {children}
    </span>
  );
}
