import { useState } from "react";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import GhostButton from "../../components/common/GhostButton.jsx";
import Button from "../../components/common/Button.jsx";
import Badge from "../../components/common/Badge.jsx";
import { seedReservations } from "../../data/seed.js";

export default function AdminReservations() {
  const [list, setList] = useState(seedReservations);
  const [selected, setSelected] = useState(list[0]);
  const [showForm, setShowForm] = useState(false);
  const [newReservation, setNewReservation] = useState({
    name: "",
    people: "",
    time: "",
    status: "Pendiente",
    notes: "",
  });

  const handleAddReservation = () => {
    setShowForm(true);
    setSelected(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveReservation = () => {
    if (!newReservation.name || !newReservation.people || !newReservation.time) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const newItem = {
      ...newReservation,
      id: Date.now(),
    };

    setList([...list, newItem]);
    setSelected(newItem);
    setNewReservation({ name: "", people: "", time: "", status: "Pendiente", notes: "" });
    setShowForm(false);
  };

  return (
    <div className="grid lg:grid-cols-[360px_1fr] gap-4">
      {/* Panel izquierdo */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Input placeholder="Buscar por nombre, fecha…" />
          <GhostButton>Filtrar</GhostButton>
          <Button onClick={handleAddReservation}>Añadir Reserva</Button>
        </div>
        <div className="flex flex-col gap-2">
          {list.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setSelected(r);
                setShowForm(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl border transition ${
                selected?.id === r.id
                  ? "border-orange-300 bg-orange-50"
                  : "border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-medium">{r.name}</div>
                <Badge
                  color={
                    r.status === "Confirmada"
                      ? "green"
                      : r.status === "Pendiente"
                      ? "yellow"
                      : "red"
                  }
                >
                  {r.status}
                </Badge>
              </div>
              <div className="text-sm text-neutral-600">
                {r.people} personas · {r.time}
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Panel derecho */}
      <Card className="p-6">
        {showForm ? (
          <>
            <h3 className="text-lg font-semibold mb-4">Nueva Reserva</h3>
            <div className="flex flex-col gap-3">
              <Input
                name="name"
                placeholder="Nombre del cliente"
                value={newReservation.name}
                onChange={handleInputChange}
              />
              <Input
                name="people"
                placeholder="Número de personas"
                type="number"
                value={newReservation.people}
                onChange={handleInputChange}
              />
              <Input
                name="time"
                placeholder="Hora (ej. 19:00)"
                value={newReservation.time}
                onChange={handleInputChange}
              />
              <textarea
                name="notes"
                placeholder="Notas especiales"
                className="border rounded-xl p-2 text-sm"
                value={newReservation.notes}
                onChange={handleInputChange}
              />
              <div className="flex gap-2 mt-3">
                <Button onClick={handleSaveReservation}>Guardar</Button>
                <GhostButton onClick={() => setShowForm(false)}>
                  Cancelar
                </GhostButton>
              </div>
            </div>
          </>
        ) : selected ? (
          <>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-neutral-200" />
              <div>
                <div className="text-lg font-semibold">{selected.name}</div>
                <div className="text-sm text-neutral-600">
                  {selected.people} personas · {selected.time}
                </div>
              </div>
              <div className="ml-auto">
                <Badge
                  color={
                    selected.status === "Confirmada"
                      ? "green"
                      : selected.status === "Pendiente"
                      ? "yellow"
                      : "red"
                  }
                >
                  {selected.status}
                </Badge>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2">Notas Especiales</h4>
              <p className="text-sm text-neutral-700">
                {selected.notes || "—"}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button>Confirmar</Button>
              <GhostButton>Editar</GhostButton>
              <GhostButton className="text-red-600 border-red-200">
                Cancelar
              </GhostButton>
            </div>
          </>
        ) : (
          <div className="text-neutral-500">
            Selecciona una reserva de la lista.
          </div>
        )}
      </Card>
    </div>
  );
}
