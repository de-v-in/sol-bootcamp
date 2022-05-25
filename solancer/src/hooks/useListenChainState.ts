import { Program } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useRef } from 'react';
import { Solancer } from 'src/types/contract';

const useListenChainState = (program?: Program<Solancer>) => {
  const wallet = useWallet();
  const nameListenerRef = useRef<number | null>();

  useEffect(() => {
    if (program && wallet.publicKey) {
      // EXAMPLE EVENT
      nameListenerRef.current = program.addEventListener(
        'UpdateNameEvent',
        (ev: { owner: PublicKey; name: string }) => {
          if (ev.owner.equals(wallet.publicKey!)) {
            console.log(ev);
          }
        }
      );
    }
    return () => {
      if (program && wallet.publicKey) {
        if (nameListenerRef.current) {
          program.removeEventListener(nameListenerRef.current);
        }
      }
    };
  }, [program, wallet]);
};

export { useListenChainState };
