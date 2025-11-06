import { motion } from "framer-motion";
import { Shield, Wifi, Lock, Zap } from "lucide-react";

interface SystemStatusProps {
  isConnected: boolean;
}

const SystemStatus = ({ isConnected }: SystemStatusProps) => {
  const statusItems = [
    { icon: Wifi, label: "Network", value: "Ethereum", active: isConnected },
    { icon: Shield, label: "ZK Protocol", value: "Active", active: isConnected },
    { icon: Lock, label: "Encryption", value: "AES-256", active: isConnected },
    { icon: Zap, label: "Session", value: "Live", active: isConnected },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border/50 rounded-lg p-4 mb-6"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-muted'}`} />
          System Status
        </h3>
        <span className={`text-xs font-mono ${isConnected ? 'status-active' : 'text-muted-foreground'}`}>
          {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statusItems.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-background/50 rounded-lg p-3 border border-border/30"
          >
            <item.icon className={`h-4 w-4 mb-2 ${item.active ? 'text-primary' : 'text-muted-foreground'}`} />
            <div className="text-xs text-muted-foreground mb-1">{item.label}</div>
            <div className={`text-xs font-mono font-semibold ${item.active ? 'text-foreground' : 'text-muted-foreground'}`}>
              {item.value}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SystemStatus;
