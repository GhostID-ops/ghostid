import { motion } from "framer-motion";
import { Package, Bug, Zap, Shield, Star } from "lucide-react";

const Changelog = () => {
  const releases = [
    {
      version: "2.1.0",
      date: "2025-11-06",
      type: "minor",
      changes: [
        { icon: Star, type: "feature", text: "Added support for multi-chain authentication" },
        { icon: Zap, type: "improvement", text: "50% faster proof generation with optimized circuits" },
        { icon: Shield, type: "security", text: "Enhanced session encryption with AES-256" },
      ],
    },
    {
      version: "2.0.3",
      date: "2025-10-28",
      type: "patch",
      changes: [
        { icon: Bug, type: "fix", text: "Fixed token refresh race condition" },
        { icon: Bug, type: "fix", text: "Resolved memory leak in session manager" },
        { icon: Zap, type: "improvement", text: "Improved error messages for failed verifications" },
      ],
    },
    {
      version: "2.0.0",
      date: "2025-10-15",
      type: "major",
      changes: [
        { icon: Star, type: "feature", text: "Complete rewrite with TypeScript 5.0" },
        { icon: Star, type: "feature", text: "New React hooks for easier integration" },
        { icon: Shield, type: "security", text: "Upgraded to latest ZK-SNARK circuits" },
        { icon: Zap, type: "improvement", text: "Reduced bundle size by 40%" },
        { icon: Bug, type: "fix", text: "Fixed compatibility issues with Next.js 14" },
      ],
    },
    {
      version: "1.5.2",
      date: "2025-09-20",
      type: "patch",
      changes: [
        { icon: Bug, type: "fix", text: "Fixed wallet connection timeout on slow networks" },
        { icon: Zap, type: "improvement", text: "Added retry logic for failed proof submissions" },
      ],
    },
    {
      version: "1.5.0",
      date: "2025-09-01",
      type: "minor",
      changes: [
        { icon: Star, type: "feature", text: "Added session event listeners" },
        { icon: Star, type: "feature", text: "Support for custom token metadata" },
        { icon: Zap, type: "improvement", text: "Improved documentation and examples" },
      ],
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "major":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      case "minor":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "patch":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "feature":
        return "text-blue-400";
      case "fix":
        return "text-red-400";
      case "improvement":
        return "text-green-400";
      case "security":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-8">
      {releases.map((release, index) => (
        <motion.div
          key={release.version}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card border border-border/50 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="inline-flex p-2 rounded-lg bg-primary/10">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold">v{release.version}</h3>
                <span
                  className={`text-xs px-2 py-1 rounded border ${getTypeColor(
                    release.type
                  )}`}
                >
                  {release.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{release.date}</p>
            </div>
          </div>

          <div className="space-y-2">
            {release.changes.map((change, changeIndex) => {
              const IconComponent = change.icon;
              return (
                <div
                  key={changeIndex}
                  className="flex items-start gap-3 text-sm"
                >
                  <IconComponent
                    className={`h-4 w-4 mt-0.5 ${getChangeColor(change.type)}`}
                  />
                  <span className="text-muted-foreground">{change.text}</span>
                </div>
              );
            })}
          </div>

          {index === 0 && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <span className="text-xs text-primary font-semibold">Latest Release</span>
            </div>
          )}
        </motion.div>
      ))}

      <div className="text-center">
        <a
          href="#"
          className="text-sm text-primary hover:underline"
        >
          View all releases on GitHub →
        </a>
      </div>
    </div>
  );
};

export default Changelog;
