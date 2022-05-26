import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';
import { PublicKey, SystemProgram } from '@solana/web3.js';

import { Solancer } from '../target/types/solancer';
// Configure the client to use the local cluster.
const provider = anchor.AnchorProvider.env();
const program = anchor.workspace.Solancer as Program<Solancer>;
const programId = program.programId;
anchor.setProvider(provider);

describe('Solancer testsuite', async () => {
  let createTests = [
    {
      name: 'Create developer',
      seed: 'developer',
      args: ['name', 'profile_url', 'role', 'cv_url'],
      method: 'createDeveloper',
    },
    {
      name: 'Create company',
      seed: 'company',
      args: ['name', 'profile_url', 'role'],
      method: 'createCompany',
    },
    {
      name: 'Create JD',
      seed: 'jd',
      args: ['title', 'jd_content_url', new anchor.BN(10)],
      method: 'createJd',
    },
  ];
  createTests.forEach((tc: any) => {
    const { name, seed, args } = tc;
    it(name, async () => {
      let [pda] = await anchor.web3.PublicKey.findProgramAddress(
        [utf8.encode(seed), provider.wallet.publicKey.toBuffer()],
        programId
      );
      let programMethodObj: any = program.methods;
      let method: any = programMethodObj[tc.method];

      const tx = await method(...args)
        .accounts({
          [seed]: pda,
          authority: provider.wallet.publicKey,
          clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
          systemProgram: SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
      console.log('Your transaction signature', tx);
    });
  });

  it('Add developer submission', async () => {
    // let [jdPda] = await anchor.web3.PublicKey.findProgramAddress(
    //   [utf8.encode("jd"), provider.wallet.publicKey.toBuffer()],
    //   programId
    // );
  });
});
