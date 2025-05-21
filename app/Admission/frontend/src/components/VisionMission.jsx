import React from 'react';
import { Eye, MapPin } from 'lucide-react';

const VisionMission = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center text-black text-center gap-10 pb-20 px-4">
      <div className="w-72">
        <Eye className="mx-auto mb-2" />
        <h2 className="text-lg font-semibold mb-1">Vision</h2>
        <p className="text-sm">
          Lyceum of Alabang envisions becoming one of the nation’s leading educational institutions in providing quality and advancement of knowledge, skills, and values for personal, community, and national development.
        </p>
      </div>
      <div className="w-72">
        <MapPin className="mx-auto mb-2" />
        <h2 className="text-lg font-semibold mb-1">Mission</h2>
        <p className="text-sm">
          Lyceum of Alabang shall provide world-class education and training through competent personnel, high-end facilities, and advanced technology and equipment, and accredited curriculum of industry-based courses.
        </p>
      </div>
    </div>
  );
};

export default VisionMission;
