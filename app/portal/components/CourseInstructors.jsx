import React from "react";

export default function CourseInstructors({ instructors }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Course Instructors</h3>
      </div>
      <div className="flex space-x-2">
        {instructors.map((inst) => (
          <img
            key={inst.name}
            src={inst.avatar}
            alt={inst.name}
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
          />
        ))}
      </div>
    </div>
  );
}
