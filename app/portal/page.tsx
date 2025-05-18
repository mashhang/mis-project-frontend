// app/portal/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import InfoCard from './components/InfoCard'
import AttendanceChart from './components/AttendanceChart'
import CourseInstructors from './components/CourseInstructors'
import NoticeCard from './components/NoticeCard'
import { Laptop, BarChart, Code, Database, BookOpen, Clock } from 'lucide-react'
import dayjs from 'dayjs'
import Image from 'next/image'
import api from './lib/axios'
import banner from './assets/banner-person.png'

// Import instructor images
import teacher1Img from './assets/teacher1.jpg'
import teacher2Img from './assets/teacher2.jpg'
import teacher3Img from './assets/teacher3.jpg'

export default function PortalDashboard() {
  const router = useRouter()
  const [student, setStudent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState<any>(null)

  // Fetch student data
  useEffect(() => {
    const id = typeof window !== 'undefined' && localStorage.getItem('student_id')
    if (!id) {
      router.replace('/portal/login')
      return
    }
    api.get(`/get_student.php?id=${id}`)
      .then(res => setStudent(res.data))
      .catch(() => router.replace('/portal/login'))
      .finally(() => setLoading(false))
  }, [router])

  if (loading) return <p className="p-6">Loading…</p>
  if (!student) return (
    <div className="p-6 text-red-500">
      Failed to load data.&nbsp;
      <button onClick={() => router.replace('/portal/login')} className="underline">Try again</button>
    </div>
  )

  // Enrolled courses list with overview and schedule
  const enrolledCourses = [
    {
      id: 'oop',
      title: 'Object Oriented Programming',
      icon: Laptop,
      overview: 'This course covers OOP fundamentals: classes, objects, inheritance, encapsulation, and polymorphism. You will build real-world projects.',
      schedule: 'Mon & Wed 10:00 - 11:30'
    },
    {
      id: 'db',
      title: 'Fundamentals of Database Systems',
      icon: BarChart,
      overview: 'Learn relational database design, SQL querying, normalization, and transaction management with hands-on labs.',
      schedule: 'Tue & Thu 14:00 - 15:30'
    },
    {
      id: 'jsw',
      title: 'JavaScript Web Development',
      icon: Code,
      overview: 'Master modern JavaScript, DOM manipulation, and building interactive web applications using frameworks.',
      schedule: 'Mon & Wed 13:00 - 14:30'
    },
    {
      id: 'ds',
      title: 'Data Structures & Algorithms',
      icon: Database,
      overview: 'Study common data structures and algorithms with complexity analysis and coding practice.',
      schedule: 'Tue & Thu 10:00 - 11:30'
    },
    {
      id: 'wd',
      title: 'Web Design Principles',
      icon: BookOpen,
      overview: 'Explore UX/UI principles, responsive layouts, and accessibility best practices.',
      schedule: 'Fri 09:00 - 12:00'
    },
    {
      id: 'ts',
      title: 'Time Management & Productivity',
      icon: Clock,
      overview: 'Learn techniques to manage your time, set goals, and boost productivity for academic and personal projects.',
      schedule: 'Fri 13:00 - 15:00'
    }
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 mt-4"><Topbar /></div>
        <main className="max-w-7xl mx-auto px-4 py-4 space-y-4">

          {/* Welcome banner */}
          <div className="bg-white rounded-xl shadow p-4">
            <section className="bg-purple-600 text-white rounded-lg p-4 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase opacity-70 mb-1">{dayjs().format('D MMM, YYYY')}</div>
                <h2 className="text-base font-bold mb-1">Welcome back, {student.first_name} {student.last_name}!</h2>
                <p className="text-xs opacity-90">You’re enrolled in {student.course}, Year {student.year_level}.</p>
              </div>
              <Image src={banner} alt="celebration" width={80} height={80} />
            </section>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard
              title="Basic Info"
              items={[
                { label: 'Course', value: student.course || '-' },
                { label: 'Year Level', value: student.year_level || '-' },
              ]}
            />
            <AttendanceChart />
            <CourseInstructors
              instructors={[
                { name: 'Prof. Jane Doe', avatar: teacher1Img.src, bio: 'Expert in OOP and software design patterns.' },
                { name: 'Dr. John Smith', avatar: teacher2Img.src, bio: 'Specializes in database systems and SQL optimization.' },
                { name: 'Dr. Alice Lee', avatar: teacher3Img.src, bio: 'Focuses on algorithms, data structures, and performance.' }
              ]}
            />
            <NoticeCard />
          </div>

          {/* Enrolled Courses Window */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-700 font-semibold text-sm">Enrolled Courses</h3>
              <span className="text-purple-600 text-xs">Click "View" for overview & schedule</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {enrolledCourses.map(course => (
                <div key={course.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow">
                  <div className="flex items-center space-x-3">
                    <course.icon className="h-6 w-6 text-purple-600" />
                    <span className="font-medium">{course.title}</span>
                  </div>
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Course Overview Modal */}
          {selectedCourse && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
                <button onClick={() => setSelectedCourse(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">&times;</button>
                <h2 className="text-xl font-bold mb-2">{selectedCourse.title}</h2>
                <p className="text-gray-700 mb-2">{selectedCourse.overview}</p>
                <p className="text-gray-600 italic">Schedule: {selectedCourse.schedule}</p>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >Close</button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}
