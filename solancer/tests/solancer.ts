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
const companyPubkey = provider.wallet.publicKey;
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
        [utf8.encode(seed), companyPubkey.toBuffer()],
        programId
      );
      let programMethodObj: any = program.methods;
      let method: any = programMethodObj[tc.method];
      try {
        await method(...args)
          .accounts({
            [seed]: pda,
            authority: companyPubkey,
            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: SystemProgram.programId,
            tokenProgram: TOKEN_PROGRAM_ID,
            associatedTokenProgram: anchor.utils.token.ASSOCIATED_PROGRAM_ID,
          })
          .rpc();
      } catch (error) {
        console.log(error);
      }
    });
  });

  it('Create JD', async () => {
    const jd1 = anchor.web3.Keypair.generate();
    await program.methods
      .createJd('title1', 'jd_content_url1', new anchor.BN(10))
      .accounts({
        jd: jd1.publicKey,
        authority: companyPubkey,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([jd1])
      .rpc();

    const jd2 = anchor.web3.Keypair.generate();
    await program.methods
      .createJd('title2', 'jd_content_url2', new anchor.BN(10))
      .accounts({
        jd: jd2.publicKey,
        authority: companyPubkey,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
      })
      .signers([jd2])
      .rpc();

    try {
      const accounts = await program.account.jdAccount.all();
      assert(accounts.length === 2, 'Expect to have 2 JD accounts');
      console.log(accounts);
    } catch (e) {
      console.log(e);
    }
  });

  it('Add submission & approvement to JD', async () => {
    try {
      const accounts = await program.account.jdAccount.all();
      const dev = anchor.web3.Keypair.generate();
      assert(accounts.length === 2, 'Expect to have 2 JD accounts');
      let ac1 = accounts.find((ac) => ac.account.title === 'title1');

      if (ac1) {
        await program.methods
          .addSubmission(dev.publicKey, 'add me')
          .accounts({
            jd: ac1.publicKey,
            authority: companyPubkey,
          })
          .rpc();

        await program.methods
          .addApprovement(dev.publicKey)
          .accounts({
            jd: ac1.publicKey,
            authority: companyPubkey,
          })
          .rpc();
      }
      const afterAccounts = await program.account.jdAccount.all();
      let aac1 = afterAccounts.find((ac) => ac.account.title === 'title1');
      console.log(aac1?.account.pendingList);
      console.log(aac1?.account.approvedList);
    } catch (e) {
      console.log(e);
    }
  });

  it('Create interview', async () => {
    const interviewKeyPair = anchor.web3.Keypair.generate();
    await program.methods
      .createInterview('jd_title', 'test_url')
      .accounts({
        interview: interviewKeyPair.publicKey,
        authority: companyPubkey,
        clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
        systemProgram: SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .signers([interviewKeyPair])
      .rpc();

    const interview = await program.account.interviewAccount.fetch(interviewKeyPair.publicKey);
    assert(interview.jdTitle.toString() === 'jd_title', 'Expect to have title');
  });

  it('Add interview submission', async () => {
    const interview = await (
      await program.account.interviewAccount.all()
    ).find((itv) => itv.account.jdTitle === 'jd_title');
    const dev = anchor.web3.Keypair.generate();
    await program.methods
      .addInterviewSubmission(dev.publicKey, 'test_submit_url')
      .accounts({
        interview: interview?.publicKey,
      })
      .rpc();
    if (interview) {
      const afterAdd = await program.account.interviewAccount.fetch(interview?.publicKey);
      assert(
        afterAdd.testSubmitUrl.toString() === 'test_submit_url',
        'Expect to have testSubmitUrl'
      );
    }
  });

  it('Update interview result', async () => {
    const interview = await (
      await program.account.interviewAccount.all()
    ).find((itv) => itv.account.jdTitle === 'jd_title');
    await program.methods
      .updateInterviewResult('result')
      .accounts({
        interview: interview?.publicKey,
        authority: companyPubkey,
      })
      .rpc();
    if (interview) {
      const afterAdd = await program.account.interviewAccount.fetch(interview?.publicKey);
      assert(afterAdd.result.toString() === 'result', 'Expect to have result');
    }
  });
});
