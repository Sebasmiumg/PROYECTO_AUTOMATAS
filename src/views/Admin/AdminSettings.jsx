// src/views/Admin/AdminSettings.jsx
import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";

const KEY = "app:admin:settings";
const get = () => JSON.parse(localStorage.getItem(KEY) || "{}");
const set = (v) => localStorage.setItem(KEY, JSON.stringify(v));

export default function AdminSettings() {
  const [cfg, setCfg] = useState({ restaurantName: "", currency: "Q", address: "" });

  useEffect(() => {
    const saved = get();
    setCfg({ restaurantName: saved.restaurantName || "", currency: saved.currency || "Q", address: saved.address || "" });
  }, []);

  const save = (e) => {
    e.preventDefault();
    set(cfg);
    alert("Ajustes guardados");
  };

  const reset = () => {
    set({ restaurantName: "", currency: "Q", address: "" });
    setCfg({ restaurantName: "", currency: "Q", address: "" });
  };

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="font-semibold mb-3">Ajustes generales</div>
        <form onSubmit={save} className="grid sm:grid-cols-2 gap-3">
          <Input label="Nombre del restaurante" value={cfg.restaurantName} onChange={e=>setCfg(v=>({...v, restaurantName:e.target.value}))} />
          <Input label="Moneda" value={cfg.currency} onChange={e=>setCfg(v=>({...v, currency:e.target.value}))} />
          <div className="sm:col-span-2">
            <Input label="Dirección" value={cfg.address} onChange={e=>setCfg(v=>({...v, address:e.target.value}))} />
          </div>
          <div className="sm:col-span-2 flex gap-2">
            <Button type="submit">Guardar</Button>
            <Button variant="ghost" type="button" onClick={reset}>Restablecer</Button>
          </div>
        </form>
      </Card>

      <Card className="p-16 text-center text-neutral-600">
        <div className="text-4xl mb-3">⚙️</div>
        <div className="text-lg font-medium text-neutral-800 mb-1">Panel limpio</div>
        <div>Configura los ajustes básicos y listo.</div>
      </Card>
    </div>
  );
}