
import { useState } from "react";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";

export default function RewardsView() {
  const [points, setPoints] = useState(0);
  const canRedeem = (cost) => points >= cost;
  const redeem = (cost) => { if (!canRedeem(cost)) return alert("No tienes suficientes puntos"); setPoints(p => p - cost); alert("¡Recompensa canjeada!"); };

  const rewards = [
    { cost: 500, title: "Aperitivo Gratis", desc: "Aplícalo en tu próximo pedido." },
    { cost: 1000, title: "10% de Descuento", desc: "Descuento sobre el total." },
    { cost: 2000, title: "Acceso a Evento", desc: "Degustación privada." },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Puntos y Recompensas</h2>
      <Card className="p-6 mb-6 flex items-center justify-between">
        <div>
          <div className="text-neutral-600 text-sm">Tu Saldo de Puntos</div>
          <div className="text-5xl font-extrabold text-orange-600">{points.toLocaleString()}</div>
        </div>
        <Badge color="orange">Ganas 10 pts por $1</Badge>
      </Card>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {rewards.map(r => (
          <Card key={r.cost} className="p-4">
            <div className="text-orange-600 text-xs font-semibold mb-1">{r.cost.toLocaleString()} Puntos</div>
            <div className="font-semibold">{r.title}</div>
            <p className="text-sm text-neutral-600 mt-1">{r.desc}</p>
            <Button className="mt-3 w-full" onClick={() => redeem(r.cost)} disabled={!canRedeem(r.cost)}>Canjear</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
