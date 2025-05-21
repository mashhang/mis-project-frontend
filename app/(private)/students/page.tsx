"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../../components/Sidebar"; // adjust if needed

type Student = {
  id: string;
  name: string;
  course: string;
  year: string;
  status: string;
};

export default function StudentListPage() {
  const router = useRouter();

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await fetch("http://localhost/backend/get_students.php");
      const data = await res.json();
      if (data.success) {
        setStudents(data.data);
      } else {
        alert("Failed to fetch students");
      }
    };

    fetchStudents();
  }, []);

  const handleClick = (id: string) => {
    router.push(`/studentinfo?id=${id}`);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#f4f4f7] p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Student List</h1>

        <div className="bg-[#1F2235] text-white rounded-lg p-6 overflow-x-auto shadow-md">
          <table className="w-full text-sm table-auto border-collapse">
            <thead className="text-yellow-400 text-left border-b border-gray-600">
              <tr>
                <th className="pb-2">STUDENT ID</th>
                <th className="pb-2">FULL NAME</th>
                <th className="pb-2">COURSE</th>
                <th className="pb-2">YEAR LEVEL</th>
                <th className="pb-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr
                  key={index}
                  onClick={() => handleClick(student.id)}
                  className="border-b border-gray-700 cursor-pointer hover:bg-gray-800 transition"
                >
                  <td className="py-2 text-yellow-400 font-semibold">
                    {student.id}
                  </td>
                  <td className="py-2">{student.name}</td>
                  <td className="py-2">{student.course}</td>
                  <td className="py-2">{student.year}</td>
                  <td
                    className={`py-2 font-semibold ${
                      student.status === "REGULAR"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {student.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
