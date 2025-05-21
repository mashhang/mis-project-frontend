"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";

type Subject = {
  student_id: string;
  subject_code: string;
  subject_title: string;
  prelims: number | null;
  midterms: number | null;
  prefinals: number | null;
  finals: number | null;
  average: number | null;
  units: number;
  isEditing: boolean;
  original?: Subject;
};

export default function GradesPage() {
  const params = useSearchParams();
  const studentId = params.get("id");

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const gradeFields: Array<"prelims" | "midterms" | "prefinals" | "finals"> = [
    "prelims",
    "midterms",
    "prefinals",
    "finals",
  ];

  const updateField = (
    index: number,
    field: keyof Pick<Subject, "prelims" | "midterms" | "prefinals" | "finals">,
    value: string
  ) => {
    const updated = [...subjects];
    const parsed = value === "" ? null : parseFloat(value);
    updated[index][field] = parsed;

    const p = updated[index].prelims;
    const m = updated[index].midterms;
    const pr = updated[index].prefinals;
    const f = updated[index].finals;

    const grades = [p, m, pr, f].filter(
      (v) => typeof v === "number"
    ) as number[];

    if (grades.length > 0) {
      const total = grades.reduce((sum, val) => sum + val, 0);
      updated[index].average = Number((total / grades.length).toFixed(2));
    } else {
      updated[index].average = null;
    }

    setSubjects(updated);
  };

  const toggleEdit = (index: number) => {
    const updated = [...subjects];
    updated[index].isEditing = true;
    // Save a backup of original values
    updated[index].original = { ...updated[index] };
    setSubjects(updated);
  };

  const cancelEdit = (index: number) => {
    const updated = [...subjects];
    updated[index] = { ...updated[index].original!, isEditing: false };
    delete updated[index].original;
    setSubjects(updated);
  };

  const saveGrade = async (subject: Subject, index: number) => {
    console.log("Sending to backend:", subject);

    if (!subject.student_id || !subject.subject_code) {
      alert("Missing student_id or subject_code.");
      return;
    }

    const original = subject.original;
    const changed =
      subject.prelims !== original?.prelims ||
      subject.midterms !== original?.midterms ||
      subject.prefinals !== original?.prefinals ||
      subject.finals !== original?.finals;

    if (!changed) {
      alert("⚠️ No changes made.");
      return;
    }

    const res = await fetch("http://localhost/backend/update_grade.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subject),
    });

    const data = await res.json();
    if (data.success) {
      const updated = [...subjects];
      updated[index].isEditing = false;
      delete updated[index].original;
      setSubjects(updated);
      alert("✅ Grade updated");
    } else {
      alert("❌ Failed to update");
    }
  };

  useEffect(() => {
    if (!studentId) return;

    const fetchGrades = async () => {
      const res = await fetch(
        `http://localhost/backend/get_student_grades.php?id=${studentId}`
      );
      const data = await res.json();

      if (data.success) {
        console.log("📄 Grades loaded:", data.subjects); // Add this!
        const updated = data.subjects.map((s: Subject) => ({
          ...s,
          isEditing: false,
        }));
        setSubjects(updated);
      } else {
        alert("Failed to load grades: " + data.message);
      }
    };

    fetchGrades();
  }, [studentId]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#f4f4f7] p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Grades</h1>

        <div className="bg-[#1F2235] text-white rounded-lg p-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="text-yellow-400 text-left border-b border-gray-600">
              <tr>
                <th>Subject</th>
                <th>Prelims</th>
                <th>Midterms</th>
                <th>PreFinals</th>
                <th>Finals</th>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((s, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="py-2 text-yellow-400">{s.subject_title}</td>

                  {gradeFields.map((field) => (
                    <td key={field}>
                      {s.isEditing ? (
                        <select
                          className="w-20 text-center bg-[#1F2235] text-white rounded"
                          value={
                            s[field as keyof Subject] !== null
                              ? (s[field as keyof Subject] as number).toFixed(2)
                              : ""
                          }
                          onChange={(e) =>
                            updateField(i, field, e.target.value)
                          }
                        >
                          <option value="">-</option>
                          {[
                            1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0,
                            4.0, 5.0,
                          ].map((grade) => (
                            <option key={grade} value={grade.toFixed(2)}>
                              {grade.toFixed(2)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>
                          {(s[field as keyof Subject] as number | null) ?? "-"}
                        </span>
                      )}
                    </td>
                  ))}

                  <td className="text-center text-yellow-400">
                    {s.average ?? "-"}
                  </td>
                  <td>
                    {s.isEditing ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveGrade(s, i)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => cancelEdit(i)}
                          className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => toggleEdit(i)}
                        className="bg-gray-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                    )}
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
