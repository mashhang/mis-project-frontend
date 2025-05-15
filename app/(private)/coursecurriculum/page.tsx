"use client";
import Sidebar from "@/components/Sidebar"; // Adjust path if needed

export default function CourseCurriculumPage() {
  const courses = [
    {
      code: "Math-G1145",
      title: "Life and works of Rizal",
      units: 3,
      department: "College of Computer Studies",
    },
    {
      code: "Math-G1145",
      title: "Understanding the self",
      units: 3,
      department: "College of Computer Studies",
    },
    ...Array(9).fill({
      code: "Math-G1145",
      title: "Networks and Communication",
      units: 3,
      department: "College of Computer Studies",
    }),
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-8 overflow-y-auto">
        <section className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Course Catalog</h1>
        </section>

        <section className="bg-[#1F2235] text-white rounded-lg p-6 overflow-x-auto shadow-md">
          <table className="w-full text-sm table-auto border-collapse">
            <thead className="text-yellow-400 text-left border-b border-gray-600">
              <tr>
                <th className="pb-2">COURSE CODES</th>
                <th className="pb-2">TITLE</th>
                <th className="pb-2">UNITS</th>
                <th className="pb-2">DEPARTMENT</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2 text-yellow-400 font-medium">
                    {course.code}
                  </td>
                  <td className="py-2">{course.title}</td>
                  <td className="py-2 text-yellow-400 font-semibold">
                    {course.units}
                  </td>
                  <td className="py-2">{course.department}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
