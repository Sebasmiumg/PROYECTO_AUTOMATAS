
import Card from "../../components/common/Card.jsx";
import Field from "../../components/common/Field.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

export default function AdminSettings(){
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Configuración General</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Field label="Nombre del Restaurante"><Input placeholder="Restaurante Sabores" /></Field>
          <Field label="Dirección"><Input placeholder="Calle 123, Ciudad" /></Field>
          <Field label="Número de Teléfono"><Input placeholder="(+502) 5555-5555" /></Field>
          <Field label="Sitio Web"><Input placeholder="https://" /></Field>
        </div>
        <div className="space-y-3">
          <div>
            <div className="font-medium mb-2">Horarios</div>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Apertura"><Input type="time" /></Field>
              <Field label="Cierre"><Input type="time" /></Field>
            </div>
            <div className="mt-2 grid grid-cols-4 gap-2 text-sm">
              {["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map(d => (
                <label key={d} className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200">
                  <input type="checkbox" defaultChecked={["Lun","Mar","Mié","Jue","Vie"].includes(d)} />
                  {d}
                </label>
              ))}
            </div>
          </div>
          <div>
            <div className="font-medium mb-2">Opciones de Pago</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["Efectivo","Tarjeta de Crédito","Tarjeta de Débito","Transferencia"].map(p => (
                <label key={p} className="flex items-center gap-2 p-2 rounded-lg border border-neutral-200">
                  <input type="checkbox" defaultChecked={["Efectivo","Tarjeta de Crédito","Tarjeta de Débito"].includes(p)} />
                  {p}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6"><Button>Guardar Cambios</Button></div>
    </Card>
  );
}
