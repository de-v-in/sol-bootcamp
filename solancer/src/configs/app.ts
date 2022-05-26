import { clusterApiUrl, PublicKey } from '@solana/web3.js';

import IDL from './contract.json';

const AppConfig = {
  Web3: {
    provider: 'http://127.0.0.1:8899',
  },
};

export const CLUSTER =
  process.env.REACT_APP_CLUSTER === 'mainnet'
    ? 'mainnet'
    : process.env.REACT_APP_CLUSTER === 'testnet'
    ? 'testnet'
    : process.env.REACT_APP_CLUSTER === 'devnet'
    ? 'devnet'
    : 'localnet';

export const SOLANA_HOST = process.env.REACT_APP_SOLANA_API_URL
  ? process.env.REACT_APP_SOLANA_API_URL
  : CLUSTER === 'mainnet'
  ? clusterApiUrl('mainnet-beta')
  : CLUSTER === 'testnet'
  ? clusterApiUrl('testnet')
  : CLUSTER === 'devnet'
  ? clusterApiUrl('devnet')
  : 'http://localhost:8899';

export const SOLANCER_PROGRAM_ID = new PublicKey(
  CLUSTER === 'localnet'
    ? IDL.metadata.address
    : CLUSTER === 'testnet'
    ? IDL.metadata.address
    : CLUSTER === 'devnet'
    ? IDL.metadata.address
    : ''
);

export { AppConfig };

export const SEEDS = ['developer', 'company'];
