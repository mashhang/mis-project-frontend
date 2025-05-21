import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationDetails = () => {
  const navigate = useNavigate();
  const [applicationData, setApplicationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      console.log('User from localStorage:', user);
      if (!user || !user.id) {
        setError('User not logged in');
        setLoading(false);
        return;
      }

      const fetchUrl = `http://localhost:8000/get_application.php?user_id=${user.id}`;
      console.log('Fetching application data from:', fetchUrl);

      try {
        const response = await fetch(fetchUrl);
        const text = await response.text();
        console.log('Raw response text:', text);
        if (!response.ok) {
          if (response.status === 404) {
            setError('No application found for this user');
          } else {
            setError('Failed to fetch application data');
          }
          setLoading(false);
          return;
        }
        const data = JSON.parse(text);
        setApplicationData(data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching application data');
        setLoading(false);
      }
    };

    fetchApplicationData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading application details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!applicationData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-black px-8 py-12">
      <div className="border border-yellow-400 rounded p-8 max-w-6xl mx-auto relative">
<button
  onClick={() => navigate(-1)}
  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold absolute top-4 right-4"
>
  Back
</button>
        <h1 className="text-2xl font-serif font-medium mb-6">Applicant Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Applicant Info */}
          <div>
            <div className="mb-4">
              <label className="italic font-semibold block mb-1">Name</label>
              <div className="flex items-center gap-2">
                <input value={applicationData.name} className="p-2 border rounded w-full" readOnly />
                <span>🖉</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="italic font-semibold block mb-1">Course</label>
              <div className="flex items-center gap-2">
                <input value={applicationData.course} className="p-2 border rounded w-full" readOnly />
                <span>🖉</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="italic font-semibold block mb-1">Address</label>
              <div className="flex items-center gap-2">
                <input value={applicationData.address} className="p-2 border rounded w-full" readOnly />
                <span>🖉</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="italic font-semibold block mb-1">Contact Number</label>
              <div className="flex items-center gap-2">
                <input value={applicationData.contact} className="p-2 border rounded w-full" readOnly />
                <span>🖉</span>
              </div>
            </div>
            <div className="mb-8">
              <label className="italic font-semibold block mb-1">Email</label>
              <div className="flex items-center gap-2">
                <input value={applicationData.email} className="p-2 border rounded w-full" readOnly />
                <span>🖉</span>
              </div>
            </div>

            <h2 className="text-xl font-serif font-medium mb-4">Parent/Guardian</h2>
            <div className="mb-4">
              <label className="italic font-semibold block mb-1">Name</label>
              <div className="flex items-center gap-2">
                <input value={applicationData.guardianName} className="p-2 border rounded w-full" readOnly />
                <span>🖉</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="italic font-semibold block mb-1">Contact Number</label>
              <div className="flex items-center gap-2">
                <input value={applicationData.guardianRelation} className="p-2 border rounded w-full" readOnly />
                <span>🖉</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="italic font-semibold block mb-1">Address</label>
              <div className="flex items-center gap-2">
                <input value={applicationData.guardianAddress} className="p-2 border rounded w-full" readOnly />
                <span>🖉</span>
              </div>
            </div>
            <div>
              <label className="italic font-semibold block mb-1">Email</label>
              <div className="flex items-center gap-2">
                <input value={applicationData.email} className="p-2 border rounded w-full" readOnly />
                <span>🖉</span>
              </div>
            </div>
          </div>

          {/*  Documents */}
          <div>
            <h2 className="text-xl font-serif font-medium mb-4">Documents</h2>
            <div className="mb-4">
              <label className="italic block mb-1">ID</label>
              <input value="Uploaded" className="p-2 border rounded w-full bg-gray-200" readOnly />
            </div>
            <div className="mb-4">
              <label className="italic block mb-1">Previous Grade</label>
              <input value="Uploaded" className="p-2 border rounded w-full bg-gray-200" readOnly />
            </div>
            <div className="mb-4">
              <label className="italic block mb-1">Good Moral</label>
              <input value="Uploaded" className="p-2 border rounded w-full bg-gray-200" readOnly />
            </div>
            <div className="mb-4">
              <label className="italic block mb-1">ID</label>
              <input value="Uploaded" className="p-2 border rounded w-full bg-gray-200" readOnly />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
