
import React, { useState } from "react";
import TopNav from "./layouts/TopNav.jsx";
import ChatView from "./views/Chat/ChatView.jsx";
import HistoryView from "./views/History/HistoryView.jsx";
import TrackView from "./views/Track/TrackView.jsx";
import RewardsView from "./views/Rewards/RewardsView.jsx";
import AdminDashboard from "./views/Admin/AdminDashboard.jsx";

export default function App() {
  const [tab, setTab] = useState("chat");
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      <TopNav tab={tab} setTab={setTab} />
      {tab === "chat" && <ChatView />}
      {tab === "history" && <HistoryView />}
      {tab === "track" && <TrackView />}
      {tab === "rewards" && <RewardsView />}
      {tab === "admin" && <AdminDashboard />}
      <footer className="mt-12 py-10 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} Sabores. Todos los derechos reservados.
      </footer>
    </div>
  );
}
