import { AppConfig, SEEDS } from '@configs/app';
import idl from '@configs/contract.json';
import { AnchorProvider, Program, utils } from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';

import { Solancer } from '../types/contract';

const utf8 = utils.bytes.utf8;

const programID = new PublicKey(idl.metadata.address);

export interface IPdaMap {
  [k: string]: PublicKey;
}

export const useWorkspace = () => {
  const wallet = useAnchorWallet();

  const [connection, setConnection] = useState<Connection>();
  const [provider, setProvider] = useState<AnchorProvider>();
  const [program, setProgram] = useState<Program<Solancer>>();
  const [pdaMap, setPdaMap] = useState<IPdaMap>();

  useEffect(() => {
    if (wallet && wallet.publicKey) {
      const conn = new Connection(AppConfig.Web3.provider, 'processed');
      const prov = new AnchorProvider(conn, wallet!, { preflightCommitment: 'processed' });
      const prog = new Program(idl as any, programID, prov) as Program<Solancer>;

      for (let s of SEEDS) {
        PublicKey.findProgramAddress(
          [utf8.encode(s), prov.wallet.publicKey.toBuffer()],
          prog.programId
        ).then(([pda]) => {
          setPdaMap((prev) => ({ ...prev, [s]: pda }));
        });
      }

      setConnection(conn);
      setProvider(prov);
      setProgram(prog);
    }
  }, [wallet]);

  return {
    wallet,
    connection,
    provider,
    program,
    pdaMap,
  };
};
