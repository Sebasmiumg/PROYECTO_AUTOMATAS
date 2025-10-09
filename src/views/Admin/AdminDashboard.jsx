
import { useState } from "react";
import Card from "../../components/common/Card.jsx";
import AdminOverview from "./AdminOverview.jsx";
import AdminReservations from "./AdminReservations.jsx";
import AdminOrders from "./AdminOrders.jsx";
import AdminInventory from "./AdminInventory.jsx";
import AdminStaff from "./AdminStaff.jsx";
import AdminMenu from "./AdminMenu.jsx";
import AdminSettings from "./AdminSettings.jsx";

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
          {["overview","reservations","orders","inventory","staff","menu","settings"].map(i => (
            <button key={i} onClick={() => setSubTab(i)} className={`text-left px-4 py-2 rounded-xl hover:bg-neutral-50 ${subTab===i?"bg-neutral-100":""}`}>{i.charAt(0).toUpperCase()+i.slice(1)}</button>
          ))}
        </nav>
      </Card>
      <div className="flex flex-col gap-4">
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
