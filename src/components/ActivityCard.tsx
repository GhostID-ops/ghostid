import { motion } from "framer-motion";
import { CheckCircle2, Activity } from "lucide-react";

interface ActivityEntry {
  app: string;
  action: string;
  time: string;
  timestamp: number;
}

interface ActivityCardProps {
  activities: ActivityEntry[];
}

const ActivityCard = ({ activities }: ActivityCardProps) => {
  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    return `${Math.floor(seconds / 86400)} days ago`;
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-card border border-border/50 rounded-xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Recent Activity</h3>
      </div>
      {activities.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <p>No activity yet. Connect your wallet to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity, index) => (
          <motion.div
            key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border border-border/30 hover:bg-background/80 hover:border-primary/20 transition-colors"
            >
              <div className="p-1 rounded-full bg-primary/10">
                <CheckCircle2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-sm font-mono">{activity.app}</p>
                  <span className="text-xs text-muted-foreground whitespace-nowrap font-mono">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ActivityCard;
