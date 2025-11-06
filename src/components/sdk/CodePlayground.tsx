import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Play, Copy, Check } from "lucide-react";
import { toast } from "sonner";

const CodePlayground = () => {
  const [walletAddress, setWalletAddress] = useState("0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateToken = async () => {
    setIsRunning(true);
    setOutput("Initializing GhostID SDK...\n");
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setOutput(prev => prev + "Connecting to ZK circuit...\n");
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setOutput(prev => prev + "Generating zero-knowledge proof...\n");
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockToken = `zkp_0x${Math.random().toString(16).substr(2, 64)}`;
    const mockProof = `proof_0x${Math.random().toString(16).substr(2, 128)}`;
    
    setOutput(prev => prev + "\n✓ Token generated successfully!\n\n");
    setOutput(prev => prev + `{\n`);
    setOutput(prev => prev + `  "token": "${mockToken}",\n`);
    setOutput(prev => prev + `  "zkProof": "${mockProof}",\n`);
    setOutput(prev => prev + `  "wallet": "${walletAddress}",\n`);
    setOutput(prev => prev + `  "expiresIn": 900,\n`);
    setOutput(prev => prev + `  "timestamp": ${Date.now()}\n`);
    setOutput(prev => prev + `}\n`);
    
    setIsRunning(false);
    toast.success("Token generated successfully!");
  };

  const verifyToken = async () => {
    setIsRunning(true);
    setOutput("Verifying token...\n");
    
    await new Promise(resolve => setTimeout(resolve, 600));
    setOutput(prev => prev + "Checking cryptographic proof...\n");
    
    await new Promise(resolve => setTimeout(resolve, 800));
    setOutput(prev => prev + "Validating ZK circuit constraints...\n");
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOutput(prev => prev + "\n✓ Verification successful!\n\n");
    setOutput(prev => prev + `{\n`);
    setOutput(prev => prev + `  "isValid": true,\n`);
    setOutput(prev => prev + `  "anonymousId": "anon_${Math.random().toString(36).substr(2, 9)}",\n`);
    setOutput(prev => prev + `  "sessionActive": true,\n`);
    setOutput(prev => prev + `  "remainingTime": 895\n`);
    setOutput(prev => prev + `}\n`);
    
    setIsRunning(false);
    toast.success("Token verified!");
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Output copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Input Panel */}
      <div className="bg-card border border-border/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">Test Inputs</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">
              Wallet Address
            </label>
            <Input
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Button
              onClick={generateToken}
              disabled={isRunning}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Play className="mr-2 h-4 w-4" />
              {isRunning ? "Running..." : "Generate Token"}
            </Button>

            <Button
              onClick={verifyToken}
              disabled={isRunning}
              variant="outline"
              className="w-full border-primary/20 hover:bg-primary/10"
            >
              <Check className="mr-2 h-4 w-4" />
              Verify Token
            </Button>
          </div>

          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              This is a simulated playground. In production, these operations would interact with the actual GhostID protocol.
            </p>
          </div>
        </div>
      </div>

      {/* Output Panel */}
      <div className="bg-[#1e1e1e] border border-border/50 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-border/30">
          <span className="text-sm font-mono text-muted-foreground">output</span>
          {output && (
            <button
              onClick={copyOutput}
              className="text-xs px-3 py-1 rounded bg-primary/10 hover:bg-primary/20 text-primary transition-colors flex items-center gap-1"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          )}
        </div>
        <div className="p-6 font-mono text-sm min-h-[400px] max-h-[400px] overflow-y-auto">
          {output ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-400 whitespace-pre-wrap"
            >
              {output}
            </motion.div>
          ) : (
            <div className="text-gray-500 italic">
              Output will appear here when you run a command...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
