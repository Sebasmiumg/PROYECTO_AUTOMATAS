import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import { TrackStore } from "../../lib/storage.js";

export default function TrackView() {
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState([]);

  const load = () => setOrders(TrackStore.all());
  useEffect(load, []);

  const clearAll = () => { TrackStore.clear(); load(); };

  const result = useMemo(() => {
    return orders.filter(o =>
      !query ? true : (o.id?.toString().toLowerCase().includes(query.trim().toLowerCase()))
    );
  }, [orders, query]);

  const pillClass = (status) => {
    if (status === "Listo") return "pill pill-blue";
    if (status === "Entregado") return "pill pill-green";
    if (status === "Cancelado") return "pill pill-red";
    if (status === "Preparando") return "pill pill-amber";
    return "pill pill-neutral";
    };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-1">Rastreo</h1>
      <p className="text-neutral-500">Seguimiento de tus pedidos</p>

      <Card className="p-4 grid gap-3 sm:grid-cols-[1fr_auto_auto] items-end">
        <Input label="Buscar por ID de pedido" placeholder="Ej: ABC123"
               value={query} onChange={e=>setQuery(e.target.value)} />
        <Button variant="ghost" onClick={clearAll} className="sm:ml-3">
          Limpiar rastreo
        </Button>
      </Card>

      {orders.length === 0 ? (
        <Card className="p-16 text-center text-neutral-600">
          <div className="text-4xl mb-3">📍</div>
          <div className="text-lg font-medium text-neutral-800 mb-1">No hay pedidos en rastreo</div>
          <div>Cuando generes pedidos reales, aparecerán aquí para seguimiento.</div>
        </Card>
      ) : result.length === 0 ? (
        <Card className="p-16 text-center text-neutral-600">
          <div className="text-lg font-medium text-neutral-800 mb-1">Sin coincidencias</div>
          <div>Prueba con otro ID de pedido.</div>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-200 font-semibold">Pedidos en seguimiento</div>
          <ul className="p-4 space-y-2">
            {result.map(order => (
              <li key={order.id} className="rounded-xl border p-3 bg-white/80">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="font-medium">ID: <span className="font-mono">{order.id}</span></div>
                  <div className="text-sm text-neutral-600">{new Date(order.date).toLocaleString()}</div>
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <div className="text-sm">Estado:</div>
                  <span className={pillClass(order.status)}>{order.status || "Sin estado"}</span>
                </div>

                <ul className="mt-2 text-sm text-neutral-700 list-disc pl-5">
                  {order.items?.map((it,i) => (
                    <li key={i}>{it.name} — Q {Number(it.price).toFixed(2)} × {it.qty}</li>
                  ))}
                </ul>
                <div className="mt-2 font-semibold">Total: Q {Number(order.total || 0).toFixed(2)}</div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}