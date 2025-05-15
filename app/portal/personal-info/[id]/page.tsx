// app/portal/personal-info/[id]/page.tsx
'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Sidebar from '../../components/Sidebar'
import Topbar from '../../components/Topbar'
import axios from '../../lib/axios'   // baseURL → http://localhost/backend/portal
import { Edit2, Save, X } from 'lucide-react'
import dayjs from 'dayjs'
import Image from 'next/image'
import banner from '../../assets/banner-person.png'

export default function PersonalInfoPage() {
  const router = useRouter()
  const { id } = useParams()    // numeric PK

  const [form, setForm]       = useState(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  // Fetch student by numeric id
  const fetchStudent = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await axios.get(
        `/get_student.php?id=${encodeURIComponent(id)}`,
        { withCredentials: true }
      )
      const data = res.data
      // Ensure optional UI fields exist
      data.location = data.location || ''
      data.about    = data.about    || ''
      if (data.date_of_birth === '0000-00-00') data.date_of_birth = ''
      setForm(data)
    } catch (err) {
      console.error('Fetch error', err)
      setError('Unable to load your information.')
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (!id) {
      router.replace('/portal/login')
      return
    }
    fetchStudent()
  }, [id, router, fetchStudent])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }, [])

  const handleSave = async () => {
    setError('')
    try {
      await axios.post(
        `/update_student.php`,
        { ...form, id },
        { withCredentials: true }
      )
      setEditing(false)
      await fetchStudent()           // refresh data to pick up saved fields
    } catch (err) {
      console.error('Save error', err)
      setError('Failed to save. Try again.')
    }
  }

  const handleCancel = () => {
    setEditing(false)
    fetchStudent()
  }

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading…</div>
  }
  if (error && !form) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <TopbarContainer />
        <main className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          <Banner />
          <Controls editing={editing} onSave={handleSave} onCancel={handleCancel} onEdit={() => setEditing(true)} />
          <FieldsGrid form={form} editing={editing} onChange={handleChange} />
        </main>
      </div>
    </div>
  )
}

function TopbarContainer() {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-4">
      <Topbar />
    </div>
  )
}

function Banner() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <section className="bg-purple-600 text-white rounded-lg p-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase opacity-70 mb-1">
            {dayjs().format('D MMM, YYYY')}
          </div>
          <h2 className="text-base font-bold mb-1">Personal Information</h2>
          <p className="text-xs opacity-90">Edit your details below.</p>
        </div>
        <Image src={banner} alt="banner" width={80} height={80} />
      </section>
    </div>
  )
}

function Controls({ editing, onSave, onCancel, onEdit }) {
  return (
    <div className="flex justify-end space-x-2">
      {editing ? (
        <>
          <button onClick={onSave} className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <Save className="mr-2" /> Save
          </button>
          <button onClick={onCancel} className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            <X className="mr-2" /> Cancel
          </button>
        </>
      ) : (
        <button onClick={onEdit} className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          <Edit2 className="mr-2" /> Edit
        </button>
      )}
    </div>
  )
}

function FieldsGrid({ form, editing, onChange }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card title="Personal Info">
          <Field label="First Name" name="first_name" value={form.first_name} onChange={onChange} editing={editing} />
          <Field label="Last Name"  name="last_name"  value={form.last_name}   onChange={onChange} editing={editing} />
          <Field label="Email"      name="email"      value={form.email}       onChange={onChange} editing={editing} />
          <Field label="Contact #"  name="contact_number" value={form.contact_number} onChange={onChange} editing={editing} />
          <Field label="DOB"        name="date_of_birth" type="date" value={form.date_of_birth} onChange={onChange} editing={editing} />
          <Field label="Gender"     name="gender"     type="select" options={["Male","Female","Others"]} value={form.gender} onChange={onChange} editing={editing} />
        </Card>
        <Card title="Academic Info">
          <Field label="Course"     name="course"     value={form.course}     onChange={onChange} editing={editing} />
          <Field label="Year Level" name="year_level" type="number" value={form.year_level} onChange={onChange} editing={editing} />
        </Card>
      </div>
      <div className="space-y-6">
        <Card title="Profile Photo">
          {editing ? (
            <PhotoEditor url={form.photo_url} onChange={onChange} />
          ) : (
            <PhotoViewer url={form.photo_url} name={`${form.first_name} ${form.last_name}`} />
          )}
        </Card>
        <Card title="Additional Info">
          <Field label="Address"  name="location" value={form.location} onChange={onChange} editing={editing} />
          <Field label="About Me" name="about"    type="textarea" value={form.about} onChange={onChange} editing={editing} />
        </Card>
      </div>
    </div>
  )
}

function PhotoEditor({ url, onChange }) {
  return (
    <>
      <input
        name="photo_url"
        value={url||''}
        onChange={onChange}
        placeholder="Paste image URL here"
        className="w-full px-4 py-2 border rounded mb-4"
      />
      <div className="flex justify-center">
        <div className="w-32 h-32 rounded-full bg-gray-100 overflow-hidden">
          {url ? <img src={url} alt="Preview" className="w-full h-full object-cover" /> : <Placeholder />}
        </div>
      </div>
    </>
  )
}

function PhotoViewer({ url, name }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-32 h-32 rounded-full overflow-hidden mb-3">
        <img src={url||'/default-avatar.png'} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <h4 className="font-semibold">{name}</h4>
    </div>
  )
}

function Placeholder() {
  return <div className="flex items-center justify-center h-full text-gray-400">No image</div>
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow">
      {title && <div className="px-6 py-3 border-b"><h3 className="font-semibold">{title}</h3></div>}
      <div className="p-6">{children}</div>
    </div>
  )
}

function Field({ label, name, type='text', options=[], value, onChange, editing }) {
  const base = "w-full p-2 border rounded mb-4"
  if (!editing) {
    return (
      <div>
        <label className="block text-sm mb-1">{label}</label>
        <div className="bg-gray-100 p-2">{value||'-'}</div>
      </div>
    )
  }
  if (type === 'select') {
    return (
      <div>
        <label className="block text-sm mb-1">{label}</label>
        <select name={name} value={value||''} onChange={onChange} className={base}>
          <option value="">Select</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    )
  }
  if (type === 'textarea') {
    return (
      <div>
        <label className="block text-sm mb-1">{label}</label>
        <textarea name={name} value={value||''} onChange={onChange} className={`${base} h-24 resize-none`} />
      </div>
    )
  }
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input type={type} name={name} value={value||''} onChange={onChange} className={base} />
    </div>
  )
}
