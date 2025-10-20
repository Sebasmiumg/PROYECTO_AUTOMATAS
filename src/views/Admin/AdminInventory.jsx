// src/views/Admin/AdminInventory.jsx
import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";

const KEY = "app:admin:inventory";

const get = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const set = (v) => localStorage.setItem(KEY, JSON.stringify(v));

export default function AdminInventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", stock: "", unit: "" });

  const load = () => setItems(get());
  useEffect(load, []);

  const clearAll = () => { set([]); load(); };

  const addItem = (e) => {
    e.preventDefault();
    if (!form.name) return;
    const stock = Number(form.stock || 0);
    const next = [{ id: Math.random().toString(36).slice(2,8).toUpperCase(), ...form, stock }, ...get()];
    set(next); load();
    setForm({ name: "", stock: "", unit: "" });
  };

  const remove = (id) => {
    set(get().filter(i => i.id !== id)); load();
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 grid gap-3 sm:grid-cols-[1fr_auto] items-end">
        <div className="grid sm:grid-cols-3 gap-3">
          <Input label="Nombre" value={form.name} onChange={e=>setForm(v=>({...v, name:e.target.value}))} />
          <Input label="Stock" type="number" value={form.stock} onChange={e=>setForm(v=>({...v, stock:e.target.value}))} />
          <Input label="Unidad (kg, u, l…)" value={form.unit} onChange={e=>setForm(v=>({...v, unit:e.target.value}))} />
        </div>
        <div className="flex gap-2">
          <Button onClick={addItem}>Agregar</Button>
          <Button variant="ghost" onClick={clearAll}>Limpiar</Button>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-200 font-semibold">Inventario</div>
        {items.length === 0 ? (
          <div className="p-6 text-neutral-600">Sin registros.</div>
        ) : (
          <ul className="p-4 space-y-2">
            {items.map(it => (
              <li key={it.id} className="flex items-center justify-between rounded-xl border p-3 bg-white/80">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-neutral-600">Stock: {it.stock} {it.unit || ""}</div>
                </div>
                <Button variant="ghost" onClick={()=>remove(it.id)}>Eliminar</Button>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}