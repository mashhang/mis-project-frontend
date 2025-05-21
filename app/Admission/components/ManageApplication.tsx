"use client";

import React, { useState, useEffect } from 'react';

const statusOptions = [
  { id: 1, name: 'Approved', color: 'green' },
  { id: 2, name: 'Pending', color: 'orange' },
  { id: 3, name: 'Rejected', color: 'red' },
];

const ManageApplication = () => {
  const [applications, setApplications] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});
  const [viewApp, setViewApp] = useState<any>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    fetch('http://localhost/backend/get_all_applicants.php')
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
      });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
  };

  const filteredApplications = applications.filter((app: any) =>
    app.name.toLowerCase().includes(filterText.toLowerCase()) ||
    app.course.toLowerCase().includes(filterText.toLowerCase()) ||
    app.email.toLowerCase().includes(filterText.toLowerCase()) ||
    app.status.toLowerCase().includes(filterText.toLowerCase())
  );

  const startEditing = (app: any) => {
    setEditingId(app.id);
    setEditFormData({ ...app });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditFormData({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const statusName = e.target.value;
    const status = statusOptions.find((s) => s.name === statusName);
    setEditFormData((prev: any) => ({ ...prev, status: statusName, status_id: status?.id }));
  };

  const saveChanges = () => {
    fetch('http://localhost/backend/update_application.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editFormData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setEditingId(null);
        fetchApplications();
      })
      .catch((error) => {
        console.error('Error updating application:', error);
      });
  };

  const deleteApplication = (id: number) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    fetch('http://localhost/backend/delete_application.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        fetchApplications();
      })
      .catch((error) => {
        console.error('Error deleting application:', error);
      });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Application</h2>
      <input
        type="text"
        placeholder="Search applications..."
        value={filterText}
        onChange={handleFilterChange}
        className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
      />
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">DOB</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Contact</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Guardian Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Guardian Relation</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Guardian Address</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.length === 0 ? (
            <tr>
              <td colSpan={11} className="text-center py-4">No applications found.</td>
            </tr>
          ) : (
            filteredApplications.map((app: any) => (
              <tr key={app.id} className="bg-white">
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    app.name
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === app.id ? (
                    <input
                      type="date"
                      name="dob"
                      value={editFormData.dob}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    app.dob
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="course"
                      value={editFormData.course}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    app.course
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="contact"
                      value={editFormData.contact}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    app.contact
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === app.id ? (
                    <input
                      type="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    app.email
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="address"
                      value={editFormData.address}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    app.address
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="guardianName"
                      value={editFormData.guardianName}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    app.guardianName
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="guardianRelation"
                      value={editFormData.guardianRelation}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    app.guardianRelation
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === app.id ? (
                    <input
                      type="text"
                      name="guardianAddress"
                      value={editFormData.guardianAddress}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    app.guardianAddress
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2" style={{ color: statusOptions.find(s => s.name === app.status)?.color || 'black' }}>
                  {editingId === app.id ? (
                    <select
                      name="status"
                      value={editFormData.status}
                      onChange={handleStatusChange}
                      className="w-full"
                    >
                      {statusOptions.map((status) => (
                        <option key={status.id} value={status.name}>{status.name}</option>
                      ))}
                    </select>
                  ) : (
                    app.status
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === app.id ? (
                    <>
                      <button
                        onClick={saveChanges}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded mr-2 w-20"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-1 rounded w-20"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEditing(app)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded mr-2 w-20"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {viewApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => setViewApp(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-4">Application Details</h3>
            <p><strong>Name:</strong> {viewApp.name}</p>
            <p><strong>Date of Birth:</strong> {viewApp.dob}</p>
            <p><strong>Course:</strong> {viewApp.course}</p>
            <p><strong>Contact:</strong> {viewApp.contact}</p>
            <p><strong>Email:</strong> {viewApp.email}</p>
            <p><strong>Address:</strong> {viewApp.address}</p>
            <p><strong>Guardian Name:</strong> {viewApp.guardianName}</p>
            <p><strong>Guardian Relation:</strong> {viewApp.guardianRelation}</p>
            <p><strong>Guardian Address:</strong> {viewApp.guardianAddress}</p>
            <p><strong>Status:</strong> {viewApp.status}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplication;
