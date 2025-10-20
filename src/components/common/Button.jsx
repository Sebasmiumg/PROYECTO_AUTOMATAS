export default function Button({ className = "", variant = "primary", ...props }) {
  const base = "inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium transition active:scale-[.98] disabled:opacity-60 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm",
    ghost: "bg-transparent text-neutral-800 hover:bg-neutral-100 border border-neutral-300",
    subtle: "bg-neutral-900 text-white hover:bg-neutral-800",
  };
  return (
    <button className={`${base} ${variants[variant] || variants.primary} ${className}`} {...props}/>
  );
}