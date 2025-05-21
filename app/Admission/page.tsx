import Navbar from './components/NavBar';
import VisionMission from './components/VisionMission';
import AboutSection from './components/AboutSection';

const AdmissionHome = () => {
  return (
    <div className="min-h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('/images/campus.jpg')" }}>
      <div className="bg-yellow-500 bg-opacity-90">
        <Navbar />
        <div className="flex flex-col items-center justify-center text-center py-16">
          <img src="/images/Lyceum-logo.png" alt="Logo" className="w-32 mb-4" />
          <h1 className="text-2xl md:text-3xl font-serif tracking-wide text-black">LYCEUM OF ALABANG</h1>
        </div>
        <VisionMission />
        <AboutSection />
      </div>
    </div>
  );
};

export default AdmissionHome;
