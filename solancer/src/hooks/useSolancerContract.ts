import { web3 } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';

import { useWorkspace } from './useWorkspace';

const DefaultAccount = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: web3.SystemProgram.programId,
};

export const useSolancerContract = () => {
  const { program, wallet, userPda } = useWorkspace();

  /**
   * Signup new account
   */
  const signup = async (name: string, profile: string, role: string, cv_url: string) => {
    if (wallet && userPda) {
      if (role === 'developer') {
        await program?.methods
          .createDeveloper(name, profile, role, cv_url)
          .accounts({
            developer: userPda,
            authority: wallet.publicKey,
            ...DefaultAccount,
          })
          .rpc();
      } else if (role === 'company') {
        console.log('role', role);
        await program?.methods
          .createCompany(name, profile, role)
          .accounts({
            company: userPda,
            authority: wallet.publicKey,
            ...DefaultAccount,
          })
          .rpc();
      }
    }
  };

  return {
    signup,
  };
};
