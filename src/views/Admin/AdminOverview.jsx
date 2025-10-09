
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";

function KPI({ label, value, right }) {
  return (
    <Card className="p-4 flex items-center justify-between">
      <div>
        <div className="text-neutral-600 text-sm">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
      {right}
    </Card>
  );
}

export default function AdminOverview(){
  const points = [12,9,11,13,2,15,10];
  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Pedidos Completados" value="0" />
        <KPI label="Ingresos Totales" value="$0" />
        <KPI label="Número de Reservas" value="0" />
        <KPI label="Artículo Más Vendido" value={<span className="truncate block max-w-[120px]"></span>} />
      </div>
      <Card className="p-4 mt-4">
        <div className="flex items:center justify-between mb-2">
          <div>
            <div className="text-neutral-600 text-sm">Ventas Semanales</div>
            <div className="text-3xl font-bold">$0</div>
          </div>
          <Badge color="green"></Badge>
        </div>
        <div className="h-44 bg-gradient-to-b from-neutral-50 to-white border border-neutral-200 rounded-xl p-3">
          <svg viewBox="0 0 100 40" className="w-full h-full">
            <polyline fill="none" stroke="#f97316" strokeWidth="2" points={points.map((v,i)=>`${(i/(points.length-1))*100},${40-(v/16)*38}`).join(" ")} />
          </svg>
        </div>
      </Card>
    </>
  );
}
