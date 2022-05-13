import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { DeSol } from "../target/types/de_sol";

describe("de-sol", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.DeSol as Program<DeSol>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
