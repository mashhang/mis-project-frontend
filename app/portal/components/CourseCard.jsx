import React from "react";

export default function CourseCard({ title, icon: Icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
      <div className="p-3 bg-purple-100 rounded-lg">
        <Icon size={24} className="text-purple-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{title}</h4>
      </div>
      <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition">
        View
      </button>
    </div>
  );
}
