import { motion } from "framer-motion";
import { Shield, Lock, Zap, Globe } from "lucide-react";

const aboutFeatures = [
  {
    icon: Shield,
    title: "Military-Grade Privacy",
    description: "Built on zero-knowledge cryptography, ensuring your identity remains completely anonymous during authentication.",
  },
  {
    icon: Lock,
    title: "Trustless Authentication",
    description: "No central authority stores your data. Your privacy is guaranteed by mathematics, not promises.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate and verify ZK proofs in milliseconds. Privacy shouldn't slow you down.",
  },
  {
    icon: Globe,
    title: "Cross-Chain Compatible",
    description: "Works seamlessly across all EVM-compatible networks. One identity, infinite possibilities.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 gradient-glow opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About GhostID</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            GhostID is pioneering the future of Web3 authentication by combining zero-knowledge proofs 
            with seamless user experience. We believe privacy is a fundamental right, not a luxury.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {aboutFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 transition-all"
            >
              <div className="inline-flex p-3 rounded-lg bg-primary/10 text-primary mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-card/50 border border-primary/20 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're building a decentralized identity layer that puts users first. Every authentication 
            should be private, secure, and ephemeral. With GhostID, your digital identity is truly yours—
            no traces, no tracking, just pure cryptographic proof that you are who you say you are, 
            without revealing who that is.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
