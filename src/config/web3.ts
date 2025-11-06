import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { cookieStorage, createStorage } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

export const projectId = '3e5e4378fadd2a9ee529ba593d57291b';

if (!projectId) throw new Error('Project ID is not defined');

const metadata = {
  name: 'GhostID',
  description: 'Anonymous, Zero-Knowledge Authentication for Web3',
  url: 'https://ghostid.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

const chains = [mainnet, sepolia] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
});
