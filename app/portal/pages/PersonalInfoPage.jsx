// src/pages/PersonalInfoPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import axios from "../lib/axios";
import { Edit2, Save, X } from "lucide-react";
import dayjs from "dayjs";
import banner from "../assets/banner-person.png";

export default function PersonalInfoPage() {
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("student_id");
    if (!id) {
      setError("No student ID found. Please register first.");
      setLoading(false);
      return;
    }
    axios
      .get(`get_student.php?id=${id}`)
      .then(({ data }) => {
        if (data.date_of_birth === "0000-00-00") data.date_of_birth = "";
        setForm(data);
      })
      .catch(() => setError("Unable to load your information."))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }, []);

  const handleSave = async () => {
    setError("");
    try {
      await axios.post("update_student.php", { ...form, id: form.id });
      setEditing(false);
    } catch {
      setError("Failed to save. Try again.");
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setLoading(true);
    setError("");
    const id = localStorage.getItem("student_id");
    axios
      .get(`get_student.php?id=${id}`)
      .then(({ data }) => {
        if (data.date_of_birth === "0000-00-00") data.date_of_birth = "";
        setForm(data);
      })
      .catch(() => setError("Failed to reload."))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">Loading…</div>
    );
  }
  if (error && !form) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <Topbar />
        </div>

        <main className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          {/* Banner */}
          <div className="bg-white rounded-xl shadow p-4">
            <section className="bg-purple-600 text-white rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase opacity-70 mb-1">
                  {dayjs().format("D MMM, YYYY")}
                </div>
                <h2 className="text-base font-bold mb-1">
                  Personal Information
                </h2>
                <p className="text-xs opacity-90">Edit your details below.</p>
              </div>
              <img src={banner} alt="banner" className="h-20" />
            </section>
          </div>

          {/* Save / Cancel */}
          <div className="flex justify-end space-x-2">
            {editing ? (
              <>
                <button
                  onClick={handleSave}
                  type="button"
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  <Save className="mr-2" /> Save
                </button>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  <X className="mr-2" /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                type="button"
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                <Edit2 className="mr-2" /> Edit
              </button>
            )}
          </div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <Card title="Personal Info">
                <Field
                  label="First Name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  editing={editing}
                />
                <Field
                  label="Last Name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  editing={editing}
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  editing={editing}
                />
                <Field
                  label="Contact #"
                  name="contact_number"
                  value={form.contact_number}
                  onChange={handleChange}
                  editing={editing}
                />
                <Field
                  label="Date of Birth"
                  name="date_of_birth"
                  type="date"
                  value={form.date_of_birth}
                  onChange={handleChange}
                  editing={editing}
                />
                <Field
                  label="Gender"
                  name="gender"
                  type="select"
                  options={["Male", "Female", "Others"]}
                  value={form.gender}
                  onChange={handleChange}
                  editing={editing}
                />
              </Card>

              <Card title="Academic Info">
                <Field
                  label="Course"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  editing={editing}
                />
                <Field
                  label="Year Level"
                  name="year_level"
                  type="number"
                  value={form.year_level}
                  onChange={handleChange}
                  editing={editing}
                />
              </Card>
            </div>

            <div className="space-y-6">
              <Card title="Profile Photo">
                {editing ? (
                  <>
                    <input
                      name="photo_url"
                      value={form.photo_url || ""}
                      onChange={handleChange}
                      placeholder="Paste image URL here"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-300 mb-4 transition"
                    />
                    <div className="flex justify-center">
                      <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden shadow-inner">
                        {form.photo_url ? (
                          <img
                            src={form.photo_url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden shadow-lg mb-3">
                      <img
                        src={form.photo_url || "/default-avatar.png"}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800 text-center">
                      {form.first_name} {form.last_name}
                    </h4>
                  </div>
                )}
              </Card>

              <Card title="Additional Info">
                <Field
                  label="Address"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  editing={editing}
                />
                <Field
                  label="About Me"
                  name="about"
                  type="textarea"
                  value={form.about}
                  onChange={handleChange}
                  editing={editing}
                />
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Card wrapper
function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow">
      {title && (
        <div className="px-6 py-3 border-b">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

// Reusable Field component
function Field({
  label,
  name,
  type = "text",
  options = [],
  value,
  onChange,
  editing,
}) {
  const base =
    "w-full rounded-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4 transition";

  if (!editing) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="bg-gray-100 rounded-lg p-2 text-gray-800">
          {value || "-"}
        </div>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className={`${base} bg-white`}
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <textarea
          name={name}
          value={value || ""}
          onChange={onChange}
          className={`${base} bg-white h-24 resize-none`}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className={`${base} bg-white`}
      />
    </div>
  );
}
