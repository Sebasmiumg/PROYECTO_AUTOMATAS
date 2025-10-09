
import GhostButton from "../components/common/GhostButton.jsx";

export default function TopNav({ tab, setTab }) {
  const tabs = [
    { key: "chat", label: "Chat" },
    { key: "history", label: "Historial" },
    { key: "track", label: "Rastreo" },
    { key: "rewards", label: "Recompensas" },
    { key: "admin", label: "Admin" },
  ];
  return (
    <div className="w-full sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-orange-500 text-white">🍽️</span>
          <span>Restaurante Sabores</span>
        </div>
        <div className="ml-auto flex items-center gap-1">
          {tabs.map((t) => (
            <GhostButton
              key={t.key}
              className={`rounded-full ${tab === t.key ? "bg-neutral-100 border border-neutral-300" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </GhostButton>
          ))}
        </div>
      </div>
    </div>
  );
}
