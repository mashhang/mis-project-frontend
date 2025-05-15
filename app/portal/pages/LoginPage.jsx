// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-tr from-[#654ea3] to-[#eaafc8]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="bg-white bg-opacity-60 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:ring-purple-500"
            required
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 rounded-full bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Login
          </button>
        </form>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        <p className="text-center mt-4 text-gray-700">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 hover:underline">
            Register
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
