# @ghostid/core

Privacy-first Web3 authentication using zero-knowledge proofs. Sign in without being seen.

## Features

- 🔐 **Zero-Knowledge Authentication** - Prove wallet ownership without revealing addresses
- ⚡ **Time-Limited Sessions** - Secure, expiring authentication tokens
- 🎯 **Framework Agnostic** - Works with React, Vue, or vanilla JavaScript
- 🔒 **Privacy-First** - No tracking, no data collection, no compromises
- 🌐 **Multi-Chain Support** - Ethereum, Polygon, Arbitrum, and more

## Installation

```bash
npm install @ghostid/core
```

## Quick Start

### React Hook (Recommended)

```tsx
import { useGhostID } from '@ghostid/core';

function App() {
  const { 
    connect, 
    generateToken, 
    disconnect,
    isConnected, 
    hasToken, 
    tokenId,
    sessionExpired,
    timeRemaining 
  } = useGhostID({
    sessionDuration: 900, // 15 minutes in seconds
  });

  return (
    <div>
      {!isConnected ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : !hasToken ? (
        <button onClick={generateToken}>Generate Anonymous Token</button>
      ) : (
        <div>
          <p>Token ID: {tokenId}</p>
          <p>Time Remaining: {timeRemaining}s</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )}
    </div>
  );
}
```

### React Component

```tsx
import { GhostIDAuth } from '@ghostid/core';

function App() {
  return (
    <GhostIDAuth
      sessionDuration={900}
      onTokenGenerated={(tokenId) => console.log('Token:', tokenId)}
      onSessionExpired={() => console.log('Session expired')}
    />
  );
}
```

### Vanilla JavaScript

```javascript
import { GhostIDClient } from '@ghostid/core';

const client = new GhostIDClient({
  sessionDuration: 900,
});

// Connect wallet
await client.connect();

// Generate token
const token = await client.generateToken();
console.log('Token ID:', token.id);

// Check session status
const isActive = client.isSessionActive();

// Disconnect
await client.disconnect();
```

## Configuration

### Web3Modal Setup

```tsx
import { createWeb3Modal } from '@web3modal/wagmi/react';
import { WagmiProvider } from 'wagmi';
import { GhostIDAuth } from '@ghostid/core';

// Configure Web3Modal (required)
const projectId = 'YOUR_WALLETCONNECT_PROJECT_ID';

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  themeMode: 'dark',
});

function App() {
  return (
    <WagmiProvider config={config}>
      <GhostIDAuth sessionDuration={900} />
    </WagmiProvider>
  );
}
```

## API Reference

### `useGhostID(options)`

React hook for managing GhostID authentication.

**Options:**
- `sessionDuration` (number): Token validity in seconds (default: 3600)
- `autoRefresh` (boolean): Auto-refresh token before expiry (default: false)
- `onTokenGenerated` (function): Callback when token is created
- `onSessionExpired` (function): Callback when session expires

**Returns:**
- `connect()`: Connect user's wallet
- `generateToken()`: Generate ZK proof token
- `disconnect()`: Disconnect and clear session
- `isConnected`: Wallet connection status
- `address`: Connected wallet address
- `hasToken`: Token existence status
- `tokenId`: Current token ID
- `sessionExpired`: Session expiration status
- `timeRemaining`: Seconds until expiration

### `<GhostIDAuth />`

Pre-built authentication component with UI.

**Props:**
- `sessionDuration` (number): Token validity in seconds
- `onTokenGenerated` (tokenId: string) => void: Token generation callback
- `onSessionExpired` () => void: Session expiration callback
- `className` (string): Custom CSS class

### `GhostIDClient`

Vanilla JavaScript client for non-React apps.

**Methods:**
- `connect()`: Connect wallet
- `generateToken()`: Create ZK proof token
- `verifyToken(token)`: Verify token validity
- `isSessionActive()`: Check session status
- `disconnect()`: End session

## Token Format

Generated tokens follow this structure:

```typescript
interface GhostIDToken {
  id: string;              // Unique token identifier
  zkProof: string;         // Zero-knowledge proof
  expiresAt: number;       // Expiration timestamp
  metadata: {
    sessionId: string;     // Session identifier
    timestamp: number;     // Generation time
  };
}
```

## Security Best Practices

1. **Always use HTTPS** - Never transmit tokens over HTTP
2. **Set appropriate session durations** - Balance security and UX
3. **Implement token refresh** - Refresh before expiry for seamless UX
4. **Validate on backend** - Always verify tokens server-side
5. **Monitor for suspicious activity** - Track token generation patterns

## Backend Verification

Example Node.js verification:

```javascript
const { verifyGhostIDToken } = require('@ghostid/core/verify');

app.post('/api/verify', async (req, res) => {
  const { token, proof } = req.body;
  
  const result = await verifyGhostIDToken(token, proof);
  
  if (result.valid) {
    // Grant access
    res.json({ authenticated: true });
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
});
```

## Supported Chains

- Ethereum (Mainnet & Testnets)
- Polygon
- Arbitrum
- Optimism
- Base
- BSC (Binance Smart Chain)

## Examples

See the `/examples` directory for complete implementations:
- `/examples/react-app` - Full React application
- `/examples/nextjs` - Next.js integration
- `/examples/vanilla-js` - Pure JavaScript implementation
- `/examples/backend-verify` - Backend verification server

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md).

## License

MIT © GhostID Team

## Links

- [Website](https://ghostid.network)
- [Documentation](https://ghostid.network/docs)
- [API Reference](https://ghostid.network/api)
- [GitHub](https://github.com/your-org/ghostid-core)
- [Discord Community](https://discord.gg/ghostid)

## Support

- 📧 Email: support@ghostid.network
- 💬 Discord: [Join our community](https://discord.gg/ghostid)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/ghostid-core/issues)
