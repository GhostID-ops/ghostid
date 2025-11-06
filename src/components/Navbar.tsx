import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ghost, Zap, BookOpen } from "lucide-react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { useState } from "react";
import GlitchTransition from "./GlitchTransition";

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const location = useLocation();
  const [showGlitch, setShowGlitch] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleLaunchApp = () => {
    const hasVisited = localStorage.getItem('ghostid_visited');
    
    if (!hasVisited && location.pathname === '/') {
      localStorage.setItem('ghostid_visited', 'true');
      setShowGlitch(true);
      setIsNavigating(true);
    } else {
      window.location.href = '/app';
    }
  };

  const handleGlitchComplete = () => {
    setShowGlitch(false);
    setTimeout(() => {
      window.location.href = '/app';
    }, 100);
  };

  return (
    <>
      <GlitchTransition isVisible={showGlitch} onComplete={handleGlitchComplete} />
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-lg bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Ghost className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl font-montserrat">GhostID</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <a href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <Link to="/sdk" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              SDK
            </Link>
            <Link to="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </Link>
            <a href="/#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            {location.pathname === '/' ? (
              <>
                <Button
                  onClick={handleLaunchApp}
                  disabled={isNavigating}
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold ghost-glow"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Launch App
                </Button>
              </>
            ) : (
              <Button
                onClick={() => open()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold ghost-glow"
              >
                {isConnected ? truncateAddress(address!) : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
