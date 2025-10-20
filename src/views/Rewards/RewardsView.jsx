import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import { RewardsStore } from "../../lib/storage.js";

export default function RewardsView() {
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState([]);

  const load = () => {
    const r = RewardsStore.get();
    setPoints(r.points || 0);
    setHistory(r.history || []);
  };
  useEffect(load, []);

  const resetRewards = () => { RewardsStore.clear(); load(); };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-1">Recompensas</h1>
      <p className="text-neutral-500">Tus puntos por compras</p>

      <Card className="p-4 flex items-center justify-between">
        <div className="font-semibold">Puntos acumulados</div>
        <div className="flex items-center gap-3">
          <div className="text-sm text-neutral-600">Puntos:</div>
          <div className="text-lg font-semibold">{points}</div>
          <Button variant="ghost" onClick={resetRewards}>Reiniciar</Button>
        </div>
      </Card>

      {points === 0 && history.length === 0 ? (
        <Card className="p-16 text-center text-neutral-600">
          <div className="text-4xl mb-3">🎁</div>
          <div className="text-lg font-medium text-neutral-800 mb-1">Sin recompensas por ahora</div>
          <div>Cuando generes compras reales, aquí verás tus puntos y canjes.</div>
        </Card>
      ) : (
        <Card className="p-0 overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-200 font-semibold">Movimientos</div>
          <ul className="p-4 space-y-2">
            {history.map((h, idx) => (
              <li key={idx} className="rounded-xl border p-3 bg-white/80">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{h.type || "Movimiento"}</div>
                  <div className="text-sm text-neutral-600">{h.date || ""}</div>
                </div>
                {typeof h.delta === "number" && (
                  <div className="text-sm text-neutral-700 mt-1">Cambio: {h.delta > 0 ? `+${h.delta}` : h.delta} pts</div>
                )}
                {h.note && <div className="text-sm text-neutral-600 mt-1">{h.note}</div>}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}