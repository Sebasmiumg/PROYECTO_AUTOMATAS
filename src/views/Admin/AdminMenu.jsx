
import Card from "../../components/common/Card.jsx";
import GhostButton from "../../components/common/GhostButton.jsx";
import Button from "../../components/common/Button.jsx";
import Badge from "../../components/common/Badge.jsx";
import Input from "../../components/common/Input.jsx";
import { seedMenu } from "../../data/seed.js";

export default function AdminMenu(){
  const items = seedMenu;
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Gestión de Menús y Precios</h3>
        <Button>Agregar Plato</Button>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Input placeholder="Buscar platos o bebidas" />
        <GhostButton>Categorías</GhostButton>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-neutral-600">
            <tr>
              <th className="py-2">Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.id} className="border-t">
                <td className="py-2">{m.name}</td>
                <td className="truncate max-w-[280px]">{m.desc}</td>
                <td>${m.price.toFixed(2)}</td>
                <td>{m.cat}</td>
                <td><Badge color={m.status === "Disponible" ? "orange" : "red"}>{m.status}</Badge></td>
                <td className="space-x-2"><GhostButton>Editar</GhostButton><GhostButton className="text-red-600 border-red-200">Eliminar</GhostButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
