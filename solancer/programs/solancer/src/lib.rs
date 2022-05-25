use anchor_lang::prelude::*;
pub mod schemas;
pub use schemas::*;

pub mod instructions;
pub use instructions::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");


#[program]
pub mod solancer {
    use anchor_lang::solana_program::log::sol_log_compute_units;

    use super::*;

    /// Create user
    /// @param name:        user name
    /// @param profile_url: user profile url
    pub fn create_user(
        ctx: Context<CreateUser>,
        name: String,
        profile_url: String,
        role: String
    ) -> anchor_lang::Result<()> {
        if name.trim().is_empty() || profile_url.trim().is_empty() {
            return Err(error!(Errors::CannotCreateUser));
        }
        let user = &mut ctx.accounts.user;
        user.wallet_address = ctx.accounts.authority.key();
        user.name = name;
        user.profile_image_url = profile_url;
        user.role = role;

        msg!("User Added!"); //logging
        sol_log_compute_units(); //Logs how many compute units are left, important for budget
        Ok(())
    }
}


#[error_code]
pub enum Errors {
    #[msg("User cannot be created, missing data")]
    CannotCreateUser,

}