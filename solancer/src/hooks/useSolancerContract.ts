import { cLog } from '@pages/_app';
import { web3 } from '@project-serum/anchor';
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';

import { useWorkspace } from './useWorkspace';

const DefaultAccount = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: web3.SystemProgram.programId,
};

export const useSolancerContract = () => {
  const { program, wallet, pdaMap } = useWorkspace();

  /**
   * Signup new account
   */
  const signup = async (name: string, profile: string, role: string, cv_url: string) => {
    if (wallet && pdaMap) {
      let tx: undefined | string = '';
      try {
        if (role === 'developer') {
          tx = await program?.methods
            .createDeveloper(name, profile, role, cv_url)
            .accounts({
              developer: pdaMap[role],
              authority: wallet.publicKey,
              ...DefaultAccount,
            })
            .rpc();
        } else if (role === 'company') {
          tx = await program?.methods
            .createCompany(name, profile, role)
            .accounts({
              company: pdaMap[role],
              authority: wallet.publicKey,
              ...DefaultAccount,
            })
            .rpc();
        }
        cLog.i('signup', 'Create user success', { tx, role });
        return true;
      } catch (e) {
        cLog.w('signup', 'Create user failed', { e, role });
        return false;
      }
    }
  };

  return {
    signup,
  };
};
