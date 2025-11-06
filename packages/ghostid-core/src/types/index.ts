export interface GhostIDToken {
  id: string;
  zkProof: string;
  expiresAt: number;
  metadata: TokenMetadata;
}

export interface TokenMetadata {
  sessionId: string;
  timestamp: number;
  walletAddress?: string;
}

export interface GhostIDConfig {
  sessionDuration?: number; // in seconds
  autoRefresh?: boolean;
  onTokenGenerated?: (tokenId: string) => void;
  onSessionExpired?: () => void;
  network?: 'mainnet' | 'testnet';
}

export interface SessionStatus {
  isActive: boolean;
  hasToken: boolean;
  tokenId: string | null;
  expiresAt: number | null;
  timeRemaining: number;
}

export interface ActivityEntry {
  id: string;
  action: string;
  timestamp: number;
  status: 'success' | 'error' | 'pending';
}

export interface VerificationResult {
  valid: boolean;
  expired: boolean;
  tokenId: string;
  message?: string;
}

export interface GhostIDAuthProps {
  sessionDuration?: number;
  onTokenGenerated?: (tokenId: string) => void;
  onSessionExpired?: () => void;
  className?: string;
}
