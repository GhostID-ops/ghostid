import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Code2 } from "lucide-react";

const DeveloperSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
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
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Enter your email"
                    className="bg-background border-border/50"
                  />
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    Request API Key
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 bg-background/50 border border-border/50 rounded-xl p-6 font-mono text-sm">
                <div className="text-muted-foreground mb-2">// Install SDK</div>
                <code className="text-primary">npm install @ghostid/sdk</code>
                
                <div className="text-muted-foreground mt-4 mb-2">// Initialize</div>
                <code className="text-secondary">
                  {'import { GhostID } from "@ghostid/sdk";'}
                  <br />
                  <br />
                  {'const ghost = new GhostID({'}
                  <br />
                  {'  apiKey: "your-api-key"'}
                  <br />
                  {'});'}
                </code>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DeveloperSection;
