import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ApplicationForm from "./pages/ApplicationForm";
import Details from "./pages/Details";
import ApplicationDetails from "./pages/ApplicationDetails";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin-dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Admission/signup" element={<Signup />} />
      <Route path="/Admission/login" element={<Login />} />
      <Route path="/Admission/application" element={<ApplicationForm />} />
      <Route path="/Admission/details" element={<Details />} />
      <Route
        path="/Admission/application-details"
        element={<ApplicationDetails />}
      />
      <Route path="/Admission/dashboard" element={<Dashboard />} />
      <Route path="/Admission/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;
