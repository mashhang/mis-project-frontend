import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert("You must agree to the terms and policy.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost/backend/save_user.php', {  // Updated URL to backend folder
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        navigate("/dashboard");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl shadow-lg rounded-lg overflow-hidden">

        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded font-semibold z-10"
          type="button"
        >
          Back
        </button>
        
        {/* Left form section */}
        <form onSubmit={handleSubmit} className="bg-white p-10">
          <h2 className="text-2xl font-bold mb-2 text-black">Get Started Now</h2>

          <div className="space-y-4 mt-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded"
              required
            />

            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              I agree to the <a href="#" className="text-blue-600 underline">terms & policy</a>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-yellow-400 hover:bg-yellow-500'} text-white py-2 rounded`}
            >
              {isSubmitting ? 'Submitting...' : 'Sign up'}
            </button>
          </div>

          <div className="my-4 text-center text-sm text-gray-600">or</div>

          {/* Removed Google sign-in button */}

          <p className="mt-4 text-center text-sm">
            Have an account? <a href="/login" className="text-blue-600">Sign In</a>
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

export default Signup;
