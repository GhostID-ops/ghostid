import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Copy, Check, Terminal, Book, Code2, Zap, Shield, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SDK = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const codeBlocks = [
    {
      title: "Installation",
      code: "npm install @ghostid/sdk",
      language: "bash",
    },
    {
      title: "Basic Setup",
      code: `import { GhostID } from "@ghostid/sdk";

const ghost = new GhostID({
  apiKey: process.env.GHOSTID_API_KEY,
  network: "mainnet", // or "testnet"
  options: {
    tokenExpiry: 900, // 15 minutes
    autoRefresh: true
  }
});`,
      language: "typescript",
    },
    {
      title: "Generate Anonymous Token",
      code: `// Generate ZK proof token for user
const result = await ghost.generateToken({
  wallet: userWalletAddress,
  metadata: {
    sessionId: "unique-session-id",
    timestamp: Date.now()
  }
});

console.log("Token:", result.token);
console.log("Proof:", result.zkProof);`,
      language: "typescript",
    },
    {
      title: "Verify Authentication",
      code: `// Verify token on your backend
const verification = await ghost.verify({
  token: userToken,
  proof: zkProof
});

if (verification.isValid) {
  console.log("User authenticated anonymously");
  // Grant access to protected resources
} else {
  console.log("Invalid token");
}`,
      language: "typescript",
    },
    {
      title: "React Integration",
      code: `import { useGhostID } from "@ghostid/sdk/react";

function LoginButton() {
  const { connect, isConnected, token } = useGhostID();

  return (
    <button onClick={connect}>
      {isConnected ? \`Connected: \${token.slice(0, 10)}...\` : "Connect with GhostID"}
    </button>
  );
}`,
      language: "typescript",
    },
    {
      title: "Session Management",
      code: `// Check if session is active
const isActive = await ghost.isSessionActive();

// Refresh token before expiry
await ghost.refreshToken();

// Revoke session
await ghost.revokeSession();

// Listen to session events
ghost.on('sessionExpired', () => {
  console.log('Session expired - generate new token');
});`,
      language: "typescript",
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Zero-Knowledge Proofs",
      description: "Generate cryptographic proofs without revealing wallet addresses",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Sub-second proof generation and verification",
    },
    {
      icon: Package,
      title: "Framework Agnostic",
      description: "Works with React, Vue, Angular, and vanilla JavaScript",
    },
    {
      icon: Code2,
      title: "TypeScript Support",
      description: "Full type definitions and IntelliSense support",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <div className="inline-flex p-4 rounded-2xl bg-primary/10 mb-6">
            <Terminal className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            GhostID <span className="text-gradient">SDK</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Integrate privacy-first authentication into your dApp with just a few lines of code.
            Built for developers who value user privacy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground ghost-glow">
              <Book className="mr-2 h-5 w-5" />
              Documentation
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10">
              View on GitHub
            </Button>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all"
            >
              <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Quick Start */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Quick Start Guide</h2>
          
          <Tabs defaultValue="installation" className="max-w-5xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="basic">Basic Usage</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="installation" className="space-y-6">
              {codeBlocks.slice(0, 2).map((block, index) => (
                <div key={index} className="bg-card border border-border/50 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-3 border-b border-border/50">
                    <h3 className="font-semibold text-sm">{block.title}</h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(block.code, index)}
                      className="h-8 px-2"
                    >
                      {copiedIndex === index ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="p-6 overflow-x-auto">
                    <code className="text-sm font-mono text-muted-foreground">
                      {block.code}
                    </code>
                  </pre>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="basic" className="space-y-6">
              {codeBlocks.slice(2, 4).map((block, index) => (
                <div key={index + 2} className="bg-card border border-border/50 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-3 border-b border-border/50">
                    <h3 className="font-semibold text-sm">{block.title}</h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(block.code, index + 2)}
                      className="h-8 px-2"
                    >
                      {copiedIndex === index + 2 ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="p-6 overflow-x-auto">
                    <code className="text-sm font-mono text-muted-foreground">
                      {block.code}
                    </code>
                  </pre>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              {codeBlocks.slice(4).map((block, index) => (
                <div key={index + 4} className="bg-card border border-border/50 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-3 border-b border-border/50">
                    <h3 className="font-semibold text-sm">{block.title}</h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(block.code, index + 4)}
                      className="h-8 px-2"
                    >
                      {copiedIndex === index + 4 ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <pre className="p-6 overflow-x-auto">
                    <code className="text-sm font-mono text-muted-foreground">
                      {block.code}
                    </code>
                  </pre>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* API Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16 max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">API Reference</h2>
          
          <div className="space-y-6">
            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Core Methods</h3>
              <div className="space-y-4">
                <div className="border-l-2 border-primary pl-4">
                  <code className="text-primary font-mono text-sm">generateToken(options)</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Generates a zero-knowledge proof token for anonymous authentication.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Returns: <code className="text-primary">Promise&lt;TokenResult&gt;</code>
                  </p>
                </div>

                <div className="border-l-2 border-primary pl-4">
                  <code className="text-primary font-mono text-sm">verify(token, proof)</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Verifies the validity of a GhostID token and its cryptographic proof.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Returns: <code className="text-primary">Promise&lt;VerificationResult&gt;</code>
                  </p>
                </div>

                <div className="border-l-2 border-primary pl-4">
                  <code className="text-primary font-mono text-sm">refreshToken()</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Refreshes the current session token before expiration.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Returns: <code className="text-primary">Promise&lt;TokenResult&gt;</code>
                  </p>
                </div>

                <div className="border-l-2 border-primary pl-4">
                  <code className="text-primary font-mono text-sm">revokeSession()</code>
                  <p className="text-sm text-muted-foreground mt-2">
                    Immediately revokes the current session and invalidates the token.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Returns: <code className="text-primary">Promise&lt;void&gt;</code>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Configuration</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-2 px-4">Property</th>
                      <th className="text-left py-2 px-4">Type</th>
                      <th className="text-left py-2 px-4">Required</th>
                      <th className="text-left py-2 px-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4"><code className="text-primary">apiKey</code></td>
                      <td className="py-2 px-4">string</td>
                      <td className="py-2 px-4">Yes</td>
                      <td className="py-2 px-4">Your GhostID API key</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4"><code className="text-primary">network</code></td>
                      <td className="py-2 px-4">string</td>
                      <td className="py-2 px-4">No</td>
                      <td className="py-2 px-4">Blockchain network (mainnet/testnet)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 px-4"><code className="text-primary">tokenExpiry</code></td>
                      <td className="py-2 px-4">number</td>
                      <td className="py-2 px-4">No</td>
                      <td className="py-2 px-4">Token expiration time in seconds</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4"><code className="text-primary">autoRefresh</code></td>
                      <td className="py-2 px-4">boolean</td>
                      <td className="py-2 px-4">No</td>
                      <td className="py-2 px-4">Automatically refresh tokens before expiry</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card/50 border border-primary/20 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Help?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Join our developer community or check out the full documentation for detailed guides and examples.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              Join Discord
            </Button>
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              Stack Overflow
            </Button>
            <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
              Report an Issue
            </Button>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default SDK;
