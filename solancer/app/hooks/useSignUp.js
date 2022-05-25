import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/utils";
import defaultAccounts from "./defaultAccounts";
const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;

const useSignUp = () => {
  const wallet = useWallet();
  const connection = new anchor.web3.Connection(SOLANA_HOST);
  const program = getProgramInstance(connection, wallet);

  let signup = async (name, profile, role, cv_url) => {
    let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode(role), wallet.publicKey.toBuffer()],
      program.programId
    );

    if (role === "developer") {
      await program.rpc.createDeveloper(name, profile, role, cv_url, {
        accounts: {
          developer: user_pda,
          authority: wallet.publicKey,
          ...defaultAccounts,
        },
      });
    } else if (role === "company") {
      console.log("role", role);
      await program.rpc.createCompany(name, profile, role, {
        accounts: {
          company: user_pda,
          authority: wallet.publicKey,
          ...defaultAccounts,
        },
      });
    }
  };

  return { signup };
};

export default useSignUp;
