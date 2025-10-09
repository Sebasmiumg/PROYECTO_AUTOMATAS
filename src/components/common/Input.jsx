
export default function Input(props) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none " +
        "focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
      }
    />
  );
}
