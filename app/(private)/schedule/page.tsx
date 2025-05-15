"use client";
import Sidebar from "@/components/Sidebar"; // adjust if path differs

export default function SchedulePage() {
  const schedule = [
    {
      code: "THS423",
      title: "THESIS 2",
      teacher: "Prof. Calapan",
      asyncDay: "WED",
      asyncTime: "",
      f2fDay: "FRI",
      f2fTime: "12:00 - 03:00PM",
      room: "219",
    },
    {
      code: "GEC109",
      title: "LIFE AND WORKS OF RIZAL",
      teacher: "Prof. Cabañez",
      asyncDay: "WED",
      asyncTime: "08:00 - 09:00AM",
      f2fDay: "FRI",
      f2fTime: "10:00 - 12:00PM",
      room: "218",
    },
    {
      code: "NCA23",
      title: "NETWORKS AND COMMUNICATION",
      teacher: "Prof. Laureno",
      asyncDay: "WED",
      asyncTime: "01:00 - 03:00PM",
      f2fDay: "THF",
      f2fTime: "03:30 - 05:00PM",
      room: "234",
    },
    {
      code: "SAP423",
      title: "MIS with ERP (SAP B1)",
      teacher: "Prof. Vralalon",
      asyncDay: "WED",
      asyncTime: "01:00 - 03:00PM",
      f2fDay: "THF",
      f2fTime: "06:30 - 08:00PM",
      room: "202",
    },
  ];

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#f4f4f7] p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Schedule</h1>

        <div className="bg-[#1F2235] text-white rounded-lg p-6 overflow-x-auto">
          <table className="w-full text-sm table-auto border-collapse">
            <thead className="text-yellow-400 text-left border-b border-gray-600">
              <tr>
                <th className="pb-2">SUBJECT CODE</th>
                <th className="pb-2">SUBJECT TITLE</th>
                <th className="pb-2">TEACHER</th>
                <th className="pb-2">DAY</th>
                <th className="pb-2">ASYNCHRONOUS</th>
                <th className="pb-2">DAY</th>
                <th className="pb-2">FACE-TO-FACE</th>
                <th className="pb-2">ROOM</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((s, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2 text-yellow-400 font-medium">{s.code}</td>
                  <td className="py-2">{s.title}</td>
                  <td className="py-2">{s.teacher}</td>
                  <td className="py-2">{s.asyncDay}</td>
                  <td className="py-2">{s.asyncTime}</td>
                  <td className="py-2">{s.f2fDay}</td>
                  <td className="py-2">{s.f2fTime}</td>
                  <td className="py-2 text-yellow-400 font-medium">{s.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
