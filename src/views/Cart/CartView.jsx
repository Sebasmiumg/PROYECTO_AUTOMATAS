
// src/views/Cart/CartView.jsx
import React, { useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import { useCart } from "../../context/CartContext.jsx";
import { HistoryStore, TrackStore, RewardsStore } from "../../lib/storage.js";

function randomId() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function CartView() {
  const { items, addItem, removeItem, clear, total } = useCart();
  const [form, setForm] = useState({ name: "", price: "", qty: 1 });

  const onAdd = (e) => {
    e.preventDefault();
    if (!form.name) return;
    const price = Number(form.price || 0);
    const qty = Number(form.qty || 1);
    if (price <= 0 || qty < 1) return;
    addItem({ id: randomId(), name: form.name, price, qty });
    setForm({ name: "", price: "", qty: 1 });
  };

  const confirmOrder = () => {
    if (items.length === 0) return;

    const order = {
      id: randomId(),
      items,
      total,
      status: "Recibido",
      date: new Date().toISOString(),
    };

    // 1) Guardar en Rastreo
    TrackStore.upsert(order);

    // 2) Registrar en Historial
    HistoryStore.add({
      title: "Pedido creado",
      details: `ID ${order.id} • Q${total.toFixed(2)}`,
      date: new Date().toLocaleString(),
    });

    // 3) Sumar Recompensas (1 punto por Q1)
    const rw = RewardsStore.get();
    const addPts = Math.round(total);
    RewardsStore.set({
      points: (rw.points || 0) + addPts,
      history: [
        { type: "Compra", delta: addPts, note: `Pedido ${order.id}`, date: new Date().toLocaleDateString() },
        ...(rw.history || []),
      ],
    });

    // 4) Limpiar carrito
    clear();
    alert(`¡Pedido ${order.id} confirmado!`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Agregar al carrito</h2>
        <p className="text-sm text-neutral-600">Registra lo que ordenó la persona para calcular el total.</p>
        <form onSubmit={onAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-2">
          <Input label="Producto / servicio" value={form.name} onChange={e=>setForm(v=>({...v, name:e.target.value}))} />
          <Input label="Precio (Q)" type="number" step="0.01" value={form.price} onChange={e=>setForm(v=>({...v, price:e.target.value}))} />
          <Input label="Cantidad" type="number" min="1" value={form.qty} onChange={e=>setForm(v=>({...v, qty:e.target.value}))} />
          <div className="self-end">
            <Button type="submit" className="w-full">Agregar</Button>
          </div>
        </form>
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-200 font-semibold">Carrito</div>
        <div className="p-4 space-y-2">
          {items.length === 0 ? (
            <div className="text-neutral-500">Tu carrito está vacío.</div>
          ) : (
            <ul className="space-y-2">
              {items.map(it => (
                <li key={it.id} className="flex items-center justify-between rounded-xl border p-3 bg-white/80">
                  <div>
                    <div className="font-medium">{it.name}</div>
                    <div className="text-sm text-neutral-600">Q {it.price.toFixed(2)} × {it.qty}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">Q {(it.price * it.qty).toFixed(2)}</div>
                    <Button onClick={()=>removeItem(it.id)} variant="ghost">Eliminar</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="px-4 py-3 border-t border-neutral-200 flex items-center justify-between">
          <div className="text-sm text-neutral-600">Total</div>
          <div className="text-lg font-semibold">Q {total.toFixed(2)}</div>
        </div>
        <div className="px-4 py-3 border-t border-neutral-200 flex gap-2">
          <Button onClick={clear} variant="ghost" className="flex-1">Vaciar</Button>
          <Button className="flex-1" onClick={confirmOrder}>Confirmar pedido</Button>
        </div>
      </Card>
    </div>
  );
}