import { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import SessionCard from "@/components/SessionCard";
import ActivityCard from "@/components/ActivityCard";
import Navbar from "@/components/Navbar";
import { Ghost, Wallet } from "lucide-react";
import { toast } from "sonner";

const AppPage = () => {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const [hasToken, setHasToken] = useState(false);
  const [tokenId, setTokenId] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);

  const SESSION_DURATION = 900; // 15 minutes in seconds

  const generateToken = () => {
    const mockToken = `zkp_0x${Math.random().toString(16).substr(2, 64)}`;
    setTokenId(mockToken);
    setHasToken(true);
    setSessionExpired(false);
    toast.success("GhostID token generated!");

    // Set expiration timer
    setTimeout(() => {
      setSessionExpired(true);
      setHasToken(false);
      toast.info("Your GhostID has vanished 👻");
    }, SESSION_DURATION * 1000);
  };

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

              <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-12 text-center">
                <div className="mb-6">
                  <div className="inline-flex p-6 rounded-2xl bg-primary/10 mb-4">
                    <Ghost className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">
                    Generate Your GhostID Token
                  </h2>
                  <p className="text-muted-foreground">
                    Create a zero-knowledge proof token for anonymous authentication
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={generateToken}
                  className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground ghost-glow"
                >
                  Generate GhostID Token
                </Button>
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
                <ActivityCard />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AppPage;
