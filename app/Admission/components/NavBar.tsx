import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [showCourses, setShowCourses] = useState(false);
  const [showOffers, setShowOffers] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 py-4 text-black font-serif text-sm relative">
      <div className="flex items-center gap-2">
        <img src="/images/Lyceum-logo.png" alt="Logo" className="w-8 h-8" />
        <span className="font-bold uppercase tracking-wide">Lyceum of Alabang</span>
      </div>

      <div className="flex gap-6 items-center">
        <a href="#" className="hover:underline">About</a>

        <div
          onMouseEnter={() => setShowCourses(true)}
          onMouseLeave={() => setShowCourses(false)}
          className="relative"
        >
          <button className="hover:underline">Courses</button>
          {showCourses && (
            <div className="absolute top-full left-0 mt-2 w-60 bg-yellow-300 text-black shadow-lg rounded-md z-10 p-2">
              {[
                'College of Arts and Science',
                'College of Criminal Justice',
                'College of Computer Studies',
                'College of Engineering',
                'College of Education',
                'College of Business Administration',
                'College of Real Estate Management',
                'College of Tourism and Hospitality Management',
                'College of Business Management Education'
              ].map((item, i) => (
                <div key={i} className="px-3 py-2 hover:bg-yellow-200 cursor-pointer rounded">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          onMouseEnter={() => setShowOffers(true)}
          onMouseLeave={() => setShowOffers(false)}
          className="relative"
        >
          <button className="hover:underline">Offers</button>
          {showOffers && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-yellow-300 text-black shadow-lg rounded-md z-10 p-2">
              {[
                'Entrance Scholarship (for new student)',
                'Academic Scholarship/Deans Lister Scholarship',
                'Sports and Cultural',
                'Administrative Scholarship',
                'LOA Student Publication'
              ].map((item, i) => (
                <div key={i} className="px-3 py-2 hover:bg-yellow-200 cursor-pointer rounded">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        <Link href="/admission/signup" className="hover:underline">Sign up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
