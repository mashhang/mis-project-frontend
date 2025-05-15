// app/portal/components/Topbar.jsx
"use client";

import { useState, useEffect } from "react";
import api from "../lib/axios"; // your axios instance
import { LogOut } from "lucide-react"; // example icon
import { useUserStore } from "../stores/useUserStore";

export default function Topbar() {
  const [student, setStudent] = useState(null);
  const logout = useUserStore((s) => s.logout);

  useEffect(() => {
    const id = window.localStorage.getItem("student_id");
    if (id) {
      api
        .get(`/get_student.php?id=${id}`)
        .then((res) => setStudent(res.data))
        .catch(console.error);
    }
  }, []);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div>
        {student ? (
          <span className="text-gray-800">Hello, {student.first_name}!</span>
        ) : (
          <span className="text-gray-500">Loading student…</span>
        )}
      </div>
      <button
        onClick={() => {
          logout();
          window.location.href = "/portal/login";
        }}
        className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
      >
        <LogOut size={18} />
        <span>Logout</span>
      </button>
    </header>
  );
}
