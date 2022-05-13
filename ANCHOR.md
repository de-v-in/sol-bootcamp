A framework for quickly building secure Solana programs.
=

## The `program` module
Business logic - functions which can be called by clients or other programs. 
```rust
#[program] 
mod hello_anchor { 
use super::*; 
pub fn set_data(ctx: Context<SetData>, data: u64) -> Result<()> {
		if ctx.accounts.token_account.amount > 0 { 
			ctx.accounts.my_account.data = data;
		} 
		Ok(()) 
	} 
}
```
- [Context](https://docs.rs/anchor-lang/latest/anchor_lang/context/index.html)
Each endpoint function takes a `ctx: Context` type as its first argument.
Access the accounts (`ctx.accounts`), the program id (`ctx.program_id`) of the executing program, and the remaining accounts (`ctx.remaining_accounts`) via it.

`remaining_accounts` is a vector that contains all accounts that were passed into the instruction but are not declared in the `Accounts` struct.
- Instruction data
By adding arguments to the function **after the context argument**. Anchor will then automatically deserialize the instruction data into the arguments.
```rust
#[derive(AnchorSerialize, AnchorDeserialize, Eq, PartialEq, Clone, Copy, Debug)] pub struct Data { pub data: u64, pub age: u8 }
pub fn set_data(ctx: Context<SetData>, data: Data) -> Result<()> { ... }
```
`#[account]` implements `Anchor(De)Serialize` to simplify the code
```rust
#[account]
#[derive(Default)]
pub struct MyAccount { pub data: u64, pub age: u8 }
pub fn set_data(ctx: Context<SetData>, data: MyAccount) -> Result<()> { ... }
```
## `Accounts`
Structs where you validate accounts. Define which accounts your instruction expects & the constraints these accounts should adhere to via *types & constraints*.

- [Types](https://docs.rs/anchor-lang/latest/anchor_lang/accounts/index.html)
The `Account` type is used when an instruction is interested in the deserialized data of the account. `Account` is generic over `T`. This `T` is a type you can create yourself to store data.

`#[account]` attribute sets the owner of that data to the `ID` (the one we created earlier with `declare_id`) of the crate `#[account]` is used in.

The Account type can then check for you that the `AccountInfo` passed into your instruction has its `owner` field set to the correct program.

[Using `Account<'a, T>` with non-anchor program accounts](https://book.anchor-lang.com/anchor_in_depth/the_accounts_struct.html#using-accounta-t-with-non-anchor-program-accounts)
- [Constraints](https://docs.rs/anchor-lang/latest/anchor_lang/derive.Accounts.html)
```rust
#[account(<constraints>)] pub account: AccountType
```
ex:
```rust
#[account( constraint = my_account.mint == token_account.mint, has_one = owner )] pub token_account: Account<'info, TokenAccount>
```
- [Safety checks](https://book.anchor-lang.com/anchor_in_depth/the_accounts_struct.html#safety-checks)

### The `declare_id` macro
Creates an ID field that stores the address of your program. Anchor uses this hardcoded `ID` for security checks and it also allows other crates to access your program's address.

## Errors
There are two types: *AnchorErrors and non-anchor errors*:
-   AnchorErrors
    -   Anchor Internal Errors
    -   Custom Errors
-   Non-anchor errors.

[Custom Errors](https://book.anchor-lang.com/anchor_in_depth/errors.html#custom-errors)

Ultimately, all programs return the same Error: The [`ProgramError`](https://docs.rs/solana-program/latest/solana_program/program_error/enum.ProgramError.html).

## Workflow
1. Setup:
- State: Create DTO, DAO, Aggregators by using Rust struct, Anchor types (Pubkey, Sign), contraints & macros:
#[account]
#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]

- Instructions:
	- Initialize the `state` using #[derive(Accounts)] 
	- Remember to check [Anchor Space Reference](https://book.anchor-lang.com/anchor_references/space.html)
	- `anchor build` will generate [IDL](https://en.wikipedia.org/wiki/Interface_description_language) in `target/idl` => anchor TypeScript client parse & generate functions based on it.
  
- Tests
  Prerequesites: provider includes wallet, wallet includes keypairs:
  - Generate a Solana keypair using `solana-keygen new`
  - The provider details are defined in the `Anchor.toml` file in the root of the project.
  
   run `anchor test`. This starts up (and subsequently shuts down) a **local validator** (make sure you don't have one running before) and runs your tests using the test script defined in `Anchor.toml`.
   
  How Anchor maps the Rust types to the js/ts types, check out the [Javascript Anchor Types Reference](https://book.anchor-lang.com/anchor_references/javascript_anchor_types_reference.html).