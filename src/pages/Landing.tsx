import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import DeveloperSection from "@/components/DeveloperSection";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <FeaturesGrid />
      <DeveloperSection />
      <Footer />
    </div>
  );
};

export default Landing;
