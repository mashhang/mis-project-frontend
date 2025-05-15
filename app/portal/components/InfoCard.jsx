import React from "react";

export default function InfoCard({ title, items }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex-1">
      <h3 className="text-gray-700 font-semibold mb-2">{title}</h3>
      <ul className="space-y-1 text-sm">
        {items.map(({ label, value }) => (
          <li key={label} className="flex justify-between">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium text-gray-800">{value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
