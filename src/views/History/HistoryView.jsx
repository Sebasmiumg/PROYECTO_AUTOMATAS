import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import { HistoryStore } from "../../lib/storage.js";

export default function HistoryView() {
  const [items, setItems] = useState([]);
  const load = () => setItems(HistoryStore.all());
  useEffect(load, []);
  const clearAll = () => { HistoryStore.clear(); load(); };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-1">Historial</h1>
      <p className="text-neutral-500">Registro de eventos y acciones</p>

      <Card className="p-4 flex items-center justify-between">
        <div className="font-semibold">Eventos</div>
        <Button variant="ghost" onClick={clearAll} disabled={items.length === 0}>Limpiar historial</Button>
      </Card>

      {items.length === 0 ? (
        <Card className="p-16 text-center text-neutral-600">
          <div className="text-4xl mb-3">🗒️</div>
          <div className="text-lg font-medium text-neutral-800 mb-1">No hay historial todavía</div>
          <div>Cuando existan pedidos o acciones, aparecerán aquí.</div>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <ul className="p-4 space-y-2">
            {items.map((ev, idx) => (
              <li key={idx} className="rounded-xl border p-3 bg-white/80">
                <div className="font-medium">{ev.title || "Evento"}</div>
                <div className="text-sm text-neutral-600">
                  {ev.date || ""} • {ev.details || "Sin detalles"}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}