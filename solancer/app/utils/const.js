import { clusterApiUrl, PublicKey } from "@solana/web3.js";

export const CLUSTER =
  process.env.REACT_APP_CLUSTER === "mainnet"
    ? "mainnet"
    : process.env.REACT_APP_CLUSTER === "testnet"
      ? "testnet"
      : process.env.REACT_APP_CLUSTER === "devnet"
        ? "devnet"
        : "localnet";

export const SOLANA_HOST = process.env.REACT_APP_SOLANA_API_URL
  ? process.env.REACT_APP_SOLANA_API_URL
  : CLUSTER === "mainnet"
    ? clusterApiUrl("mainnet-beta")
    : CLUSTER === "testnet"
      ? clusterApiUrl("testnet")
      : CLUSTER === "devnet"
        ? clusterApiUrl("devnet")
        : "http://localhost:8899";

export const SOLANCER_PROGRAM_ID = new PublicKey(
  CLUSTER === 'localnet' 
  ? 'FWPedSThzPVNU7QUjgVnJSDJFpd6P64KExFKxXUT5DtC' 
  : CLUSTER === 'testnet' 
  ? 'FWPedSThzPVNU7QUjgVnJSDJFpd6P64KExFKxXUT5DtC'
  : CLUSTER === 'devnet'
        ? 'FWPedSThzPVNU7QUjgVnJSDJFpd6P64KExFKxXUT5DtC'
  : ''
);
