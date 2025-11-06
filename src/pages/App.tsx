import { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SessionCard from "@/components/SessionCard";
import ActivityCard from "@/components/ActivityCard";
import SystemStatus from "@/components/SystemStatus";
import TerminalAnimation from "@/components/TerminalAnimation";
import Navbar from "@/components/Navbar";
import { Ghost, Wallet } from "lucide-react";
import { toast } from "sonner";

interface ActivityEntry {
  app: string;
  action: string;
  time: string;
  timestamp: number;
}

const AppPage = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const [hasToken, setHasToken] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);

  const SESSION_DURATION = 900; // 15 minutes in seconds

  // Load activities from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('ghostid_activities');
    if (stored) {
      setActivities(JSON.parse(stored));
    }
  }, []);

  // Save activities to localStorage whenever they change
  useEffect(() => {
    if (activities.length > 0) {
      localStorage.setItem('ghostid_activities', JSON.stringify(activities));
    }
  }, [activities]);

  const addActivity = (action: string) => {
    const newActivity: ActivityEntry = {
      app: "GhostID App",
      action,
      time: "Just now",
      timestamp: Date.now(),
    };
    setActivities((prev) => [newActivity, ...prev].slice(0, 10)); // Keep last 10
  };

  const generateToken = () => {
    const mockToken = `zkp_0x${Math.random().toString(16).substr(2, 64)}`;
    setTokenId(mockToken);
    setHasToken(true);
    setSessionExpired(false);
    addActivity("Generated ZK proof token");
    toast.success("GhostID token generated!");

    // Set expiration timer
    setTimeout(() => {
      setSessionExpired(true);
      setHasToken(false);
      addActivity("Session expired");
      toast.info("Your GhostID has vanished 👻");
    }, SESSION_DURATION * 1000);
  };

  // Track wallet connection
  useEffect(() => {
    if (isConnected && address) {
      addActivity(`Connected wallet ${address.slice(0, 6)}...${address.slice(-4)}`);
    }
  }, [isConnected, address]);

  const handleRegenerate = () => {
    generateToken();
  };

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        <SystemStatus isConnected={isConnected} />
        
        <AnimatePresence mode="wait">
          {!isConnected ? (
            <motion.div
              key="connect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl mx-auto text-center py-20"
            >
              <div className="mb-8">
                <div className="inline-flex p-6 rounded-2xl bg-primary/10 mb-6 animate-float">
                  <Ghost className="h-16 w-16 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Generate Anonymous Session
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Connect your wallet to create a privacy-focused ZK authentication token
                </p>
              </div>

              <Button
                size="lg"
                onClick={() => open()}
                className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground ghost-glow"
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect Wallet
              </Button>
            </motion.div>
          ) : sessionExpired ? (
            <motion.div
              key="expired"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-2xl mx-auto text-center py-20"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-12">
                <div className="mb-6">
                  <Ghost className="h-24 w-24 text-muted-foreground/50 mx-auto animate-pulse-slow" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Your GhostID has vanished 👻</h2>
                <p className="text-muted-foreground mb-8">
                  Your session has expired. Generate a new token to continue.
                </p>
                <Button
                  size="lg"
                  onClick={handleRegenerate}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground ghost-glow"
                >
                  Generate New Token
                </Button>
              </div>
            </motion.div>
          ) : !hasToken ? (
            <motion.div
              key="generate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Welcome <span className="text-gradient">Anonymous</span>
                </h1>
                <p className="text-xl text-muted-foreground">
                  Connected with {truncateAddress(address!)}
                </p>
              </div>

              <div className="bg-card border border-primary/20 rounded-2xl p-8 md:p-12">
                <div className="mb-8">
                  <div className="inline-flex p-6 rounded-2xl bg-primary/5 mb-4 border border-primary/10">
                    <Ghost className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-4">
                    Generate Your GhostID Token
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Initialize zero-knowledge proof protocol for anonymous authentication
                  </p>
                </div>

                <TerminalAnimation walletAddress={address} />

                <div className="mt-8 text-center">
                  <Button
                    size="lg"
                    onClick={generateToken}
                    className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground ghost-glow font-mono"
                  >
                    $ INITIALIZE GHOSTID
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Active Session
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your anonymous identity is protected
                </p>
              </div>

              <div className="grid gap-6">
                <SessionCard
                  tokenId={tokenId}
                  expiresIn={SESSION_DURATION}
                  onRegenerate={handleRegenerate}
                />
                <ActivityCard activities={activities} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AppPage;
