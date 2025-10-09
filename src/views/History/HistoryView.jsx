
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import { seedOrders } from "../../data/seed.js";

export default function HistoryView() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Historial de Pedidos</h2>
        <p className="text-neutral-600">Revisa tus pedidos anteriores y consulta detalles.</p>
      </div>
      <Card className="p-4 mb-6">
        <h3 className="font-medium mb-3">Rastrear Último Pedido</h3>
        <div className="flex items-center gap-2">
          <Input defaultValue="#123456" />
          <Button>Ver Estado</Button>
        </div>
      </Card>
      <div className="flex flex-col gap-3">
        {seedOrders.map((o) => (
          <Card key={o.id} className="p-4 flex items-center">
            <div className="flex-1">
              <div className="font-medium">Pedido #{o.id}</div>
              <div className="text-xs text-neutral-500">{o.date}</div>
              <div className="text-sm text-neutral-700 mt-1 truncate">{o.items}</div>
            </div>
            <div className="font-semibold">${o.total.toFixed(2)}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}
