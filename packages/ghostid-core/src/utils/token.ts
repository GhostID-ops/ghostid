export function generateTokenId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = 'ghost_';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function calculateTimeRemaining(expiresAt: number): number {
  const remaining = Math.floor((expiresAt - Date.now()) / 1000);
  return Math.max(0, remaining);
}

export function isTokenExpired(expiresAt: number): boolean {
  return Date.now() >= expiresAt;
}

export function formatTokenId(tokenId: string, length: number = 8): string {
  return `${tokenId.slice(0, length)}...`;
}

export function formatTimeRemaining(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
