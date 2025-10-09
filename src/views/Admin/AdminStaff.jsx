
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import GhostButton from "../../components/common/GhostButton.jsx";
import Badge from "../../components/common/Badge.jsx";
import { seedStaff } from "../../data/seed.js";

export default function AdminStaff(){
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Gestión de Personal</h3>
        <Button>Añadir Empleado</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-neutral-600">
            <tr>
              <th className="py-2">Nombre</th>
              <th>Rol</th>
              <th>Contacto</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {seedStaff.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="py-2">{s.name}</td>
                <td>{s.role}</td>
                <td className="text-blue-600 underline cursor-pointer">{s.email}</td>
                <td><Badge color={s.status === "Activo" ? "green" : "red"}>{s.status}</Badge></td>
                <td><GhostButton>Editar</GhostButton></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
