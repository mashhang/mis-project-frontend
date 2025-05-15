// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import InfoCard from "../components/InfoCard";
import AttendanceChart from "../components/AttendanceChart";
import CourseInstructors from "../components/CourseInstructors";
import NoticeCard from "../components/NoticeCard";
import CourseCard from "../components/CourseCard";
import { Laptop, BarChart } from "lucide-react";
import dayjs from "dayjs";
import banner from "../assets/banner-person.png";
import axios from "../lib/axios";

export default function DashboardPage() {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("student_id");
    if (id) {
      axios
        .get(`get_student.php?id=${id}`)
        .then((res) => setStudent(res.data))
        .catch(console.error);
    }
  }, []);

  const instructors = [
    { name: "Prof. Jane Doe", avatar: "/assets/inst1.png" },
    { name: "Dr. John Smith", avatar: "/assets/inst2.png" },
    { name: "Dr. Alice Lee", avatar: "/assets/inst3.png" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-y-scroll">
        <div className="max-w-7xl mx-auto px-4 mt-4">
          <Topbar />
        </div>

        <main className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          {/* Welcome banner */}
          <div className="bg-white rounded-xl shadow p-4">
            <section className="bg-purple-600 text-white rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase opacity-70 mb-1">
                  {dayjs().format("D MMM, YYYY")}
                </div>
                <h2 className="text-base font-bold mb-1">
                  Welcome back,{" "}
                  {student
                    ? `${student.first_name} ${student.last_name}`
                    : "Student"}
                  !
                </h2>
                <p className="text-xs opacity-90">
                  {student
                    ? `You’re enrolled in ${student.course}, Year ${student.year_level}.`
                    : "Always stay updated in your portal"}
                </p>
              </div>
              <img src={banner} alt="celebration" className="h-20" />
            </section>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard
              title="Basic Info"
              items={[
                { label: "Course", value: student?.course || "-" },
                { label: "Year Level", value: student?.year_level || "-" },
                { label: "Semester", value: student?.semester || "-" },
              ]}
            />
            <AttendanceChart />
            <CourseInstructors instructors={instructors} />
            <NoticeCard />
          </div>

          {/* Enrolled Courses */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-700 font-semibold text-sm">
                Enrolled Courses
              </h3>
              <a href="#" className="text-purple-600 text-xs hover:underline">
                See all
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CourseCard title="Object Oriented Programming" icon={Laptop} />
              <CourseCard
                title="Fundamentals of Database Systems"
                icon={BarChart}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
