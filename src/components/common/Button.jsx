
export default function Button({ className = "", ...props }) {
  return (
    <button
      className={
        "px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 " +
        "shadow-sm transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed " +
        className
      }
      {...props}
    />
  );
}
