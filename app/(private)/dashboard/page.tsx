"use client";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("username");
    setUsername(name || "User");
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#f4f4f7] p-6">
        <h1 className="text-2xl font-semibold">Welcome, {username}!</h1>
      </main>
    </div>
  );
}
