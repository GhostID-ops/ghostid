import { useGhostID } from '../hooks/useGhostID';
import { GhostIDAuthProps } from '../types';

export function GhostIDAuth({
  sessionDuration = 900,
  onTokenGenerated,
  onSessionExpired,
  className = '',
}: GhostIDAuthProps) {
  const {
    connect,
    disconnect,
    generateToken,
    isConnected,
    address,
    hasToken,
    tokenId,
    sessionExpired,
    timeRemaining,
    activities,
  } = useGhostID({
    sessionDuration,
    onTokenGenerated,
    onSessionExpired,
  });

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`ghostid-auth-container ${className}`}>
      {!isConnected ? (
        <div className="ghostid-connect">
          <h3>Connect Your Wallet</h3>
          <p>Sign in anonymously using zero-knowledge proofs</p>
          <button onClick={connect} className="ghostid-button primary">
            Connect Wallet
          </button>
        </div>
      ) : !hasToken ? (
        <div className="ghostid-generate">
          <h3>Generate Anonymous Token</h3>
          <p>Connected: {formatAddress(address!)}</p>
          <button onClick={generateToken} className="ghostid-button primary">
            Generate Token
          </button>
          <button onClick={disconnect} className="ghostid-button secondary">
            Disconnect
          </button>
        </div>
      ) : sessionExpired ? (
        <div className="ghostid-expired">
          <h3>Session Expired</h3>
          <p>Your authentication token has expired</p>
          <button onClick={() => generateToken()} className="ghostid-button primary">
            Generate New Token
          </button>
        </div>
      ) : (
        <div className="ghostid-active">
          <h3>Active Session</h3>
          <div className="ghostid-session-info">
            <p><strong>Token ID:</strong> {tokenId.slice(0, 16)}...</p>
            <p><strong>Time Remaining:</strong> {formatTime(timeRemaining)}</p>
            <p><strong>Status:</strong> <span className="status-active">Active</span></p>
          </div>
          <div className="ghostid-actions">
            <button onClick={() => generateToken()} className="ghostid-button secondary">
              Regenerate
            </button>
            <button onClick={disconnect} className="ghostid-button danger">
              Disconnect
            </button>
          </div>
          {activities.length > 0 && (
            <div className="ghostid-activities">
              <h4>Recent Activity</h4>
              <ul>
                {activities.slice(0, 5).map(activity => (
                  <li key={activity.id} className={`activity-${activity.status}`}>
                    <span className="activity-action">{activity.action}</span>
                    <span className="activity-time">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
