import { Signup } from '@components/SignUp';
import { useSolancerContract } from '@hooks/useSolancerContract';
import { useWorkspace } from '@hooks/useWorkspace';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';

const DefaultPage: IPageComponent = () => {
  const [isAccount, setAccount] = useState(false);

  const wallet = useWallet();

  const { program, userPda } = useWorkspace();
  const { signup } = useSolancerContract();

  useEffect(() => {
    if (wallet.connected) {
      checkAccount();
    }
  }, [wallet.connected]);

  const checkAccount = async () => {
    if (!userPda || !program) return;

    program.account.developerAccount
      .fetch(userPda)
      .then((account) => {
        console.log('developer', account);
        setAccount(true);
      })
      .catch(async (err) => {
        console.log('Check account developer', err);
        try {
          const company = await program.account.companyAccount.fetch(userPda);
          console.log('company', company);
          setAccount(true);
        } catch (error) {
          console.log('Check account failed', error);
          setAccount(false);
        }
      });
  };

  return (
    <>
      {isAccount ? (
        <div>
          <h1>Welcome to our App</h1>
        </div>
      ) : (
        <Signup />
      )}
    </>
  );
};

DefaultPage.getLayout = (children) => children;

export default DefaultPage;
