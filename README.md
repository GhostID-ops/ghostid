# 👻 GhostID — Sign In Without Being Seen

**Anonymous Web3 Authentication Powered by Zero-Knowledge Proofs**

GhostID is a **privacy-focused authentication layer for Web3** that lets users connect to decentralized apps without exposing their wallet addresses.  
Instead of logging in with a public key, users generate **temporary zk-tokens** that prove ownership — not identity.

---

## 🌐 Live Demo
**Website:** [ghostid.network](https://ghostid.network)  
**App:** [ghostid.network/app](https://ghostid.network/app)
**X:** https://x.com/ghostidprotocol


---

## 🧩 Core Concept

| Step | Description |
|------|--------------|
| **1. Connect Wallet (Privately)** | The user connects a wallet through WalletConnect — no wallet data stored. |
| **2. Generate GhostID Token** | A short-lived, mock zero-knowledge token is created and signed. |
| **3. Authenticate Anonymously** | The token can be used by dapps or partners for one-time access. |
| **4. Expire and Vanish** | Tokens self-destruct after 15 minutes, leaving no trace. |

GhostID’s goal is to make privacy **a native feature** of blockchain authentication.

---

## 📁 Project Structure

/ghostid
├── /pages
│ ├── index.tsx → Landing page
│ ├── app.tsx → Functional dashboard
│
├── /components
│ ├── WalletConnectButton.tsx
│ ├── TokenStatusCard.tsx
│ └── CountdownTimer.tsx
│
├── /assets
│ ├── logo.svg
│ └── animations/
│
├── /styles
│ └── globals.css
│
├── /lib
│ └── zkToken.ts → Mock ZK token generator
│
├── package.json
└── README.md


---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/ghostid-ops/ghostid.git
cd ghostid

