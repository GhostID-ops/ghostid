import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundMusic = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Show control after a brief delay
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play();
        audioRef.current.volume = 0.15; // Subtle volume
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Audio element - Replace src with your sci-fi ambient track */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        {/* Using a data URL for a simple ambient tone generator as placeholder */}
        <source src="data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=" type="audio/wav" />
      </audio>

      {/* Floating music control */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="icon"
              variant="outline"
              onClick={toggleMute}
              className="h-12 w-12 rounded-full bg-background/80 backdrop-blur-lg border-primary/20 hover:bg-primary/10 hover:border-primary/40 transition-all shadow-lg"
              title={isMuted ? "Play ambient music" : "Mute ambient music"}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-muted-foreground" />
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Volume2 className="h-5 w-5 text-primary" />
                </motion.div>
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BackgroundMusic;
