
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";

export default function LoginView() {
  const { login } = useAuth();
  const [role, setRole] = useState("client");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");
    try {
      login({ name: name || (role === "client" ? "Invitado" : "Admin"), role, password });
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-rose-50 p-6">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold mb-1">Iniciar sesión</h1><p className="text-neutral-500 mb-4">Bienvenido al panel del restaurante</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex gap-3">
            <label className={`flex-1 px-3 py-2 rounded-xl border ${role==="client"?"border-orange-500":"border-neutral-300"} cursor-pointer`}>
              <input type="radio" name="role" className="mr-2" checked={role==="client"} onChange={()=>setRole("client")} />
              Cliente
            </label>
            <label className={`flex-1 px-3 py-2 rounded-xl border ${role==="admin"?"border-orange-500":"border-neutral-300"} cursor-pointer`}>
              <input type="radio" name="role" className="mr-2" checked={role==="admin"} onChange={()=>setRole("admin")} />
              Admin
            </label>
          </div>

          <Input label="Nombre" placeholder={role==="client" ? "Tu nombre (opcional)" : "Admin"} value={name} onChange={e=>setName(e.target.value)} />
          {role==="admin" && (
            <Input type="password" label="Contraseña (admin)" placeholder="admin123" value={password} onChange={e=>setPassword(e.target.value)} />
          )}
          {err && <div className="text-red-600 text-sm">{err}</div>}
          <Button type="submit" className="w-full">Entrar</Button>
        </form>
      </Card>
    </div>
  );
}
