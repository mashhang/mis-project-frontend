/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Sidebar from "@/components/Sidebar"; // adjust path if needed
import { useState } from "react";

export default function EnrollmentPage() {
  const [studentId, setStudentId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const [section, setSection] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [schoolYear, setSchoolYear] = useState("");
  const [assignStudentId, setAssignStudentId] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitAll = async () => {
    try {
      // Enroll student
      const enrollRes = await fetch(
        "http://localhost/backend/enroll_student.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: studentId,
            first_name: firstName,
            middle_name: middleName,
            last_name: lastName,
            semester,
            school_year: schoolYear,
            date_of_birth: dateOfBirth,
            contact_number: contactNumber,
            address: address,
          }),
        }
      );

      const enrollData = await enrollRes.json();

      if (!enrollData.success) {
        alert("Enrollment failed");
        return;
      }

      // Assign course
      const assignRes = await fetch(
        "http://localhost/backend/assign_course.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: studentId, // reuse same ID
            course,
            section,
          }),
        }
      );

      const assignData = await assignRes.json();

      if (!assignData.success) {
        alert("Course assignment failed");
        return;
      }

      // Success
      alert("Student enrolled and assigned successfully!");
      setShowSuccess(true);
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white p-8 overflow-y-auto">
        {/* Student Enrollment Form */}
        <section className="bg-[#1F2235] text-white rounded-lg p-6 mb-8 border-t-4 border-yellow-400 shadow-md">
          <h2 className="text-xl font-bold mb-4">Student Enrollment</h2>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <input
              placeholder="Student ID No."
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="rounded p-2 text-white"
            />
            <input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="rounded p-2 text-white"
            />
            <input
              placeholder="Middle name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="rounded p-2 text-white"
            />
            <input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="rounded p-2 text-white"
            />

            <input
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              className="rounded p-2 text-white"
            />

            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="rounded p-2 text-white col-span-3"
            />

            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="rounded p-2 text-[#8f92a1] bg-[#1F2235]"
            >
              <option value="" disabled>
                Select Semester
              </option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
            </select>

            <select
              value={schoolYear}
              onChange={(e) => setSchoolYear(e.target.value)}
              className="rounded p-2 text-[#8f92a1] bg-[#1F2235]"
            >
              <option value="" disabled>
                Select School Year
              </option>
              <option value="2025–2026">2025–2026</option>
              <option value="2026–2027">2026–2027</option>
              <option value="2027–2028">2027–2028</option>
              <option value="2028–2029">2028–2029</option>
              <option value="2029–2030">2029–2030</option>
              <option value="2030–2031">2030–2031</option>
              <option value="2031–2032">2031–2032</option>
              <option value="2032–2033">2032–2033</option>
            </select>

            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="rounded p-2 text-[#8f92a1] bg-[#1F2235]"
            />
          </div>
        </section>

        {/* Course Assignment Section */}
        <section className="bg-[#1F2235] text-white rounded-lg p-6 border-t-4 border-yellow-400 shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Course and section assignment
          </h2>

          <div className="grid grid-cols-4 gap-4 mb-4">
            <input
              placeholder="Student ID No."
              className="rounded p-2 text-white col-span-1"
            />
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="rounded p-2 text-[#8f92a1] bg-[#1F2235]"
            >
              <option value="" disabled selected>
                Select Course
              </option>
              <option>BSCS</option>
              <option>BSBA</option>
            </select>
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="rounded p-2 text-[#8f92a1] bg-[#1F2235]"
            >
              <option value="" disabled selected>
                Select Section
              </option>
              <option>Section A</option>
              <option>Section B</option>
            </select>
          </div>
        </section>

        <div className="flex justify-end mt-4">
          <button
            className="px-6 py-2 bg-yellow-400 text-white font-semibold rounded shadow hover:bg-yellow-500"
            onClick={handleSubmitAll}
          >
            Submit
          </button>
        </div>
      </main>
    </div>
  );
}
