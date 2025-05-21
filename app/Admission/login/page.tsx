/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        "http://localhost/backend/Admission/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();
      console.log("Login response:", result); // ✅ Check this

      if (response.ok && result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
        if (result.user && result.user.is_admin === 1) {
          window.location.href = `http://localhost:3000/Admission/admin-dashboard?user_id=${result.user.id}`;
        } else {
          window.location.href = `http://localhost:3000/Admission/Dashboard?user_id=${result.user.id}`;
        }

        console.log("Full login response:", result);
        console.log("User object:", result.user);
        console.log("is_admin value:", result.user?.is_admin);
      } else {
        setErrorMessage(result.message || "Invalid username or password");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white">
      <button
        onClick={() => router.push("/")}
        className="mb-6 bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded font-semibold self-start ml-4"
        type="button"
      >
        Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl shadow-lg rounded-lg overflow-hidden relative">
        <form onSubmit={handleSubmit} className="bg-white p-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-gray-600 mb-6">
            Enter your credentials to access your account
          </p>

          {errorMessage && (
            <p className="text-red-600 mb-4 text-sm">{errorMessage}</p>
          )}

          <input
            type="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
          />

          <div className="flex justify-between items-center mb-2">
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember for 30 days
            </label>
            <Link
              href="/Admission/signup"
              className="text-blue-700 text-sm ml-2 whitespace-nowrap"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"
            } text-white py-2 rounded font-semibold mb-4`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center justify-center mb-4">
            <hr className="border-gray-300 w-1/4" />
            <span className="mx-2 text-sm text-gray-400">or</span>
            <hr className="border-gray-300 w-1/4" />
          </div>

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <Link href="/Admission/signup" className="text-blue-700">
              Sign up
            </Link>
          </p>
        </form>

        <div className="hidden md:block">
          <img
            src="/images/campus.jpg"
            alt="Campus"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
