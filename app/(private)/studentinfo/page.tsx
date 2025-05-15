/* eslint-disable @next/next/no-img-element */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function StudentInformation() {
  const params = useSearchParams();
  const studentId = params.get("id");

  const [student, setStudent] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    if (!studentId) return;

    const fetchStudent = async () => {
      const res = await fetch(
        `http://localhost/backend/get_student_by_id.php?id=${studentId}`
      );
      const data = await res.json();
      if (data.success) {
        setStudent(data.data);
        setHistory(data.history);
        setSubjects(data.subjects);
      } else {
        alert("Student not found");
      }
    };

    fetchStudent();
  }, [studentId]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 bg-[#f4f4f7] p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">
          Student Information Management
        </h1>

        {/* Profile and Academic Records */}
        <div className="grid grid-cols-3 gap-8">
          {/* Profile */}
          <div className="bg-[#1F2235] text-white rounded-lg p-6 flex flex-col items-center">
            <img
              src="https://i.imgur.com/O6XWyYf.png"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-center">
              {student?.first_name} {student?.middle_name} {student?.last_name}
            </h2>

            <p className="text-sm mb-2 text-center">{student?.date_of_birth}</p>
            <p className="text-sm text-center">
              Contact Number: {student?.contact_number}
            </p>
            <p className="text-sm text-center">Address: {student?.address}</p>

            <p className="text-sm text-center">
              Student ID: {student?.student_id}
            </p>
            <p className="text-sm text-center">
              Course: {student?.course} - {student?.section}
            </p>
            <p className="text-sm text-center">Semester: {student?.semester}</p>
            <p className="text-sm text-center">
              School Year: {student?.school_year}
            </p>
          </div>

          {/* Academic Records */}
          <div className="bg-[#1F2235] text-white rounded-lg p-6 col-span-2">
            <h2 className="text-lg font-semibold mb-4">Academic Records</h2>
            <div className="grid grid-cols-7 text-yellow-400 font-semibold text-sm mb-2">
              <span>SUBJECT TITLE</span>
              <span className="text-center ">PRELIMS</span>
              <span className="text-center ">MIDTERMS</span>
              <span className="text-center ">PREFINALS</span>
              <span className="text-center ">FINALS</span>
              <span className="text-center ">AVERAGE</span>
              <span className="text-center ">REMARKS</span>
            </div>
            {subjects.length > 0 ? (
              subjects.map((s, i) => (
                <div
                  key={i}
                  className="grid grid-cols-7 text-sm border-b border-gray-600 py-1"
                >
                  <span>{s.subject_title}</span>
                  <span className="text-yellow-400 text-center">
                    {s.prelims ?? "-"}
                  </span>
                  <span className="text-yellow-400 text-center">
                    {s.midterms ?? "-"}
                  </span>
                  <span className="text-yellow-400 text-center">
                    {s.prefinals ?? "-"}
                  </span>
                  <span className="text-yellow-400 text-center">
                    {s.finals ?? "-"}
                  </span>
                  <span className="text-yellow-400 text-center">
                    {s.average !== null && !isNaN(Number(s.average))
                      ? Number(s.average).toFixed(2)
                      : "-"}
                  </span>
                  <span
                    className={
                      s.average !== null && Number(s.average) > 3.0
                        ? "text-red-400 text-center"
                        : "text-green-400 text-center"
                    }
                  >
                    {s.average !== null
                      ? Number(s.average) <= 3.0
                        ? "PASSED"
                        : "FAILED"
                      : "-"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-white mt-2">No subjects assigned.</p>
            )}
          </div>
        </div>

        {/* Enrollment History */}
        <div className="mt-10 bg-[#1F2235] text-white rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Enrollment History</h2>
          <div className="grid grid-cols-3 text-yellow-400 font-semibold text-sm mb-2">
            <span>ACADEMIC YEAR</span>
            <span>YEAR LEVEL</span>
            <span>STATUS</span>
          </div>
          {history.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-3 text-sm text-white border-b border-gray-600 py-1"
            >
              <span>{item.school_year}</span>
              <span>{item.year_level}</span>
              <span>{item.status}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
