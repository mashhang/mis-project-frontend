"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import ManageApplication from '../components/ManageApplication';

interface Applicant {
  name: string;
  course: string;
  email: string;
  status: string;
}

const COLORS = ['#0088FE', '#FFBB28', '#FF8042'];

const AdminDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [data, setData] = useState([
    { name: 'Approved', value: 0 },
    { name: 'Pending', value: 0 },
    { name: 'Rejected', value: 0 },
  ]);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    fetch('http://localhost/backend/get_applicant_status_counts.php')
      .then((response) => response.json())
      .then((statusCounts) => {
        setData([
          { name: 'Approved', value: statusCounts.Approved || 0 },
          { name: 'Pending', value: statusCounts.Pending || 0 },
          { name: 'Rejected', value: statusCounts.Rejected || 0 },
        ]);
      })
      .catch((error) => {
        console.error('Error fetching applicant status counts:', error);
      });
  }, []);

  useEffect(() => {
    if (activeTab === 'recordList') {
      fetch('http://localhost/backend/get_all_applicants.php')
        .then((response) => response.json())
        .then((data) => {
          setApplicants(data);
        })
        .catch((error) => {
          console.error('Error fetching applicants:', error);
        });
    }
  }, [activeTab]);

  // Fixed height style for tab content container with max height 700px
  const tabContentStyle: React.CSSProperties = {
    minHeight: '400px', // Minimum height to maintain layout
    maxHeight: '450px',
    overflowY: 'auto',
  };

  const openLogoutConfirm = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/Admission/login');
  };

  return (
    <div className="min-h-screen bg-cover bg-center px-6 py-8" style={{ backgroundImage: "url('/images/campus.jpg')" }}>
      <div className="bg-white bg-opacity-90 rounded-lg shadow-md max-w-6xl mx-auto p-6">
        {/* Header / Breadcrumb */}
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={openLogoutConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-300">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              Home Dashboard
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'recordList'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('recordList')}
            >
              Application Record List
            </button>
            <button
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'manageApplication'
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('manageApplication')}
            >
              Manage Application
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div style={tabContentStyle}>
          {activeTab === 'dashboard' && (
            <>
              <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
              <p>Welcome to the admin dashboard overview.</p>
              {/* Pie Chart */}
              <div className="mt-10">
                <h2 className="text-xl font-semibold mb-4">Applicant Status Overview</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => name + ': ' + (percent * 100).toFixed(0) + '%'}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={'cell-' + index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </>
          )}
          {activeTab === 'recordList' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Application Record List</h2>
              <table className="min-w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Course</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4">No applicants found.</td>
                    </tr>
                  ) : (
                    applicants.map((applicant, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="border border-gray-300 px-4 py-2">{applicant.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{applicant.course}</td>
                        <td className="border border-gray-300 px-4 py-2">{applicant.email}</td>
                        <td className="border border-gray-300 px-4 py-2" style={{color: applicant.status === 'Pending' ? 'orange' : applicant.status === 'Approved' ? 'green' : applicant.status === 'Rejected' ? 'red' : 'black'}}>
                          {applicant.status}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
          {activeTab === 'manageApplication' && (
            <ManageApplication />
          )}
        </div>

        {showLogoutConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
              <p className="mb-4 text-lg font-semibold">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg font-medium"
                  onClick={handleLogout}
                >
                  Yes
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-6 rounded-lg font-medium"
                  onClick={cancelLogout}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
