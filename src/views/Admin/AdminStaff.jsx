// src/views/Admin/AdminStaff.jsx
import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";

const KEY = "app:admin:staff";
const get = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const set = (v) => localStorage.setItem(KEY, JSON.stringify(v));

export default function AdminStaff() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", role: "", email: "" });

  const load = () => setItems(get());
  useEffect(load, []);

  const clearAll = () => { set([]); load(); };

  const add = (e) => {
    e.preventDefault();
    if (!form.name) return;
    const next = [{ id: Math.random().toString(36).slice(2,8).toUpperCase(), ...form }, ...get()];
    set(next); load();
    setForm({ name: "", role: "", email: "" });
  };

  const remove = (id) => { set(get().filter(i=>i.id!==id)); load(); };

  return (
    <div className="space-y-4">
      <Card className="p-4 grid gap-3 sm:grid-cols-4 items-end">
        <Input label="Nombre" value={form.name} onChange={e=>setForm(v=>({...v, name:e.target.value}))} />
        <Input label="Rol" value={form.role} onChange={e=>setForm(v=>({...v, role:e.target.value}))} />
        <Input label="Email" type="email" value={form.email} onChange={e=>setForm(v=>({...v, email:e.target.value}))} />
        <div className="flex gap-2">
          <Button onClick={add}>Agregar</Button>
          <Button variant="ghost" onClick={clearAll}>Limpiar</Button>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-200 font-semibold">Personal</div>
        {items.length === 0 ? (
          <div className="p-6 text-neutral-600">Sin personal.</div>
        ) : (
          <ul className="p-4 space-y-2">
            {items.map(it => (
              <li key={it.id} className="flex items-center justify-between rounded-xl border p-3 bg-white/80">
                <div>
                  <div className="font-medium">{it.name} {it.role && <span className="text-neutral-500">• {it.role}</span>}</div>
                  <div className="text-sm text-neutral-600">{it.email || "Sin email"}</div>
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