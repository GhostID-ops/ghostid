import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Check } from "lucide-react";

const NPMSimulator = () => {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    { text: "$ npm install @ghostid/sdk", delay: 0 },
    { text: "npm WARN deprecated some-package@1.0.0", delay: 500, isWarning: true },
    { text: "⠋ Installing dependencies...", delay: 800, isLoading: true },
    { text: "⠙ Resolving packages...", delay: 1200, isLoading: true },
    { text: "⠹ Fetching @ghostid/sdk@2.1.0", delay: 1600, isLoading: true },
    { text: "⠸ Building fresh packages...", delay: 2000, isLoading: true },
    { text: "✓ @ghostid/sdk@2.1.0", delay: 2400, isSuccess: true },
    { text: "✓ zk-circuits@1.3.2", delay: 2600, isSuccess: true },
    { text: "✓ crypto-utils@0.9.1", delay: 2800, isSuccess: true },
    { text: "", delay: 3000 },
    { text: "added 3 packages in 2.8s", delay: 3200, isInfo: true },
    { text: "", delay: 3400 },
    { text: "$ ▌", delay: 3600, isCursor: true },
  ];

  useEffect(() => {
    if (isRunning && step < steps.length) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, steps[step].delay);
      return () => clearTimeout(timer);
    } else if (step >= steps.length) {
      setTimeout(() => {
        setStep(0);
        setIsRunning(false);
      }, 2000);
    }
  }, [step, isRunning, steps]);

  const startSimulation = () => {
    setStep(0);
    setIsRunning(true);
  };

  return (
    <div className="bg-[#1e1e1e] border border-border/50 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-border/30">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="text-sm font-mono text-muted-foreground">terminal</span>
        </div>
        {!isRunning && (
          <button
            onClick={startSimulation}
            className="text-xs px-3 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            Run Demo
          </button>
        )}
      </div>
      <div className="p-6 font-mono text-sm min-h-[300px]">
        <AnimatePresence mode="popLayout">
          {steps.slice(0, step + 1).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`mb-1 ${
                line.isWarning
                  ? "text-yellow-500"
                  : line.isSuccess
                  ? "text-green-500"
                  : line.isInfo
                  ? "text-blue-400"
                  : line.isLoading
                  ? "text-gray-400"
                  : "text-gray-300"
              }`}
            >
              {line.text}
              {line.isCursor && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  ▌
                </motion.span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NPMSimulator;
