import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DeveloperSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Success! You'll receive your API key within the next 60 minutes.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <section id="sdk" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-glow opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card border border-border/50 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                  <Code2 className="h-8 w-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Build with GhostID
                </h2>
                <p className="text-muted-foreground mb-6">
                  Integrate privacy-first authentication into your dapp with our developer SDK.
                  Simple setup, powerful privacy.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border-border/50"
                    required
                  />
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {isSubmitting ? "Submitting..." : "Request API Key"}
                  </Button>
                </form>
              </div>
              
              <div className="flex-1 bg-background/50 border border-border/50 rounded-xl p-6 font-mono text-sm space-y-4">
                <div>
                  <div className="text-muted-foreground mb-2">// Install SDK</div>
                  <code className="text-primary">npm install @ghostid/sdk</code>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-2">// Initialize</div>
                  <code className="text-secondary block">
                    {'import { GhostID } from "@ghostid/sdk";'}
                    <br />
                    <br />
                    {'const ghost = new GhostID({'}
                    <br />
                    {'  apiKey: "your-api-key",'}
                    <br />
                    {'  network: "mainnet"'}
                    <br />
                    {'});'}
                  </code>
                </div>

                <div>
                  <div className="text-muted-foreground mb-2">// Generate ZK Token</div>
                  <code className="text-primary block">
                    {'const token = await ghost.generateToken({'}
                    <br />
                    {'  wallet: userAddress,'}
                    <br />
                    {'  expiry: 900 // 15 minutes'}
                    <br />
                    {'});'}
                  </code>
                </div>

                <div>
                  <div className="text-muted-foreground mb-2">// Verify Authentication</div>
                  <code className="text-secondary block">
                    {'const isValid = await ghost.verify(token);'}
                    <br />
                    {'console.log("Anonymous user:", isValid);'}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperSection;
