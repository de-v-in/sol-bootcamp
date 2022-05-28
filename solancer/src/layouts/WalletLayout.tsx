import { Connect } from '@components/Connect';
import { useListenChainState } from '@hooks/useListenChainState';
import { useWorkspace } from '@hooks/useWorkspace';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useEffect, useState } from 'react';

const WalletLayout: IComponent = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const { wallet, program, provider } = useWorkspace();

  useListenChainState(program);

  useEffect(() => {
    if (wallet?.publicKey) {
      setConnected(true);
    } else {
      setConnected(false);
    }
  }, [program, wallet]);

  // if (connected) {
  //   return <div className="h-screen relative">{children}</div>;
  // }

  return <Connect />;
};

export { WalletLayout };
