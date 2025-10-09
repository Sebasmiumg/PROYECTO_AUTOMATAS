
import { useState } from "react";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

export default function TrackView() {
  const [orderId, setOrderId] = useState("123456");
  const [step, setStep] = useState(3); // 0..4
  const steps = ["Recibido", "Preparando", "Listo", "En camino", "Entregado"];
  const calcFromId = (id) => { let n = 0; for (let i = 0; i < id.length; i++) n += id.charCodeAt(i); return n % steps.length; };
  const check = () => setStep(calcFromId(orderId.replace(/[^0-9A-Za-z]/g, "")));

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-2">Estado del Pedido</h2>
      <p className="text-neutral-600 mb-4">Ingresa el ID de tu pedido para ver el progreso.</p>
      <Card className="p-4 mb-6">
        <div className="flex items-center gap-2">
          <Input value={orderId} onChange={(e) => setOrderId(e.target.value)} placeholder="#IDpedido" />
          <Button onClick={check}>Ver Estado</Button>
        </div>
      </Card>
      <Card className="p-6">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex flex-col items-center relative">
              <div className={`h-10 w-10 flex items-center justify-center rounded-full border-2 ${i <= step ? "border-orange-500 bg-orange-50" : "border-neutral-300 bg-white"}`}>{i + 1}</div>
              <span className={`mt-2 text-xs ${i <= step ? "text-orange-600" : "text-neutral-500"}`}>{s}</span>
              {i < steps.length - 1 && (
                <div className={`absolute top-5 left-1/2 w-full h-0.5 -z-10 ${i < step ? "bg-orange-500" : "bg-neutral-200"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="mt-6 text-sm text-neutral-700">
          <p><span className="font-medium">Actualización:</span> Tu pedido <span className="font-mono">#{orderId}</span> está en <span className="font-semibold text-orange-600">{steps[step]}</span>.</p>
        </div>
      </Card>
    </div>
  );
}
