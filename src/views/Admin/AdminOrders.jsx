
import Card from "../../components/common/Card.jsx";
import GhostButton from "../../components/common/GhostButton.jsx";
import Badge from "../../components/common/Badge.jsx";
import { seedOrders } from "../../data/seed.js";

export default function AdminOrders(){
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Pedidos Recientes</h3>
        <GhostButton>Exportar CSV</GhostButton>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-neutral-600">
            <tr>
              <th className="py-2">ID</th>
              <th>Fecha</th>
              <th>Detalle</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {seedOrders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="py-2 font-mono">#{o.id}</td>
                <td>{o.date}</td>
                <td className="truncate max-w-[260px]">{o.items}</td>
                <td>${o.total.toFixed(2)}</td>
                <td><Badge color="green">Completado</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
