// app/portal/login/page.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useUserStore } from "../stores/useUserStore";

export default function PortalLogin() {
  const router = useRouter();
  const login = useUserStore((s) => s.login);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.email, form.password);
      router.push("/portal");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="relative">
      {/* Back arrow */}
      <Link
        href="/"
        className="absolute top-4 left-4 text-white hover:text-gray-200"
      >
        <ArrowLeft size={24} />
      </Link>

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
            Student Login
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded"
            />
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border rounded"
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
            <Link
              href="/portal/register"
              className="text-purple-600 hover:underline"
            >
              Register
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
