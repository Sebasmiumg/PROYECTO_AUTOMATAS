// src/views/Admin/AdminDashboard.jsx
import React, { useState } from "react";
import Card from "../../components/common/Card.jsx";
import AdminOverview from "./AdminOverview.jsx";
import AdminReservations from "./AdminReservations.jsx";
import AdminOrders from "./AdminOrders.jsx";
import AdminInventory from "./AdminInventory.jsx";
import AdminStaff from "./AdminStaff.jsx";
import AdminMenu from "./AdminMenu.jsx";
import AdminSettings from "./AdminSettings.jsx";

const TABS = [
  { key: "overview", label: "Resumen", icon: "📊" },
  { key: "reservations", label: "Reservas", icon: "📅" },
  { key: "orders", label: "Pedidos", icon: "🧾" },
  { key: "inventory", label: "Inventario", icon: "📦" },
  { key: "staff", label: "Personal", icon: "👥" },
  { key: "menu", label: "Menú", icon: "🍽️" },
  { key: "settings", label: "Ajustes", icon: "⚙️" },
];

export default function AdminDashboard() {
  const [subTab, setSubTab] = useState("overview");

  return (
    <div className="max-w-6xl mx-auto p-4 grid lg:grid-cols-[260px_1fr] gap-4">
      <Card className="p-0 overflow-hidden h-fit sticky top-20">
        <div className="px-4 py-3 border-b border-neutral-200 font-semibold flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500 text-white">🛠️</span>
          Panel de Administración
        </div>
        <nav className="p-2 flex flex-col">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setSubTab(t.key)}
              className={`text-left px-4 py-2 rounded-xl hover:bg-neutral-100 transition ${subTab===t.key ? "bg-neutral-900 text-white" : "text-neutral-800"}`}
            >
              <span className="mr-2">{t.icon}</span>{t.label}
            </button>
          ))}
        </nav>
      </Card>

      <div className="space-y-4">
        {subTab === "overview" && <AdminOverview />}
        {subTab === "reservations" && <AdminReservations />}
        {subTab === "orders" && <AdminOrders />}
        {subTab === "inventory" && <AdminInventory />}
        {subTab === "staff" && <AdminStaff />}
        {subTab === "menu" && <AdminMenu />}
        {subTab === "settings" && <AdminSettings />}
      </div>
    </div>
  );
}
