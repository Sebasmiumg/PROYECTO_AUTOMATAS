// …importaciones existentes
import GhostButton from "../components/common/GhostButton.jsx";
import Button from "../components/common/Button.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function TopNav({ tab, setTab }) {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const cartCount = items.reduce((a,b)=>a + (Number(b.qty)||0), 0);

  const tabs = [
    { key: "chat", label: "Chat", icon: "💬" },
    { key: "menu", label: "Menú", icon: "🍽️" }, // 👈 NUEVO
    { key: "history", label: "Historial", icon: "📚" },
    { key: "track", label: "Rastreo", icon: "📍" },
    { key: "rewards", label: "Recompensas", icon: "🎁" },
    { key: "cart", label: "Carrito", icon: "🛒", badge: cartCount },
    { key: "admin", label: "Admin", icon: "🛠️" },
  ];

  return (
    <div className="w-full sticky top-0 z-30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 h-16 gap-4 flex items-center">
        <div onClick={()=>setTab("chat")} className="cursor-pointer select-none flex items-center gap-2 font-semibold">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 to-rose-500 text-white grid place-content-center shadow-sm">AI</div>
          <div className="leading-none">
            <div className="text-[13px] text-neutral-500">Restaurante</div>
            <div>Panel</div>
          </div>
        </div>

        <nav className="flex items-center gap-1 ml-6">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative px-3 py-2 rounded-xl text-sm hover:bg-neutral-100 transition ${tab===t.key ? "bg-neutral-900 text-white" : "text-neutral-700"}`}
            >
              <span className="mr-1">{t.icon}</span>{t.label}
              {!!t.badge && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-500 text-white text-[10px] grid place-items-center">
                  {t.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {user && <span className="text-sm text-neutral-600">Hola, <span className="font-medium">{user.name || "Invitado"}</span></span>}
          {user && <GhostButton onClick={logout}>Salir</GhostButton>}
        </div>
      </div>
    </div>
  );
}