
import { useState } from "react";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import GhostButton from "../../components/common/GhostButton.jsx";

export default function ChatView() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", text: "¡Hola! Bienvenido a Sabores. ¿En qué puedo ayudarte hoy?" },
    { id: 2, role: "user", text: "Quiero hacer un pedido para llevar." },
    { id: 3, role: "assistant", text: "Claro, ¿qué te gustaría pedir?" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    const nextId = messages[messages.length - 1]?.id + 1 || 1;
    const userMsg = { id: nextId, role: "user", text: input.trim() };
    const lower = input.toLowerCase();
    let reply = "Entendido. Nuestro asistente confirmará tu pedido.";
    if (lower.includes("hamburguesa") || lower.includes("burger")) reply = "Perfecto, 1 Hamburguesa clásica. ¿Deseas agregar papas o bebida?";
    if (lower.includes("menu") || lower.includes("carta")) reply = "Recomendaciones: Ensalada Fresca, Salmón a la Parrilla, Tarta de Chocolate.";
    if (lower.includes("pagar") || lower.includes("pago")) reply = "Puedes pagar en efectivo, tarjeta o transferencia. ¿Qué prefieres?";
    const botMsg = { id: nextId + 1, role: "assistant", text: reply };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div className="max-w-5xl mx-auto p-4 grid md:grid-cols-3 gap-4">
      <Card className="md:col-span-2 p-0 overflow-hidden">
        <div className="bg-neutral-50 border-b border-neutral-200 px-4 py-3 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-neutral-200" />
          <div className="font-medium">Restaurante Sabores</div>
        </div>
        <div className="p-4 h-[480px] overflow-y-auto flex flex-col gap-3">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-orange-500 text-white rounded-br-sm"
                    : "bg-white text-neutral-800 border border-neutral-200 rounded-bl-sm"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-neutral-200 flex items-center gap-2">
          <Input
            placeholder="Escribe un mensaje…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send();
            }}
          />
          <Button onClick={send}>Enviar</Button>
        </div>
      </Card>
      <div className="flex flex-col gap-4">
        <Card className="p-4">
          <h3 className="font-semibold mb-2">Accesos rápidos</h3>
          <div className="flex flex-wrap gap-2">
            <GhostButton onClick={()=>setMessages(m=>[...m,{id:Date.now(),role:'assistant',text:'Menú recomendado: Ensalada, Salmón, Tarta.'}])}>Ver menú</GhostButton>
            <GhostButton onClick={()=>setMessages(m=>[...m,{id:Date.now(),role:'assistant',text:'Promoción del día: 10% en Platos Fuertes.'}])}>Promos</GhostButton>
            <GhostButton onClick={()=>setMessages(m=>[...m,{id:Date.now(),role:'assistant',text:'Horarios: Lun–Vie 11:00–22:00, Sáb–Dom 12:00–23:00.'}])}>Horarios</GhostButton>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="font-semibold mb-3">Estado actual</h3>
          <div className="flex items-center gap-2 text-sm">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700">Asistente en línea</span>
            <span className="text-neutral-500">Tiempo de respuesta ~ rápido</span>
          </div>
        </Card>
      </div>
    </div>
  );
}
