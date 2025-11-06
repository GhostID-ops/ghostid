import { VerificationResult } from '../types';

/**
 * Generate a mock zero-knowledge proof
 * In production, this would be replaced with actual ZK-SNARK generation
 */
export function mockZKProof(walletAddress: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  const proof = Buffer.from(`${walletAddress}:${timestamp}:${random}`).toString('base64');
  return `zkp_${proof}`;
}

/**
 * Verify a mock zero-knowledge proof
 * In production, this would be replaced with actual ZK-SNARK verification
 */
export function mockVerification(token: string, proof: string): VerificationResult {
  // Basic validation
  if (!token || !proof) {
    return {
      valid: false,
      expired: false,
      tokenId: token,
      message: 'Invalid token or proof',
    };
  }

  if (!proof.startsWith('zkp_')) {
    return {
      valid: false,
      expired: false,
      tokenId: token,
      message: 'Invalid proof format',
    };
  }

  // Mock successful verification
  return {
    valid: true,
    expired: false,
    tokenId: token,
    message: 'Token verified successfully',
  };
}

/**
 * Simulate ZK proof generation delay
 */
export async function simulateZKProofGeneration(delayMs: number = 2000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delayMs));
}
