import React from 'react';
import { Pencil } from 'lucide-react';

const Details = () => {
  return (
    <div className="min-h-screen bg-cover bg-center px-6 py-12" style={{ backgroundImage: "url('/images/campus.jpg')" }}>
      <div className="bg-blue-900 bg-opacity-80 p-6 rounded-lg max-w-6xl mx-auto text-white">
        <h1 className="text-2xl font-serif mb-6 border-b-2 border-yellow-400 pb-1">Details</h1>

        {/* Search and Filter */}
        <div className="flex justify-end gap-4 mb-4">
          <input
            type="text"
            placeholder="Search Here..."
            className="px-4 py-2 rounded text-black"
          />
          <select className="px-4 py-2 rounded text-black">
            <option>Course</option>
            {/* Add options */}
          </select>
        </div>

        {/* Recent */}
        <h2 className="italic font-semibold text-lg mb-2">Recent</h2>
        <div className="bg-white text-black rounded p-4 flex justify-between items-center mb-4 border border-yellow-400">
          <button className="bg-gray-300 rounded-full px-4 py-1">Documents</button>
          <span>Sumbingco, Ira Mae Madieson A.</span>
          <span>Bachelor of Science in Computer Science</span>
          <Pencil className="cursor-pointer" />
        </div>

        {/* Previous */}
        <h2 className="italic font-semibold text-lg mb-2">Previous</h2>
        {[1, 2, 3].map((item, i) => (
          <div key={i} className="bg-white text-black rounded p-4 flex justify-between items-center mb-4 border border-yellow-400">
            <button className="bg-gray-300 rounded-full px-4 py-1">Documents</button>
            <span>Sumbingco, Ira Mae Madieson A.</span>
            <span>Bachelor of Science in Computer Science</span>
            <div className="flex gap-4">
              <Pencil className="cursor-pointer" />
              <span className="text-green-500 font-bold">✔</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
