import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import FeaturesGrid from "@/components/FeaturesGrid";
import DeveloperSection from "@/components/DeveloperSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import BackgroundMusic from "@/components/BackgroundMusic";
import ParticleEffect from "@/components/ParticleEffect";
import ScrollProgress from "@/components/ScrollProgress";
import SpotlightCursor from "@/components/SpotlightCursor";
import GridBackground from "@/components/GridBackground";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Landing = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div ref={ref} className="min-h-screen bg-background">
      <GridBackground />
      <SpotlightCursor />
      <ScrollProgress />
      <ParticleEffect />
      <BackgroundMusic />
      <Navbar />
      <motion.div style={{ opacity, scale }}>
        <HeroSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <HowItWorks />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <FeaturesGrid />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <DeveloperSection />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <AboutSection />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Landing;
