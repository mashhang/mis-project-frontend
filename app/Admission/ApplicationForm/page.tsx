/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  dob: string;
  course: string;
  contact: string;
  email: string;
  address: string;
  guardianName: string;
  guardianRelation: string;
  guardianAddress: string;
  uploads: (File | null)[];
}

interface FormErrors {
  [key: string]: string;
}

const ApplicationForm: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    dob: "",
    course: "",
    contact: "",
    email: "",
    address: "",
    guardianName: "",
    guardianRelation: "",
    guardianAddress: "",
    uploads: Array(4).fill(null),
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "name":
        return !value.trim() ? "Name is required" : "";
      case "dob":
        if (!value) return "Date of birth is required";
        if (new Date(value) > new Date())
          return "Date of birth cannot be in the future";
        return "";
      case "course":
        return !value ? "Course selection is required" : "";
      case "contact":
        return !value.trim()
          ? "Contact number is required"
          : !/^\d{10,15}$/.test(value)
          ? "Contact number must be 10 to 15 digits"
          : "";
      case "email":
        return !value.trim()
          ? "Email is required"
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Invalid email format"
          : "";
      case "address":
        return !value.trim() ? "Home address is required" : "";
      case "guardianName":
        return !value.trim() ? "Guardian name is required" : "";
      case "guardianRelation":
        return !value.trim() ? "Guardian relationship is required" : "";
      case "guardianAddress":
        return !value.trim() ? "Guardian address is required" : "";
      default:
        return "";
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name.startsWith("upload")) {
      const index = parseInt(name.replace("upload", ""));
      const newUploads = [...formData.uploads];
      newUploads[index] = files?.[0] || null;
      setFormData({ ...formData, uploads: newUploads });
    } else {
      setFormData({ ...formData, [name]: value });
      const error = validateField(name, value);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "uploads") {
        const error = validateField(key, (formData as any)[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      if (!user?.id) {
        alert("User not logged in");
        setIsSubmitting(false);
        return;
      }

      const applicationData = {
        user_id: user.id,
        name: formData.name,
        dob: formData.dob,
        course: formData.course,
        contact: formData.contact,
        email: formData.email,
        address: formData.address,
        guardianName: formData.guardianName,
        guardianRelation: formData.guardianRelation,
        guardianAddress: formData.guardianAddress,
      };

      const response = await fetch("/save_application.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      const text = await response.text();
      const result = JSON.parse(text);

      if (response.ok) {
        setShowModal(true);
      } else {
        alert("Error saving application: " + result.message);
      }
    } catch (error: any) {
      alert("Error submitting application: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewDetails = () => {
    router.push(`/Admission/ApplicationDetails?user_id=${user?.id}`);
  };

  const handleSubmitAnother = () => {
    setFormData({
      name: "",
      dob: "",
      course: "",
      contact: "",
      email: "",
      address: "",
      guardianName: "",
      guardianRelation: "",
      guardianAddress: "",
      uploads: Array(4).fill(null),
    });
    setErrors({});
    setShowModal(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="min-h-screen bg-cover bg-center px-6 py-12"
        style={{ backgroundImage: "url('/images/campus.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 p-8 rounded shadow-lg max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-serif border-b-2 border-yellow-400 pb-2">
              Application Form
            </h1>
            <button
              type="button"
              onClick={() => router.push(`/Admission/dashboard`)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded font-semibold"
            >
              Back
            </button>
          </div>

          <h2 className="italic font-semibold text-lg mb-2">Personal</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className={`p-2 bg-yellow-400 rounded w-full ${
                  errors.name ? "border border-red-500" : ""
                }`}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={`p-2 bg-yellow-400 rounded w-full ${
                  errors.dob ? "border border-red-500" : ""
                }`}
              />
              {errors.dob && (
                <p className="text-red-600 text-sm mt-1">{errors.dob}</p>
              )}
            </div>
            <div>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className={`p-2 bg-yellow-400 rounded w-full ${
                  errors.course ? "border border-red-500" : ""
                }`}
              >
                <option value="">Course</option>
                <option>Bachelor of Science in Computer Science</option>
                <option>Bachelor of Science in Criminology</option>
              </select>
              {errors.course && (
                <p className="text-red-600 text-sm mt-1">{errors.course}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Contact Number"
                className={`p-2 bg-yellow-400 rounded w-full ${
                  errors.contact ? "border border-red-500" : ""
                }`}
              />
              {errors.contact && (
                <p className="text-red-600 text-sm mt-1">{errors.contact}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`p-2 bg-yellow-400 rounded w-full ${
                  errors.email ? "border border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Home Address"
                className={`p-2 bg-yellow-400 rounded w-full ${
                  errors.address ? "border border-red-500" : ""
                }`}
              />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address}</p>
              )}
            </div>
          </div>

          <h2 className="italic font-semibold text-lg mb-2">Parent/Guardian</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                placeholder="Name"
                className={`p-2 bg-yellow-400 rounded w-full ${
                  errors.guardianName ? "border border-red-500" : ""
                }`}
              />
              {errors.guardianName && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.guardianName}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="guardianRelation"
                value={formData.guardianRelation}
                onChange={handleChange}
                placeholder="Relationship"
                className={`p-2 bg-yellow-400 rounded w-full ${
                  errors.guardianRelation ? "border border-red-500" : ""
                }`}
              />
              {errors.guardianRelation && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.guardianRelation}
                </p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="guardianAddress"
                value={formData.guardianAddress}
                onChange={handleChange}
                placeholder="Home Address"
                className={`p-2 bg-yellow-400 rounded w-full ${
                  errors.guardianAddress ? "border border-red-500" : ""
                }`}
              />
              {errors.guardianAddress && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.guardianAddress}
                </p>
              )}
            </div>
          </div>

          <h2 className="italic font-semibold text-lg mb-2">Upload:</h2>
          <p className="mb-4 text-sm text-gray-700">
            Needed files for application: Any of these (at least 2)
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700 text-sm max-w-xl mx-auto text-left">
            <li>Birth Certificate (usually from PSA)</li>
            <li>
              Latest Report Card or Form 138 (for incoming SHS or college)
            </li>
            <li>Certificate of Good Moral Character</li>
            <li>2x2 or passport-size ID Picture (white background, recent)</li>
          </ul>
          <p className="mb-6 text-sm text-gray-700 font-semibold">
            No need to upload all of these, at least 2 are required.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {formData.uploads.slice(0, 4).map((_, i) => (
              <div key={i} className="relative">
                <input
                  type="file"
                  name={`upload${i}`}
                  onChange={handleChange}
                  className="w-full p-2 bg-yellow-400 rounded cursor-pointer"
                />
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-2 rounded text-white font-semibold ${
                isSubmitting ? "bg-gray-400" : "bg-yellow-400"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </form>

      {/* ✅ Modal Section */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-xl font-semibold mb-4">
              Application Submitted!
            </h2>
            <p className="text-gray-700 mb-6">
              Your application has been submitted successfully.
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleViewDetails}
              >
                View My Details
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                onClick={handleSubmitAnother}
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationForm;
