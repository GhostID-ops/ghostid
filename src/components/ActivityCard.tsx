import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const activities = [
  {
    app: "DeFiHub",
    action: "Signed in with GhostID",
    time: "2 minutes ago",
  },
  {
    app: "GameVerse",
    action: "Leaderboard entry verified",
    time: "15 minutes ago",
  },
  {
    app: "DAO Portal",
    action: "Anonymous vote confirmed",
    time: "1 hour ago",
  },
];

const ActivityCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card border border-border/50 rounded-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
          >
            <div className="p-1 rounded-full bg-primary/10">
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-medium text-sm">{activity.app}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.action}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityCard;
