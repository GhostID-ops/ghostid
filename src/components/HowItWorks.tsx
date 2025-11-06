import { motion } from "framer-motion";
import { Wallet, Shield, Clock } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet (Privately)",
    description: "No data stored, only ZK token generated.",
  },
  {
    icon: Shield,
    title: "Authenticate",
    description: "Apps verify proof, not your wallet.",
  },
  {
    icon: Clock,
    title: "Expire",
    description: "Token self-destructs after use.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-glow opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to anonymous authentication
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                <div className="mb-6">
                  <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary">
                    <step.icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-3xl font-bold text-primary/40">0{index + 1}</span>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-secondary" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
