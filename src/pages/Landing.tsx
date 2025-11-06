import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import DeveloperSection from "@/components/DeveloperSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <BackgroundMusic />
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesGrid />
      <DeveloperSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Landing;
