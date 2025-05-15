// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import axios from "../lib/axios";

export default function RegisterPage() {
  const nav = useNavigate();
  const [form, setForm] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    date_of_birth: "",
    gender: "",
    course: "",
    year_level: "",
    photo_url: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }
    setError("");

    // build FormData payload
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key !== "confirmPassword") {
        formData.append(key, value);
      }
    });

    try {
      const res = await axios.post("register_student.php", formData, {
        headers: {
          // override default JSON header so PHP sees this as form data
          "Content-Type": "multipart/form-data",
        },
      });

      const student = res.data;
      localStorage.setItem("student", JSON.stringify(student));
      localStorage.setItem("student_id", student.id);
      nav(`/personal-info/${student.id}`);
    } catch (err) {
      setError(
        err.response?.data?.error || err.message || "Registration failed"
      );
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#ffefba] to-[#ffffff] p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Registration
        </h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Student ID */}
          <div className="col-span-2">
            <label className="block mb-1">Student ID</label>
            <input
              name="student_id"
              value={form.student_id}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* First Name */}
          <div>
            <label className="block mb-1">First Name</label>
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Last Name */}
          <div>
            <label className="block mb-1">Last Name</label>
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Contact # */}
          <div>
            <label className="block mb-1">Contact #</label>
            <input
              name="contact_number"
              type="tel"
              value={form.contact_number}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Date of Birth */}
          <div>
            <label className="block mb-1">Date of Birth</label>
            <input
              name="date_of_birth"
              type="date"
              value={form.date_of_birth}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Gender */}
          <div>
            <label className="block mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          {/* Course */}
          <div className="col-span-2">
            <label className="block mb-1">Course</label>
            <input
              name="course"
              value={form.course}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Year Level */}
          <div className="col-span-2">
            <label className="block mb-1">Year Level</label>
            <input
              name="year_level"
              type="number"
              value={form.year_level}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Photo URL */}
          <div className="col-span-2">
            <label className="block mb-1">Photo URL</label>
            <input
              name="photo_url"
              type="url"
              value={form.photo_url}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Password */}
          <div>
            <label className="block mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Confirm Password */}
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Submit */}
          <div className="col-span-2">
            <button
              type="submit"
              className="w-full py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
            >
              Register
            </button>
          </div>
        </form>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <p className="text-center mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
