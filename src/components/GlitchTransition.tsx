import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchTransitionProps {
  isVisible: boolean;
  onComplete: () => void;
}

const GlitchTransition = ({ isVisible, onComplete }: GlitchTransitionProps) => {
  const [glitchPhase, setGlitchPhase] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const phases = [
        { delay: 0, duration: 300 },
        { delay: 300, duration: 200 },
        { delay: 500, duration: 400 },
        { delay: 900, duration: 300 },
        { delay: 1200, duration: 500 },
      ];

      phases.forEach((phase, index) => {
        setTimeout(() => setGlitchPhase(index + 1), phase.delay);
      });

      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [isVisible, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          {/* Glitch overlay layers */}
          <motion.div
            className="absolute inset-0 bg-primary/20"
            animate={{
              opacity: [0, 1, 0, 1, 0],
              scaleX: [1, 1.02, 1, 1.01, 1],
            }}
            transition={{
              duration: 0.3,
              repeat: 4,
              repeatType: "mirror",
            }}
          />
          
          {/* RGB split effect */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(255,0,0,0.3) 0%, rgba(0,255,0,0.3) 50%, rgba(0,0,255,0.3) 100%)",
              mixBlendMode: "screen",
            }}
            animate={{
              x: [-5, 5, -3, 3, 0],
              opacity: [0, 0.8, 0, 0.6, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: 6,
            }}
          />

          {/* Scanlines */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="h-px bg-primary"
                style={{
                  position: "absolute",
                  top: `${i * 2}%`,
                  width: "100%",
                }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.1,
                  delay: i * 0.01,
                  repeat: 2,
                }}
              />
            ))}
          </div>

          {/* Central glitch text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-4xl md:text-6xl font-bold font-mono"
              animate={{
                opacity: [0, 1, 0, 1, 0, 1, 0],
                scale: [1, 1.05, 0.95, 1.02, 1],
                rotate: [0, -2, 2, -1, 0],
              }}
              transition={{
                duration: 2,
              }}
            >
              <span className="text-primary glitch-text">INITIALIZING</span>
            </motion.div>
          </div>

          {/* Random glitch blocks */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-primary/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${50 + Math.random() * 200}px`,
                height: `${2 + Math.random() * 10}px`,
              }}
              animate={{
                opacity: [0, 1, 0],
                x: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: 0.2,
                delay: i * 0.15,
                repeat: 2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlitchTransition;
