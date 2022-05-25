import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';
import { SystemProgram } from '@solana/web3.js';

import { Solancer } from '../target/types/solancer';

describe('solancer', async () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const provider = anchor.AnchorProvider.env();
  const program = anchor.workspace.Solancer as Program<Solancer>;

  let [userPda] = await anchor.web3.PublicKey.findProgramAddress(
    [utf8.encode('developer'), provider.wallet.publicKey.toBuffer()],
    program.programId
  );

  anchor.setProvider(provider);

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.methods
      .createDeveloper('DEVIN', 'Google', 'MasterChef', 'Google')
      .accounts({
        developer: userPda,
        authority: provider.wallet.publicKey,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();
    console.log('Your transaction signature', tx);
  });
});
