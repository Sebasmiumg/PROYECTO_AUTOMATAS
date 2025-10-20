import React, { useEffect, useMemo, useState } from "react";
import Card from "../../components/common/Card.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function makeSlug(s) {
  return (s || "invitado").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");
}
function randomDigits(n=6){ return Array.from({length:n}, () => Math.floor(Math.random()*10)).join(""); }

export default function ChatView() {
  const { user } = useAuth();
  const key = useMemo(()=> `app:chatId:${user?.name||"anon"}`, [user?.name]);
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    let saved = localStorage.getItem(key);
    if (!saved) {
      saved = `${makeSlug(user?.name)}-${randomDigits(6)}`;
      localStorage.setItem(key, saved);
    }
    setChatId(saved);
  }, [key, user?.name]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold mb-1">Chat</h1>
      <p className="text-neutral-500">Conversación con el restaurante</p>

      <Card className="p-4 flex items-center justify-between">
        <div className="font-semibold">Tu chat</div>
        <div className="text-sm text-neutral-600">ID: <span className="font-mono">{chatId}</span></div>
      </Card>

      <Card className="p-16 text-center text-neutral-500">
        <div className="text-4xl mb-3">💬</div>
        <div className="text-lg font-medium text-neutral-800 mb-1">Tu chat está listo</div>
        <div className="text-neutral-600 mb-4">Aún no hay mensajes. Cuando empieces, verás la conversación aquí.</div>
        <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm bg-neutral-50">ID: <span className="font-mono">{chatId}</span></div>
      </Card>
    </div>
  );
}