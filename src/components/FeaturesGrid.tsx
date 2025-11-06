import { motion } from "framer-motion";
import { Eye, Key, Database, Code, Timer } from "lucide-react";

const features = [
  {
    icon: Eye,
    title: "Anonymous Sign-In",
    description: "Your identity stays private, always.",
  },
  {
    icon: Key,
    title: "One-Time ZK Tokens",
    description: "Fresh proof for every session.",
  },
  {
    icon: Database,
    title: "No Metadata Leaks",
    description: "Zero traces, zero tracking.",
  },
  {
    icon: Code,
    title: "Developer SDK",
    description: "Easy integration with any dapp.",
  },
  {
    icon: Timer,
    title: "Stealth Sessions",
    description: "Auto-expire for maximum security.",
  },
];

const FeaturesGrid = () => {
  return (
    <section id="features" className="py-24 bg-card/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Privacy-first authentication powered by zero-knowledge proofs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 h-full">
                <div className="mb-4">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
