import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:5173/backend/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Store user data in localStorage for later use
        localStorage.setItem("user", JSON.stringify(result.user));
        // Navigate based on admin status
        if (result.user.is_admin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setErrorMessage(result.message || "Invalid email or password");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded font-semibold z-10"
          type="button"
        >
          Back
        </button>

        {/* Left form section */}
        <form onSubmit={handleSubmit} className="bg-white p-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-gray-600 mb-6">
            Enter your credentials to access your account
          </p>

          {errorMessage && (
            <p className="text-red-600 mb-4 text-sm">{errorMessage}</p>
          )}

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
            <a
              href="#"
              className="text-blue-700 text-sm ml-2 whitespace-nowrap"
            >
              Forgot password?
            </a>
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

          {/* Removed Google sign-in button */}

          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-700">
              Sign up
            </a>
          </p>
        </form>

        {/* Right image section */}
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
