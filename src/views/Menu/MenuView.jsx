// src/views/Menu/MenuView.jsx
import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import { useCart } from "../../context/CartContext.jsx";

// Menú guardado desde Admin
const MENU_KEY = "app:admin:menu";
const getMenu = () => JSON.parse(localStorage.getItem(MENU_KEY) || "[]");

export default function MenuView() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("Todas");
  const { addItem } = useCart();

  useEffect(() => { setItems(getMenu()); }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map(i => i.cat || "Sin categoría"));
    return ["Todas", ...Array.from(set)];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(it => {
      const okText = !q || (it.name?.toLowerCase().includes(q) || it.desc?.toLowerCase().includes(q));
      const catVal = it.cat || "Sin categoría";
      const okCat = (cat === "Todas") || (catVal === cat);
      const okStatus = (it.status || "Disponible") === "Disponible";
      return okText && okCat && okStatus;
    });
  }, [items, query, cat]);

  const handleAdd = (it) => {
    addItem({ id: it.id, name: it.name, price: Number(it.price||0), qty: 1 });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-1">Menú</h1>
      <p className="text-neutral-500">Explora los platillos y agrégalos a tu pedido</p>

      <Card className="p-4 grid gap-3 md:grid-cols-[1fr_220px_140px] items-end">
        <Input
          label="Buscar"
          placeholder="Nombre o descripción…"
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
        />
        <label className="block">
          <div className="mb-1 text-sm font-medium text-neutral-700">Categoría</div>
          <select
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 focus:border-orange-500 transition"
            value={cat}
            onChange={(e)=>setCat(e.target.value)}
          >
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <div className="text-sm text-neutral-500 md:justify-self-end">
          {filtered.length} resultado(s)
        </div>
      </Card>

      {items.length === 0 ? (
        <Card className="p-16 text-center text-neutral-600">
          <div className="text-lg font-medium text-neutral-800 mb-1">Menú vacío</div>
          <div>El administrador debe cargar platillos en <span className="font-medium">Admin &gt; Menú</span>.</div>
        </Card>
      ) : filtered.length === 0 ? (
        <Card className="p-16 text-center text-neutral-600">
          <div className="text-lg font-medium text-neutral-800 mb-1">Sin coincidencias</div>
          <div>Prueba con otra búsqueda o categoría.</div>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(it => (
            <Card key={it.id} className="p-4 flex flex-col justify-between">
              <div>
                <div className="font-semibold truncate">{it.name}</div>
                <div className="text-sm text-neutral-600 line-clamp-2">{it.desc || "Sin descripción"}</div>
                <div className="mt-2 text-sm text-neutral-500">{it.cat || "Sin categoría"}</div>
                <div className="mt-2 font-semibold">Q {Number(it.price).toFixed(2)}</div>
              </div>
              <div className="mt-3">
                <Button onClick={()=>handleAdd(it)} className="w-full">Agregar al carrito</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}