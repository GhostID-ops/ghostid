import { useState, useEffect, useCallback } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { GhostIDConfig, SessionStatus, ActivityEntry, GhostIDToken } from '../types';
import { generateTokenId, calculateTimeRemaining, isTokenExpired } from '../utils/token';
import { mockZKProof } from '../utils/mock';

const SESSION_DURATION = 900; // 15 minutes default

export function useGhostID(config: GhostIDConfig = {}) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect: wagmiDisconnect } = useDisconnect();

  const [hasToken, setHasToken] = useState(false);
  const [tokenId, setTokenId] = useState<string>("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [activities, setActivities] = useState<ActivityEntry[]>([]);

  const sessionDuration = config.sessionDuration || SESSION_DURATION;

  // Add activity logger
  const addActivity = useCallback((action: string, status: 'success' | 'error' | 'pending' = 'success') => {
    const activity: ActivityEntry = {
      id: Date.now().toString(),
      action,
      timestamp: Date.now(),
      status,
    };
    setActivities(prev => [activity, ...prev].slice(0, 10));
    
    // Persist to localStorage
    const stored = JSON.parse(localStorage.getItem('ghostid_activities') || '[]');
    localStorage.setItem('ghostid_activities', JSON.stringify([activity, ...stored].slice(0, 50)));
  }, []);

  // Generate token
  const generateToken = useCallback(async (): Promise<GhostIDToken> => {
    if (!address) {
      throw new Error('Wallet not connected');
    }

    addActivity('Generating ZK proof token...', 'pending');
    
    // Simulate ZK proof generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newTokenId = generateTokenId();
    const newExpiresAt = Date.now() + (sessionDuration * 1000);
    const zkProof = mockZKProof(address);

    setTokenId(newTokenId);
    setHasToken(true);
    setExpiresAt(newExpiresAt);
    setSessionExpired(false);

    const token: GhostIDToken = {
      id: newTokenId,
      zkProof,
      expiresAt: newExpiresAt,
      metadata: {
        sessionId: newTokenId,
        timestamp: Date.now(),
        walletAddress: address,
      },
    };

    // Store token
    localStorage.setItem('ghostid_token', JSON.stringify(token));
    
    addActivity(`Token generated: ${newTokenId.slice(0, 8)}...`, 'success');
    
    if (config.onTokenGenerated) {
      config.onTokenGenerated(newTokenId);
    }

    return token;
  }, [address, sessionDuration, addActivity, config]);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    try {
      addActivity('Connecting wallet...', 'pending');
      const connector = connectors[0];
      if (connector) {
        await connect({ connector });
        addActivity('Wallet connected', 'success');
      }
    } catch (error) {
      addActivity('Failed to connect wallet', 'error');
      throw error;
    }
  }, [connect, connectors, addActivity]);

  // Disconnect
  const disconnect = useCallback(() => {
    wagmiDisconnect();
    setHasToken(false);
    setTokenId("");
    setExpiresAt(null);
    setSessionExpired(false);
    localStorage.removeItem('ghostid_token');
    addActivity('Disconnected', 'success');
  }, [wagmiDisconnect, addActivity]);

  // Check for expired session
  useEffect(() => {
    if (!hasToken || !expiresAt) return;

    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining(expiresAt);
      setTimeRemaining(remaining);

      if (remaining <= 0 && !sessionExpired) {
        setSessionExpired(true);
        addActivity('Session expired', 'error');
        if (config.onSessionExpired) {
          config.onSessionExpired();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasToken, expiresAt, sessionExpired, addActivity, config]);

  // Load persisted session on mount
  useEffect(() => {
    const stored = localStorage.getItem('ghostid_token');
    if (stored) {
      try {
        const token: GhostIDToken = JSON.parse(stored);
        if (!isTokenExpired(token.expiresAt)) {
          setTokenId(token.id);
          setHasToken(true);
          setExpiresAt(token.expiresAt);
          setSessionExpired(false);
        } else {
          localStorage.removeItem('ghostid_token');
        }
      } catch (error) {
        localStorage.removeItem('ghostid_token');
      }
    }

    // Load activities
    const storedActivities = localStorage.getItem('ghostid_activities');
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities).slice(0, 10));
    }
  }, []);

  const sessionStatus: SessionStatus = {
    isActive: hasToken && !sessionExpired,
    hasToken,
    tokenId,
    expiresAt,
    timeRemaining,
  };

  return {
    // Connection
    connect: connectWallet,
    disconnect,
    isConnected,
    address,
    
    // Token management
    generateToken,
    hasToken,
    tokenId,
    
    // Session status
    sessionExpired,
    sessionStatus,
    timeRemaining,
    expiresAt,
    
    // Activity log
    activities,
  };
}
