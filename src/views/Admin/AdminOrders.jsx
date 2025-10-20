import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import { TrackStore, HistoryStore } from "../../lib/storage.js";

const STATES = ["Recibido","Preparando","Listo","Entregado","Cancelado"];
const pillClass = (status) => {
  if (status === "Listo") return "pill pill-blue";
  if (status === "Entregado") return "pill pill-green";
  if (status === "Cancelado") return "pill pill-red";
  if (status === "Preparando") return "pill pill-amber";
  return "pill pill-neutral";
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const load = () => setOrders(TrackStore.all());
  useEffect(load, []);

  const filtered = orders.filter(o =>
    !query ? true : (o.id?.toString().toLowerCase().includes(query.trim().toLowerCase()))
  );

  const changeStatus = (order, status) => {
    TrackStore.upsert({ ...order, status });
    HistoryStore.add({
      title: "Estado actualizado",
      details: `Pedido ${order.id} → ${status}`,
      date: new Date().toLocaleString(),
    });
    load();
  };

  const clearTracking = () => { TrackStore.clear(); load(); };

  return (
    <div className="space-y-4">
      <Card className="p-4 grid gap-3 sm:grid-cols-[1fr_auto_auto] items-end">
        <Input label="Buscar pedido por ID" placeholder="Ej: ABC123"
               value={query} onChange={e=>setQuery(e.target.value)} />
        <Button variant="ghost" onClick={clearTracking}>Limpiar rastreo</Button>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-200 font-semibold">Pedidos</div>
        {filtered.length === 0 ? (
          <div className="p-6 text-neutral-600">No hay pedidos.</div>
        ) : (
          <div className="p-4 space-y-2">
            {filtered.map(order => (
              <div key={order.id} className="rounded-xl border p-3 bg-white/80">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="font-medium">ID: <span className="font-mono">{order.id}</span></div>
                  <div className="text-sm text-neutral-600">{new Date(order.date).toLocaleString()}</div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <div className="text-sm">Estado:</div>
                  <span className={pillClass(order.status)}>{order.status || "Sin estado"}</span>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <select
                    className="rounded-xl border border-neutral-300 px-3 py-2"
                    value={order.status}
                    onChange={(e)=>changeStatus(order, e.target.value)}
                  >
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <div className="ml-auto font-semibold">Total: Q {Number(order.total || 0).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}