import { useWorkspace } from '@hooks/useWorkspace';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { userModeAtom } from '@states/user';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';

export const Connect: IComponent = ({}) => {
  const { wallet } = useWorkspace();

  const HackBtn = WalletMultiButton as any;
  const [userMode, setUserMode] = useRecoilState(userModeAtom);
  const [hoverFreelance, setFreelanceHover] = useState(false);
  const [hoverOraganization, setOraganizationHover] = useState(false);

  const renderConnectBtn = useMemo(() => {
    if (wallet?.publicKey) return null;
    return (
      <>
        <HackBtn className="border-transparent px-0 shadow-md shadow-zinc-100 rounded-lg hover:scale-105 active:scale-90 duration-300">
          <span className="flex flex-row items-center justify-center px-4 py-1 border border-zinc-400 rounded-lg">
            <span style={{ letterSpacing: '6px' }} className="font-thin text-black pr-2">
              CONNECT WALLET
            </span>
            <div className="relative w-8 h-8">
              <Image alt="wallet" src="/images/wallet.png" layout="fill" />
            </div>
          </span>
        </HackBtn>
        <span className="mt-4 text-xs font-bold z-10 black">WHY NEED WALLET ?</span>
      </>
    );
  }, [wallet]);

  const renderUserMode = useMemo(() => {
    if (!wallet?.publicKey || userMode !== 'Unknown') return null;
    return (
      <div className="flex flex-row">
        <div
          onMouseEnter={() => setFreelanceHover(true)}
          onMouseLeave={() => setFreelanceHover(false)}
          className="p-4 relative h-48 w-48 bg-yellow-300 rounded-lg shadow shadow-yellow-300 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-90"
          style={{ filter: !hoverOraganization ? 'grayscale(0%)' : 'grayscale(100%)' }}>
          <span className="text-xl font-bold">FREELANCER</span>
          <div className="w-12 h-12 absolute bottom-4 right-4">
            <Image src="/images/freelancer.png" layout="fill" />
          </div>
        </div>
        <div className="w-48" />
        <div
          onMouseEnter={() => setOraganizationHover(true)}
          onMouseLeave={() => setOraganizationHover(false)}
          className="p-4 h-48 w-48 bg-blue-400 rounded-lg shadow shadow-blue-400 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-90"
          style={{ filter: !hoverFreelance ? 'grayscale(0%)' : 'grayscale(100%)' }}>
          <span className="text-xl font-bold">ORGANIZATION</span>
          <div className="w-12 h-12 absolute bottom-4 right-4">
            <Image src="/images/organization.png" layout="fill" />
          </div>
        </div>
      </div>
    );
  }, [wallet, userMode, hoverFreelance, hoverOraganization]);

  return (
    <div className="relative hacked-btn h-screen w-full bg-white text-zinc-700 flex justify-center items-center flex-col">
      <div className="h-12 w-36 absolute top-8 left-8">
        <Image alt="logo" src="/images/devin.png" layout="fill" objectFit="contain" />
      </div>
      <div className="h-96 w-full absolute left-0 bottom-0">
        <Image
          alt="city"
          src="/images/city.png"
          layout="fill"
          objectFit="cover"
          objectPosition="top"
          className="transition-all durtion-300"
          style={{ filter: hoverFreelance ? 'grayscale(0%)' : 'grayscale(100%)' }}
        />
      </div>
      <div className="absolute w-full top-12 flex flex-row justify-center items-center">
        <div className="relative h-80 w-80">
          <Image
            alt="city"
            src="/images/cloud.png"
            layout="fill"
            objectFit="contain"
            className="transition-all durtion-300"
            style={{ filter: hoverOraganization ? 'grayscale(0%)' : 'grayscale(100%)' }}
          />
        </div>
        <div className="w-56" />
        <div className="relative h-64 w-64">
          <Image
            alt="city"
            src="/images/cloud.png"
            layout="fill"
            objectFit="contain"
            className="transition-all duration-300"
            style={{ filter: hoverOraganization ? 'grayscale(0%)' : 'grayscale(100%)' }}
          />
        </div>
      </div>
      <div className="z-10 flex items-center justify-center flex-col">
        {renderConnectBtn} {renderUserMode}
      </div>
    </div>
  );
};
