
export default function Textarea(props) {
  return (
    <textarea
      {...props}
      className={
        "w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none min-h-[100px] " +
        "focus:ring-2 focus:ring-orange-300 focus:border-orange-400"
      }
    />
  );
}
