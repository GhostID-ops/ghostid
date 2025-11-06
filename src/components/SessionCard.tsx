import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Copy, RefreshCw, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface SessionCardProps {
  tokenId: string;
  expiresIn: number;
  onRegenerate: () => void;
}

const SessionCard = ({ tokenId, expiresIn, onRegenerate }: SessionCardProps) => {
  const [timeLeft, setTimeLeft] = useState(expiresIn);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [tokenId]);

  const progress = (timeLeft / expiresIn) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenId);
    setCopied(true);
    toast.success("Proof hash copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-card border border-primary/50 rounded-xl p-6 ghost-glow"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">GhostID Active</h3>
          </div>
          <p className="text-sm text-muted-foreground">Your anonymous session is live</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onRegenerate}
          className="border-primary/20 hover:bg-primary/10"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Regenerate
        </Button>
      </div>

      <div className="space-y-4">
        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">ZK Proof Hash</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-2 text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <code className="text-xs text-primary font-mono break-all">{tokenId}</code>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Session Lifetime</span>
            <span className="text-sm font-mono text-muted-foreground">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {timeLeft < 60 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-destructive flex items-center gap-2"
          >
            <span className="animate-pulse">⚠</span>
            Session expiring soon
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SessionCard;
