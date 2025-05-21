"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        "http://localhost/backend/Admission/save_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        router.push("/Admission/login");
      } else {
        setErrorMessage(result.message || "Failed to register");
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
          <h1 className="text-3xl font-bold mb-2">Create an account</h1>
          <p className="text-gray-600 mb-6">
            Fill in the details to get started
          </p>

          {errorMessage && (
            <p className="text-red-600 mb-4 text-sm">{errorMessage}</p>
          )}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Username"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
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

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-gray-400" : "bg-yellow-400 hover:bg-yellow-500"
            } text-white py-2 rounded font-semibold mb-4`}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link href="/Admission/login" className="text-blue-700">
              Login
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

export default Signup;
