// app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
        Welcome to the School Management System
      </h1>
      <p className="text-lg mb-12 text-center max-w-xl">
        Please choose a module to proceed. This ERP system includes modules for
        students, admissions, registrar, and accounting.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <ModuleCard
          title="Student Portal"
          href="/portal/login"
          description="Access grades, schedules, and announcements."
        />
        <ModuleCard
          title="Admission"
          href="/admission"
          description="Manage applications, requirements, and status updates."
        />
        <ModuleCard
          title="Registrar"
          href="/registrar/login"
          description="Oversee student records, subjects, and enrollment history."
        />
        <ModuleCard
          title="Accounting"
          href="/accounting"
          description="Handle tuition payments, fees, and financial records."
        />
      </div>
    </div>
  );
}

function ModuleCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 block"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
}
