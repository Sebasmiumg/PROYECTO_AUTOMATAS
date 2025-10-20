// src/views/Admin/AdminMenu.jsx
import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import Textarea from "../../components/common/Textarea.jsx";

const KEY = "app:admin:menu";
const get = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const set = (v) => localStorage.setItem(KEY, JSON.stringify(v));

export default function AdminMenu() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", desc: "", cat: "" });

  const load = () => setItems(get());
  useEffect(load, []);

  const clearAll = () => { set([]); load(); };

  const addItem = (e) => {
    e.preventDefault();
    if (!form.name) return;
    const price = Number(form.price || 0);
    const next = [{ id: Math.random().toString(36).slice(2,8).toUpperCase(), ...form, price }, ...get()];
    set(next); load();
    setForm({ name: "", price: "", desc: "", cat: "" });
  };

  const remove = (id) => { set(get().filter(i => i.id !== id)); load(); };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="grid sm:grid-cols-4 gap-3 items-end">
          <Input label="Nombre" value={form.name} onChange={e=>setForm(v=>({...v, name:e.target.value}))} />
          <Input label="Precio (Q)" type="number" step="0.01" value={form.price} onChange={e=>setForm(v=>({...v, price:e.target.value}))} />
          <Input label="Categoría" value={form.cat} onChange={e=>setForm(v=>({...v, cat:e.target.value}))} />
          <Button onClick={addItem}>Agregar</Button>
        </div>
        <div className="mt-3">
          <Textarea label="Descripción" value={form.desc} onChange={e=>setForm(v=>({...v, desc:e.target.value}))} />
        </div>
        <div className="mt-3">
          <Button variant="ghost" onClick={clearAll}>Limpiar menú</Button>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-200 font-semibold">Menú</div>
        {items.length === 0 ? (
          <div className="p-6 text-neutral-600">Sin platillos.</div>
        ) : (
          <ul className="p-4 space-y-2">
            {items.map(it => (
              <li key={it.id} className="flex items-center justify-between rounded-xl border p-3 bg-white/80">
                <div>
                  <div className="font-medium">{it.name} {it.cat && <span className="text-neutral-500">• {it.cat}</span>}</div>
                  <div className="text-sm text-neutral-600">{it.desc || "Sin descripción"}</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="font-semibold">Q {Number(it.price).toFixed(2)}</div>
                  <Button variant="ghost" onClick={()=>remove(it.id)}>Eliminar</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}