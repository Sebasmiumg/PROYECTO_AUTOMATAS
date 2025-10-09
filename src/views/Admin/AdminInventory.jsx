
import Card from "../../components/common/Card.jsx";
import GhostButton from "../../components/common/GhostButton.jsx";
import Button from "../../components/common/Button.jsx";
import Badge from "../../components/common/Badge.jsx";
import { seedInventory } from "../../data/seed.js";

export default function AdminInventory(){
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Inventario</h3>
        <div className="flex items-center gap-2">
          <GhostButton>Eliminar</GhostButton>
          <Button>Añadir Producto</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-neutral-600">
            <tr>
              <th className="py-2">Producto</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Estado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {seedInventory.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="py-2">{i.name}</td>
                <td>{i.category}</td>
                <td>{i.stock}</td>
                <td>
                  <Badge color={ i.status === "En Stock" ? "green" : i.status === "Bajo Stock" ? "yellow" : "red" }>
                    {i.status}
                  </Badge>
                </td>
                <td className="text-right"><GhostButton>Ver detalles</GhostButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
