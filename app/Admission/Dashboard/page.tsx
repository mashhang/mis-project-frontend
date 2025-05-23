"use client";

import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { FileText, FileSearch, Lock } from "lucide-react";

const Dashboard: React.FC = () => {
  //   const navigate = useNavigate();
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);
  const [applicationStatus, setApplicationStatus] = useState<number | null>(null);

  useEffect(() => {
    if (user?.id && user.id !== 0) {
      fetch(`http://localhost/backend/Admission/get_application.php?user_id=${user.id}`)
        .then((res) => res.json())
        .then((data) => {
          setApplicationStatus(data.status_id || null);
        })
        .catch((error) => {
          console.error("Error fetching application status:", error);
        });
    }
  }, [user?.id]);

  const handleLogout = () => {
    localStorage.removeItem("user");
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

        {applicationStatus === 1 && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
            <strong>Congratulations!</strong> You have been approved.
          </div>
        )}

        {applicationStatus === 3 && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>We're sorry.</strong> Your application has been rejected.
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 w-full"
            onClick={() =>
              router.push(`/Admission/ApplicationForm?user_id=${user?.id}`)
            }
          >
            <FileText size={16} /> Submit Application
          </button>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 w-full"
            onClick={() =>
              router.push(`/Admission/ApplicationDetails?user_id=${user?.id}`)
            }
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
