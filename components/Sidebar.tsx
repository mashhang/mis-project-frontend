"use client";

import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Example: clear session or token (if you're storing one)
    // localStorage.removeItem("token");
    // Then redirect
    router.push("/registrar/login");
  };

  return (
    <aside className="w-64 bg-[#1F2235] text-white px-6 py-4">
      <div>
        <h2 className="text-lg font-bold text-yellow-400 mb-6 text-center">
          REGISTRAR
        </h2>
        <nav className="space-y-3">
          <p
            className="hover:text-yellow-300 cursor-pointer text-center"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </p>
          <p
            className="hover:text-yellow-300 cursor-pointer text-center"
            onClick={() => router.push("/students")}
          >
            Student List
          </p>
          <p
            className="hover:text-yellow-300 cursor-pointer text-center"
            onClick={() => router.push("/enrollment")}
          >
            Enrollment
          </p>
          <p
            className="hover:text-yellow-300 cursor-pointer text-center"
            onClick={() => router.push("/coursecurriculum")}
          >
            Course and Curriculum
          </p>
          <p
            className="hover:text-yellow-300 cursor-pointer text-center"
            onClick={() => router.push("/gradeslist")}
          >
            Grades
          </p>
          <p
            className="hover:text-yellow-300 cursor-pointer text-center"
            onClick={() => router.push("/schedule")}
          >
            Schedule
          </p>
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="mt-8 text-sm bg-red-500 hover:bg-red-700 text-white py-2 w-full rounded transition-colors"
      >
        Logout
      </button>
    </aside>
  );
}
