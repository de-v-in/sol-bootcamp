import React from "react";
import { Signup } from "./SingUp";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/utils";
import useSignUp from "../hooks/useSignUp";
const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;

export default function MainView() {
  const [isAccount, setAccount] = useState(false);

  const wallet = useWallet();
  const connection = new anchor.web3.Connection(SOLANA_HOST);

  const program = getProgramInstance(connection, wallet);
  const { signup } = useSignUp();

  useEffect(() => {
    if (wallet.connected) {
      checkAccount();
    }
  }, [wallet.connected]);

  const checkAccount = async () => {
    let [pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode("developer"), wallet.publicKey.toBuffer()],
      program.programId
    );
    program.account.developerAccount.fetch(pda)
    .then((account) => {
      console.log("developer", account);
      setAccount(true);
    })
    .catch(async (err) => {
      console.log("Check account developer", err);
      let [pda] = await anchor.web3.PublicKey.findProgramAddress(
        [utf8.encode("company"), wallet.publicKey.toBuffer()],
        program.programId
      );
      try {
        const company = await program.account.companyAccount.fetch(pda);
        console.log("company", company);
        setAccount(true);
      } catch (error) {
        console.log("Check account failed", e);
        setAccount(false);
      }
    })
  };

  return (
    <>
      {isAccount ? (
        <div>
          <h1>Welcome to our App</h1>
        </div>
      ) : (
        <Signup signup={signup} wallet={wallet.publicKey.toBase58()} />
      )}
    </>
  );
}
