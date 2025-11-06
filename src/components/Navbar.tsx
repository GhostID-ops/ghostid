import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";

const Navbar = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 backdrop-blur-lg bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Ghost className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-xl">GhostID</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link to="/app" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              App
            </Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Docs
            </a>
          </div>

          <Button
            onClick={() => open()}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold ghost-glow"
          >
            {isConnected ? truncateAddress(address!) : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
