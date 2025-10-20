// src/App.jsx
import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import TopNav from "./layouts/TopNav.jsx";
import ChatView from "./views/Chat/ChatView.jsx";
import HistoryView from "./views/History/HistoryView.jsx";
import TrackView from "./views/Track/TrackView.jsx";
import RewardsView from "./views/Rewards/RewardsView.jsx";
import AdminDashboard from "./views/Admin/AdminDashboard.jsx";
import CartView from "./views/Cart/CartView.jsx";
import LoginView from "./views/Login/LoginView.jsx";
import MenuView from "./views/Menu/MenuView.jsx"; // 👈 NUEVO

function AppShell() {
  const [tab, setTab] = useState("chat");
  const { user } = useAuth();

  if (!user) return <LoginView />;

  const isAdmin = user.role === "admin";

  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <TopNav tab={tab} setTab={(k)=>{ if (k === "admin" && !isAdmin) return; setTab(k); }} />
      <main className="py-6">
        {tab === "chat" && <ChatView />}
        {tab === "menu" && <MenuView />}{/* 👈 NUEVO */}
        {tab === "history" && <HistoryView />}
        {tab === "track" && <TrackView />}
        {tab === "rewards" && <RewardsView />}
        {tab === "cart" && <CartView />}
        {tab === "admin" && isAdmin && <AdminDashboard />}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppShell />
      </CartProvider>
    </AuthProvider>
  );
}