# DeVin Solana Project
## Prequesites

- Install Rust: https://www.rust-lang.org/tools/install
- Install Solana: https://docs.solana.com/cli/install-solana-cli-tools
- Install Anchor: https://project-serum.github.io/anchor/getting-started/installation.html#install-anchor
- Install NodeJs: https://nodejs.org/en/
- Install `npm, yarn, pnpm`
- Start project: `anchor init de-sol`
## Project structure
   The `.anchor` folder: It includes the most recent **program logs** and a **local ledger** that is used for testing
-   The `app` folder: An empty folder that you can use to hold **your frontend** if you use a monorepo
-   The `programs` folder: Contains **your programs**. It can contain multiple but initially only contains a program with **the same name** as `<new-workspace-name>`. This program already contains a `lib.rs` file with some sample code.
-   The `tests` folder: Contains **your E2E tests**. It will already include a file that tests the sample code in the `programs/<new-workspace-name>`.
-   The `migrations` folder: You can save **your deploy and migration scripts** for your programs.
-   The `Anchor.toml` file: Configures **workspace wide settings** for your programs. Initially, it configures
    -   The **addresses of your programs** on **localnet** (`[programs.localnet]`)
    -   A **registry your program** can be pushed to (`[registry]`)
    -   A **provider** which can be used in your tests (`[provider]`)
    -   **Executed scripts** of Anchor (`[scripts]`). The `test` script is run when running `anchor test`. Run your own scripts with `anchor run <script_name>`.

