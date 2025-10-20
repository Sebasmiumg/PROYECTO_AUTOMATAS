// src/views/Admin/AdminOverview.jsx
import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import { TrackStore, RewardsStore, HistoryStore } from "../../lib/storage.js";

export default function AdminOverview() {
  const [ordersCount, setOrdersCount] = useState(0);
  const [points, setPoints] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);

  const load = () => {
    setOrdersCount(TrackStore.all().length);
    setPoints(RewardsStore.get().points || 0);
    setEventsCount(HistoryStore.all().length);
  };

  useEffect(load, []);

  const clearAll = () => {
    TrackStore.clear();
    RewardsStore.clear();
    HistoryStore.clear();
    load();
  };

  return (
    <>
      <Card className="p-4 flex items-center justify-between">
        <div className="font-semibold">Resumen</div>
        <Button variant="ghost" onClick={clearAll}>Limpiar todo</Button>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-neutral-600">Pedidos</div>
          <div className="text-2xl font-semibold">{ordersCount}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-neutral-600">Puntos (recompensas)</div>
          <div className="text-2xl font-semibold">{points}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-neutral-600">Eventos (historial)</div>
          <div className="text-2xl font-semibold">{eventsCount}</div>
        </Card>
      </div>

      {ordersCount === 0 && points === 0 && eventsCount === 0 && (
        <Card className="p-16 text-center text-neutral-600">
          <div className="text-4xl mb-3">🧼</div>
          <div className="text-lg font-medium text-neutral-800 mb-1">Todo limpio</div>
          <div>Cuando generes actividad, el resumen se actualizará aquí.</div>
        </Card>
      )}
    </>
  );
}