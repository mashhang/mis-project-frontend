import React from "react";

export default function NoticeCard() {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex-1">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-700 font-semibold">Daily Notice</h3>
      </div>
      <ul className="space-y-3 text-sm">
        <li>
          <div className="font-medium text-gray-800">Prelim payment due</div>
          <p className="text-gray-600">
            Please be reminded to place your balance on or before the deadline.
          </p>
        </li>
        <li>
          <div className="font-medium text-gray-800">Exam schedule</div>
          <p className="text-gray-600">
            Your prefinals exam is scheduled for May 15, 2025.
          </p>
        </li>
      </ul>
    </div>
  );
}
