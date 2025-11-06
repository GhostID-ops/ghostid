import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface TerminalAnimationProps {
  walletAddress?: string;
}

const TerminalAnimation = ({ walletAddress }: TerminalAnimationProps) => {
  const terminalCommands = [
    "$ initializing zkp_module...",
    "> generating proof parameters",
    `> commitment: ${walletAddress || '0x7f8e9a2b...'}`,
    "> witness generation: COMPLETE",
    "$ verifying circuit constraints",
    "> proof validation: SUCCESS",
    "$ creating anonymous identity",
    "> session_token: GENERATED",
    "$ GhostID ready.",
  ];
  const [lines, setLines] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < terminalCommands.length) {
      const timer = setTimeout(() => {
        setLines((prev) => [...prev, terminalCommands[currentIndex]]);
        setCurrentIndex((prev) => prev + 1);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  return (
    <div className="bg-black/40 border border-primary/20 rounded-lg p-6 font-mono text-sm overflow-hidden">
      <div className="space-y-2">
        {lines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <span className="text-primary terminal-glow">{line}</span>
            {index === lines.length - 1 && index < terminalCommands.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-primary"
              >
                _
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TerminalAnimation;
