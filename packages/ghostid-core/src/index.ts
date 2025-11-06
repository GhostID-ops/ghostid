// Main exports
export { GhostIDAuth } from './components/GhostIDAuth';
export { useGhostID } from './hooks/useGhostID';
export { GhostIDClient } from './client/GhostIDClient';

// Types
export type {
  GhostIDToken,
  GhostIDConfig,
  SessionStatus,
  ActivityEntry,
  TokenMetadata,
  VerificationResult,
} from './types';

// Utilities
export { generateTokenId, calculateTimeRemaining, isTokenExpired } from './utils/token';
export { mockZKProof, mockVerification } from './utils/mock';
