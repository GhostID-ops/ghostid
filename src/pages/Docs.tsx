import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { 
  BookOpen, 
  Shield, 
  Zap, 
  Code, 
  Users, 
  Lock,
  Home,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Docs = () => {
  const [selectedSection, setSelectedSection] = useState("introduction");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sections = [
    {
      title: "Getting Started",
      icon: BookOpen,
      items: [
        { id: "introduction", label: "Introduction" },
        { id: "quick-start", label: "Quick Start" },
        { id: "installation", label: "Installation" },
      ],
    },
    {
      title: "Core Concepts",
      icon: Shield,
      items: [
        { id: "how-it-works", label: "How It Works" },
        { id: "privacy", label: "Privacy & Security" },
        { id: "zk-proofs", label: "Zero-Knowledge Proofs" },
      ],
    },
    {
      title: "Integration",
      icon: Code,
      items: [
        { id: "sdk-setup", label: "SDK Setup" },
        { id: "authentication", label: "Authentication Flow" },
        { id: "api-reference", label: "API Reference" },
      ],
    },
    {
      title: "Advanced",
      icon: Zap,
      items: [
        { id: "custom-sessions", label: "Custom Sessions" },
        { id: "enterprise", label: "Enterprise Features" },
        { id: "best-practices", label: "Best Practices" },
      ],
    },
  ];

  const content: Record<string, { title: string; content: JSX.Element }> = {
    introduction: {
      title: "Introduction to GhostID",
      content: (
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            GhostID is a privacy-first Web3 authentication solution that allows users to prove ownership of wallet credentials without revealing their actual wallet address.
          </p>
          
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Why GhostID?
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Complete anonymity - your wallet address is never exposed</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>One-time use tokens prevent tracking across sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Zero-knowledge proofs ensure cryptographic verification</span>
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Enterprise-grade security with decentralized architecture</span>
              </li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mt-8">Key Features</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 border-primary/10 bg-card/50">
              <h4 className="font-semibold mb-2">Anonymous Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Sign in without revealing your wallet identity to any third party.
              </p>
            </Card>
            <Card className="p-4 border-primary/10 bg-card/50">
              <h4 className="font-semibold mb-2">Session Management</h4>
              <p className="text-sm text-muted-foreground">
                Secure, time-limited sessions with automatic token rotation.
              </p>
            </Card>
            <Card className="p-4 border-primary/10 bg-card/50">
              <h4 className="font-semibold mb-2">Multi-Chain Support</h4>
              <p className="text-sm text-muted-foreground">
                Works across Ethereum, Polygon, Arbitrum, and other EVM chains.
              </p>
            </Card>
            <Card className="p-4 border-primary/10 bg-card/50">
              <h4 className="font-semibold mb-2">Developer Friendly</h4>
              <p className="text-sm text-muted-foreground">
                Simple SDK integration with comprehensive documentation.
              </p>
            </Card>
          </div>
        </div>
      ),
    },
    "quick-start": {
      title: "Quick Start Guide",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Get started with GhostID in less than 5 minutes. Follow these steps to integrate anonymous authentication into your Web3 application.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Step 1: Install the SDK</h3>
              <Card className="p-4 bg-muted/50 font-mono text-sm">
                npm install @ghostid/sdk
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Step 2: Initialize GhostID</h3>
              <Card className="p-4 bg-muted/50 font-mono text-sm">
                <pre>{`import { GhostID } from '@ghostid/sdk';

const ghost = new GhostID({
  apiKey: 'your-api-key',
  network: 'mainnet'
});`}</pre>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Step 3: Create a Session</h3>
              <Card className="p-4 bg-muted/50 font-mono text-sm">
                <pre>{`const session = await ghost.createSession({
  duration: 3600, // 1 hour
  permissions: ['read', 'write']
});

console.log('Session token:', session.token);`}</pre>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Step 4: Verify Authentication</h3>
              <Card className="p-4 bg-muted/50 font-mono text-sm">
                <pre>{`const isValid = await ghost.verifySession(
  session.token
);

if (isValid) {
  console.log('User authenticated!');
}`}</pre>
              </Card>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mt-8">
            <h4 className="font-semibold mb-2">Next Steps</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Now that you have the basics working, explore advanced features:
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedSection("authentication")}
              >
                Authentication Flow
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedSection("api-reference")}
              >
                API Reference
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSelectedSection("best-practices")}
              >
                Best Practices
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    installation: {
      title: "Installation",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            GhostID can be installed via npm, yarn, or pnpm. Choose your preferred package manager below.
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Using npm</h3>
              <Card className="p-4 bg-muted/50 font-mono text-sm">
                npm install @ghostid/sdk
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Using yarn</h3>
              <Card className="p-4 bg-muted/50 font-mono text-sm">
                yarn add @ghostid/sdk
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Using pnpm</h3>
              <Card className="p-4 bg-muted/50 font-mono text-sm">
                pnpm add @ghostid/sdk
              </Card>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8">System Requirements</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
              Node.js 16.x or higher
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
              React 18.x or higher (for React integration)
            </li>
            <li className="flex items-start gap-2">
              <ChevronRight className="h-5 w-5 text-primary mt-0.5" />
              TypeScript 4.5+ (recommended)
            </li>
          </ul>
        </div>
      ),
    },
    "how-it-works": {
      title: "How GhostID Works",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            GhostID uses zero-knowledge proofs to verify wallet ownership without exposing the actual wallet address.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-3">The Authentication Flow</h3>
              <div className="space-y-4">
                <Card className="p-4 border-l-4 border-l-primary">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">User Connects Wallet</h4>
                      <p className="text-sm text-muted-foreground">
                        User connects their Web3 wallet through standard wallet providers (MetaMask, WalletConnect, etc.)
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-l-4 border-l-primary">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Generate ZK Proof</h4>
                      <p className="text-sm text-muted-foreground">
                        GhostID generates a zero-knowledge proof of wallet ownership without revealing the address
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-l-4 border-l-primary">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Create Anonymous Token</h4>
                      <p className="text-sm text-muted-foreground">
                        A one-time use authentication token is created and linked to the ZK proof
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-l-4 border-l-primary">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Verify & Authenticate</h4>
                      <p className="text-sm text-muted-foreground">
                        Applications verify the token and authenticate users without ever seeing their wallet address
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    privacy: {
      title: "Privacy & Security",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            GhostID is built with privacy and security as core principles. Learn about our approach to protecting user data.
          </p>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Privacy Guarantees</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">No Address Exposure</p>
                  <p className="text-sm text-muted-foreground">Your wallet address is never transmitted or stored</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">No Session Linking</p>
                  <p className="text-sm text-muted-foreground">Each session uses unique tokens that cannot be correlated</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Cryptographic Verification</p>
                  <p className="text-sm text-muted-foreground">Zero-knowledge proofs ensure authenticity without disclosure</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-8">Security Features</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">End-to-End Encryption</h4>
              <p className="text-sm text-muted-foreground">
                All communication is encrypted using industry-standard protocols
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Token Expiration</h4>
              <p className="text-sm text-muted-foreground">
                Automatic token expiration prevents unauthorized access
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Audit Logs</h4>
              <p className="text-sm text-muted-foreground">
                Comprehensive logging for security monitoring and compliance
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Regular Security Audits</h4>
              <p className="text-sm text-muted-foreground">
                Third-party audits ensure ongoing security compliance
              </p>
            </Card>
          </div>
        </div>
      ),
    },
    "zk-proofs": {
      title: "Zero-Knowledge Proofs",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Zero-knowledge proofs (ZKPs) are the cryptographic foundation of GhostID's privacy-preserving authentication.
          </p>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">What are Zero-Knowledge Proofs?</h3>
            <p className="text-muted-foreground mb-4">
              A zero-knowledge proof is a cryptographic method where one party (the prover) can prove to another party (the verifier) that a statement is true, without revealing any information beyond the validity of the statement itself.
            </p>
            <p className="text-sm text-muted-foreground">
              In GhostID's case, you can prove you own a wallet without revealing which wallet it is.
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-8">How GhostID Uses ZKPs</h3>
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Wallet Ownership Proof</h4>
              <p className="text-sm text-muted-foreground">
                Prove you control a specific wallet without revealing the address
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Balance Verification</h4>
              <p className="text-sm text-muted-foreground">
                Verify you hold sufficient tokens without disclosing exact amounts
              </p>
            </Card>
            <Card className="p-4">
              <h4 className="font-semibold mb-2">Transaction History</h4>
              <p className="text-sm text-muted-foreground">
                Prove transaction patterns without revealing specific transactions
              </p>
            </Card>
          </div>
        </div>
      ),
    },
    "sdk-setup": {
      title: "SDK Setup",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Configure the GhostID SDK for your project with these setup instructions.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Basic Configuration</h3>
            <Card className="p-4 bg-muted/50 font-mono text-sm">
              <pre>{`import { GhostID } from '@ghostid/sdk';

const config = {
  apiKey: process.env.GHOSTID_API_KEY,
  network: 'mainnet', // or 'testnet'
  rpcUrl: 'https://eth-mainnet.alchemyapi.io/v2/YOUR-KEY',
  chains: ['ethereum', 'polygon', 'arbitrum']
};

const ghostID = new GhostID(config);`}</pre>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Advanced Options</h3>
            <Card className="p-4 bg-muted/50 font-mono text-sm">
              <pre>{`const advancedConfig = {
  ...config,
  sessionDuration: 3600, // 1 hour
  autoRefresh: true,
  enableLogging: true,
  customProofGenerator: myProofGenerator
};`}</pre>
            </Card>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mt-8">
            <h4 className="font-semibold mb-2">Environment Variables</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Store your API keys securely in environment variables:
            </p>
            <Card className="p-4 bg-muted/50 font-mono text-xs">
              GHOSTID_API_KEY=your_api_key_here<br/>
              GHOSTID_NETWORK=mainnet
            </Card>
          </div>
        </div>
      ),
    },
    authentication: {
      title: "Authentication Flow",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Implement secure, anonymous authentication in your application with GhostID.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Client-Side Authentication</h3>
            <Card className="p-4 bg-muted/50 font-mono text-sm">
              <pre>{`// Connect wallet
const provider = await ghostID.connectWallet();

// Create anonymous session
const session = await ghostID.authenticate({
  duration: 3600,
  permissions: ['read', 'write']
});

// Store session token
localStorage.setItem('ghost_token', session.token);`}</pre>
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Server-Side Verification</h3>
            <Card className="p-4 bg-muted/50 font-mono text-sm">
              <pre>{`// Verify token on your backend
const token = req.headers.authorization;

const verification = await ghostID.verifyToken(token);

if (verification.valid) {
  // User is authenticated
  res.json({ authenticated: true });
} else {
  res.status(401).json({ error: 'Invalid token' });
}`}</pre>
            </Card>
          </div>
        </div>
      ),
    },
    "api-reference": {
      title: "API Reference",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Complete API reference for the GhostID SDK.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">GhostID Class</h3>
              <Card className="p-4">
                <h4 className="font-mono text-sm mb-2">constructor(config: GhostIDConfig)</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Initialize a new GhostID instance with configuration options.
                </p>
                <div className="bg-muted/50 p-3 rounded font-mono text-xs">
                  <div>apiKey: string</div>
                  <div>network: 'mainnet' | 'testnet'</div>
                  <div>chains?: string[]</div>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Methods</h3>
              <div className="space-y-4">
                <Card className="p-4">
                  <h4 className="font-mono text-sm mb-2">connectWallet()</h4>
                  <p className="text-sm text-muted-foreground">
                    Prompts user to connect their Web3 wallet. Returns wallet provider.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-mono text-sm mb-2">createSession(options)</h4>
                  <p className="text-sm text-muted-foreground">
                    Creates an anonymous authentication session. Returns session object with token.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-mono text-sm mb-2">verifySession(token)</h4>
                  <p className="text-sm text-muted-foreground">
                    Verifies the validity of a session token. Returns boolean.
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-mono text-sm mb-2">refreshSession(token)</h4>
                  <p className="text-sm text-muted-foreground">
                    Refreshes an existing session, generating a new token.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "custom-sessions": {
      title: "Custom Sessions",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Create custom session configurations for specific use cases.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Session Types</h3>
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="font-semibold mb-2">Standard Session</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Default session type with 1-hour duration
                </p>
                <Card className="p-3 bg-muted/50 font-mono text-xs">
                  duration: 3600, permissions: ['read']
                </Card>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">Extended Session</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Long-lived session for trusted applications
                </p>
                <Card className="p-3 bg-muted/50 font-mono text-xs">
                  duration: 86400, permissions: ['read', 'write']
                </Card>
              </Card>

              <Card className="p-4">
                <h4 className="font-semibold mb-2">Limited Session</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Short-lived session with restricted permissions
                </p>
                <Card className="p-3 bg-muted/50 font-mono text-xs">
                  duration: 900, permissions: ['read']
                </Card>
              </Card>
            </div>
          </div>
        </div>
      ),
    },
    enterprise: {
      title: "Enterprise Features",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Advanced features for enterprise deployments of GhostID.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4">
              <Users className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Team Management</h4>
              <p className="text-sm text-muted-foreground">
                Manage multiple team members with role-based access control
              </p>
            </Card>

            <Card className="p-4">
              <Shield className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Advanced Security</h4>
              <p className="text-sm text-muted-foreground">
                Enhanced security features including IP whitelisting and 2FA
              </p>
            </Card>

            <Card className="p-4">
              <Code className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Custom Integration</h4>
              <p className="text-sm text-muted-foreground">
                Dedicated support for custom integration requirements
              </p>
            </Card>

            <Card className="p-4">
              <Zap className="h-8 w-8 text-primary mb-3" />
              <h4 className="font-semibold mb-2">Priority Support</h4>
              <p className="text-sm text-muted-foreground">
                24/7 dedicated support with guaranteed response times
              </p>
            </Card>
          </div>

          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 mt-8">
            <h4 className="font-semibold mb-2">Contact Enterprise Sales</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Interested in enterprise features? Get in touch with our sales team.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              Contact Sales
            </Button>
          </div>
        </div>
      ),
    },
    "best-practices": {
      title: "Best Practices",
      content: (
        <div className="space-y-6">
          <p className="text-muted-foreground">
            Follow these best practices to get the most out of GhostID.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Security</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Always store API keys in environment variables, never in client-side code
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Implement token refresh logic to maintain session continuity
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Use HTTPS for all communications with GhostID services
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Performance</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Cache session tokens to reduce authentication requests
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Implement proper error handling for network failures
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Use appropriate session durations based on your use case
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">User Experience</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Provide clear feedback during the authentication process
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Handle wallet connection errors gracefully
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">
                    Explain the privacy benefits to users during onboarding
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  };

  const SidebarContent = () => (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-8">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Home className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold text-lg font-montserrat">GhostID</span>
        </Link>
      </div>

      {sections.map((section) => (
        <div key={section.title}>
          <div className="flex items-center gap-2 mb-3">
            <section.icon className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm">{section.title}</h3>
          </div>
          <div className="space-y-1 ml-6 border-l border-border/40 pl-3">
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left text-sm py-1.5 px-2 rounded transition-colors ${
                  selectedSection === item.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <SidebarContent />
              </ScrollArea>
            </div>
          </aside>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Mobile Sidebar */}
          {mobileMenuOpen && (
            <div className="lg:hidden fixed inset-0 z-40 bg-background/95 backdrop-blur-sm">
              <div className="fixed inset-y-0 left-0 w-80 bg-background border-r border-border shadow-xl">
                <ScrollArea className="h-full">
                  <SidebarContent />
                </ScrollArea>
              </div>
              <div 
                className="fixed inset-0 -z-10" 
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
          )}

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            <article className="prose prose-invert max-w-none">
              <h1 className="text-4xl font-bold mb-6">
                {content[selectedSection].title}
              </h1>
              {content[selectedSection].content}
            </article>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Docs;
