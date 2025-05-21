"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ApplicationData {
  name: string;
  course: string;
  address: string;
  contact: string;
  email: string;
  guardianName: string;
  guardianRelation: string;
  guardianAddress: string;
}

const ApplicationDetails: React.FC = () => {
  const router = useRouter();

  const [applicationData, setApplicationData] =
    useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicationData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const userId = queryParams.get("user_id");

      if (!userId) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      const fetchUrl = `http://localhost/backend/Admission/get_application.php?user_id=${userId}`;
      console.log("Fetching application data from:", fetchUrl);

      try {
        const response = await fetch(fetchUrl);
        const text = await response.text();

        if (!response.ok) {
          setError(
            response.status === 404
              ? "No application found for this user"
              : "Failed to fetch application data"
          );
          setLoading(false);
          return;
        }

        const data: ApplicationData = JSON.parse(text);
        setApplicationData(data);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching application data");
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

  if (!applicationData) return null;

  return (
    <div className="min-h-screen bg-white text-black px-8 py-12">
      <div className="border border-yellow-400 rounded p-8 max-w-6xl mx-auto relative">
        <button
          onClick={() => router.push(`/Admission/Dashboard`)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold absolute top-4 right-4"
        >
          Back
        </button>
        <h1 className="text-2xl font-serif font-medium mb-6">
          Applicant Details
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Applicant Info */}
          <div>
            {[
              { label: "Name", value: applicationData.name },
              { label: "Course", value: applicationData.course },
              { label: "Address", value: applicationData.address },
              { label: "Contact Number", value: applicationData.contact },
              { label: "Email", value: applicationData.email },
            ].map((field, index) => (
              <div className="mb-4" key={index}>
                <label className="italic font-semibold block mb-1">
                  {field.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    value={field.value}
                    className="p-2 border rounded w-full"
                    readOnly
                  />
                  <span>🖉</span>
                </div>
              </div>
            ))}

            <h2 className="text-xl font-serif font-medium mb-4">
              Parent/Guardian
            </h2>
            {[
              { label: "Name", value: applicationData.guardianName },
              {
                label: "Contact Number",
                value: applicationData.guardianRelation,
              },
              { label: "Address", value: applicationData.guardianAddress },
              { label: "Email", value: applicationData.email },
            ].map((field, index) => (
              <div className="mb-4" key={`guardian-${index}`}>
                <label className="italic font-semibold block mb-1">
                  {field.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    value={field.value}
                    className="p-2 border rounded w-full"
                    readOnly
                  />
                  <span>🖉</span>
                </div>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div>
            <h2 className="text-xl font-serif font-medium mb-4">Documents</h2>
            {["ID", "Previous Grade", "Good Moral", "ID"].map((doc, index) => (
              <div className="mb-4" key={index}>
                <label className="italic block mb-1">{doc}</label>
                <input
                  value="Uploaded"
                  className="p-2 border rounded w-full bg-gray-200"
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
