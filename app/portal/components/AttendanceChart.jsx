import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Present", value: 90.5 },
  { name: "Absent", value: 9.5 },
];
const COLORS = ["#3b82f6", "#e5e7eb"];

export default function AttendanceChart() {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex-1 flex flex-col items-center">
      <h3 className="text-gray-700 font-semibold mb-2">Attendance</h3>
      <div className="w-full h-32">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="60%"
              outerRadius="80%"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="text-blue-600 font-bold mt-1">{data[0].value}%</div>
    </div>
  );
}
