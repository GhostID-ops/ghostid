import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  type?: "fade" | "slide" | "glitch" | "typewriter";
}

const AnimatedText = ({ children, className = "", delay = 0, type = "fade" }: AnimatedTextProps) => {
  const variants = {
    fade: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
    slide: {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
    },
    glitch: {
      hidden: { opacity: 0, filter: "blur(10px)" },
      visible: { 
        opacity: 1, 
        filter: "blur(0px)",
      },
    },
    typewriter: {
      hidden: { opacity: 0, width: 0 },
      visible: { opacity: 1, width: "auto" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants[type]}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedText;
