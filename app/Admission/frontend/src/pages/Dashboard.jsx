import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, FileSearch, Lock } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    // Clear session (adjust key if you're storing something specific like 'student' or 'token')
    localStorage.removeItem("user");
    // Redirect to login
    window.location.href = "http://localhost:3000/Admission/login";
  };

  const openLogoutConfirm = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: "url('/images/campus.jpg')" }}
    >
      <div className="bg-white bg-opacity-90 p-10 rounded-lg shadow-md max-w-xl w-full text-center">
        <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2 text-gray-900">
          Welcome, Student!
        </h1>
        <p className="text-sm text-gray-700 mb-6">
          This is your dashboard. You can check your application, update your
          details, or apply now.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 w-full"
            onClick={() => navigate("/Admission/application")}
          >
            <FileText size={16} /> Submit Application
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 w-full"
            onClick={() => navigate("/Admission/application-details")}
          >
            <FileSearch size={16} /> View Application Details
          </button>

          <button
            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 w-full"
            onClick={openLogoutConfirm}
          >
            <Lock size={16} /> Logout
          </button>
        </div>

        {showLogoutConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
              <p className="mb-4 text-lg font-semibold">
                Are you sure you want to logout?
              </p>
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

export default Dashboard;
