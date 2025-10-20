// src/views/Admin/AdminReservations.jsx
import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";

const KEY = "app:admin:reservations";
const get = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const set = (v) => localStorage.setItem(KEY, JSON.stringify(v));

export default function AdminReservations() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", date: "", people: "" });

  const load = () => setItems(get());
  useEffect(load, []);

  const clearAll = () => { set([]); load(); };

  const add = (e) => {
    e.preventDefault();
    if (!form.name || !form.date) return;
    const people = Number(form.people || 1);
    const next = [{ id: Math.random().toString(36).slice(2,8).toUpperCase(), ...form, people }, ...get()];
    set(next); load();
    setForm({ name: "", date: "", people: "" });
  };

  const remove = (id) => { set(get().filter(i=>i.id!==id)); load(); };

  return (
    <div className="space-y-4">
      <Card className="p-4 grid gap-3 sm:grid-cols-4 items-end">
        <Input label="Nombre" value={form.name} onChange={e=>setForm(v=>({...v, name:e.target.value}))} />
        <Input label="Fecha/Hora" type="datetime-local" value={form.date} onChange={e=>setForm(v=>({...v, date:e.target.value}))} />
        <Input label="Personas" type="number" min="1" value={form.people} onChange={e=>setForm(v=>({...v, people:e.target.value}))} />
        <div className="flex gap-2">
          <Button onClick={add}>Agregar</Button>
          <Button variant="ghost" onClick={clearAll}>Limpiar</Button>
        </div>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-200 font-semibold">Reservas</div>
        {items.length === 0 ? (
          <div className="p-6 text-neutral-600">Sin reservas.</div>
        ) : (
          <ul className="p-4 space-y-2">
            {items.map(it => (
              <li key={it.id} className="flex items-center justify-between rounded-xl border p-3 bg-white/80">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-sm text-neutral-600">{new Date(it.date).toLocaleString()} • {it.people} persona(s)</div>
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