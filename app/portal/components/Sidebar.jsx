// app/portal/components/Sidebar.jsx
"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Home, User, LogOut } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

export default function Sidebar() {
  const user = useUserStore((state) => state.user);
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.replace("/portal/login");
  };

  // Determine student ID
  const studentId =
    user?.student_id ??
    user?.id ??
    (typeof window !== "undefined" && localStorage.getItem("student_id"));

  // Only Dashboard and Personal Info
  const navItems = [
    { href: "/portal", label: "Dashboard", icon: <Home size={20} /> },
    {
      href: studentId
        ? `/portal/personal-info/${studentId}`
        : "/portal/register",
      label: "Personal Info",
      icon: <User size={20} />,
    },
  ];

  return (
    <aside className="w-60 bg-white/30 backdrop-blur-lg h-screen p-6 flex flex-col space-y-8">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
          🎓
        </div>
        <span className="text-xl font-semibold text-gray-800">
          Student Portal
        </span>
      </div>

      <nav className="flex-1 flex flex-col space-y-4">
        {navItems.map(({ href, label, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-purple-600 text-white"
                  : "text-gray-700 hover:bg-white/50"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className="w-full text-left flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-white/50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}
