import { GhostIDConfig, GhostIDToken, VerificationResult } from '../types';
import { generateTokenId, calculateTimeRemaining, isTokenExpired } from '../utils/token';
import { mockZKProof, mockVerification } from '../utils/mock';

export class GhostIDClient {
  private config: GhostIDConfig;
  private token: GhostIDToken | null = null;
  private walletAddress: string | null = null;

  constructor(config: GhostIDConfig = {}) {
    this.config = {
      sessionDuration: 3600, // 1 hour default
      autoRefresh: false,
      network: 'mainnet',
      ...config,
    };
  }

  async connect(address: string): Promise<void> {
    this.walletAddress = address;
  }

  async generateToken(): Promise<GhostIDToken> {
    if (!this.walletAddress) {
      throw new Error('Wallet not connected. Call connect(address) first.');
    }

    const tokenId = generateTokenId();
    const expiresAt = Date.now() + (this.config.sessionDuration! * 1000);
    const zkProof = mockZKProof(this.walletAddress);

    this.token = {
      id: tokenId,
      zkProof,
      expiresAt,
      metadata: {
        sessionId: tokenId,
        timestamp: Date.now(),
        walletAddress: this.walletAddress,
      },
    };

    if (this.config.onTokenGenerated) {
      this.config.onTokenGenerated(tokenId);
    }

    return this.token;
  }

  async verifyToken(token: string, proof: string): Promise<VerificationResult> {
    return mockVerification(token, proof);
  }

  isSessionActive(): boolean {
    if (!this.token) return false;
    return !isTokenExpired(this.token.expiresAt);
  }

  getToken(): GhostIDToken | null {
    return this.token;
  }

  getTimeRemaining(): number {
    if (!this.token) return 0;
    return calculateTimeRemaining(this.token.expiresAt);
  }

  async disconnect(): Promise<void> {
    this.token = null;
    this.walletAddress = null;
  }

  async refreshToken(): Promise<GhostIDToken> {
    if (!this.walletAddress) {
      throw new Error('Wallet not connected');
    }
    return this.generateToken();
  }
}
