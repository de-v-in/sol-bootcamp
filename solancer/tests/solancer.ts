import * as anchor from '@project-serum/anchor';
import { Program } from '@project-serum/anchor';
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes';
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token';
import { SystemProgram } from '@solana/web3.js';
import assert from 'assert';

import { Solancer } from '../target/types/solancer';
// Configure the client to use the local cluster.
const provider = anchor.AnchorProvider.env();
const program = anchor.workspace.Solancer as Program<Solancer>;
const programId = program.programId;
anchor.setProvider(provider);

describe('Solancer testsuite', async () => {
  let createPdaTests = [
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
  ];

  createPdaTests.forEach((tc: any) => {
    const { name, seed, args } = tc;
    it(name, async () => {
      let [pda] = await anchor.web3.PublicKey.findProgramAddress(
        [utf8.encode(seed), provider.wallet.publicKey.toBuffer()],
        programId
      );
      let programMethodObj: any = program.methods;
      let method: any = programMethodObj[tc.method];
      try {
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
      } catch (error) {
        console.log(error);
      }
    });
  });

  it('Create JD', async () => {
    const jd1 = anchor.web3.Keypair.generate();
    const tx1 = await program.methods
      .createJd('title1', 'jd_content_url1', new anchor.BN(10))
      .accounts({
        jd: jd1.publicKey,
        authority: provider.wallet.publicKey,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([jd1])
      .rpc();
    console.log('tx1', tx1);

    const jd2 = anchor.web3.Keypair.generate();
    const tx2 = await program.methods
      .createJd('title2', 'jd_content_url2', new anchor.BN(10))
      .accounts({
        jd: jd2.publicKey,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
      })
      .signers([jd2])
      .rpc();
    console.log('tx2', tx2);

    try {
      const accounts = await program.account.jdAccount.all();
      assert(accounts.length === 2, 'Expect to have 2 JD accounts');
      console.log(accounts);
    } catch (e) {
      console.log(e);
    }
  });

  it('Add submission to JD', async () => {
    try {
      const accounts = await program.account.jdAccount.all();
      assert(accounts.length === 2, 'Expect to have 2 JD accounts');
      let ac1 = accounts.find((ac) => ac.account.title === 'title1');

      if (ac1) {
        const tx = await program.methods
          .addSubmission('add me')
          .accounts({
            jd: ac1.publicKey,
            authority: provider.wallet.publicKey,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
          })
          .rpc();
        console.log('tx', tx);
      }
    } catch (e) {
      console.log(e);
    }
  });

  it('Fetch after add', async () => {
    const afterAccounts = await program.account.jdAccount.all();
    console.log(afterAccounts);
  });
});
