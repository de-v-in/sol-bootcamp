use anchor_lang::prelude::*;
pub mod schemas;
pub use schemas::*;

pub mod instructions;
pub use instructions::*;

declare_id!("FWPedSThzPVNU7QUjgVnJSDJFpd6P64KExFKxXUT5DtC");

#[program]
pub mod solancer {
    use anchor_lang::solana_program::log::sol_log_compute_units;

    use super::*;

    /// Create developer
    /// @param name: String
    /// @param profile_image_url: String
    /// @param cv_url: String
    /// @param role: String
    /// @param point: u64
    pub fn create_developer(
        ctx: Context<CreateDeveloper>,
        name: String,
        profile_image_url: String,
        role: String,
        cv_url: String,
    ) -> anchor_lang::Result<()> {
        if name.trim().is_empty()
            || profile_image_url.trim().is_empty()
            || cv_url.trim().is_empty()
            || role.trim().is_empty()
        {
            return Err(error!(Errors::CannotCreateUser));
        }
        let developer = &mut ctx.accounts.developer;
        developer.wallet_address = ctx.accounts.authority.key();
        developer.name = name;
        developer.profile_image_url = profile_image_url;
        developer.cv_url = cv_url;
        developer.role = role;
        developer.point = 0;

        msg!("User Added!"); //logging
        sol_log_compute_units(); //Logs how many compute units are left, important for budget
        Ok(())
    }

    /// Create company
    /// @param name: String
    /// @param profile_image_url: String
    /// @param role: String
    /// @param point: u64
    pub fn create_company(
        ctx: Context<CreateCompany>,
        name: String,
        profile_image_url: String,
        role: String,
    ) -> anchor_lang::Result<()> {
        if name.trim().is_empty() || profile_image_url.trim().is_empty() || role.trim().is_empty() {
            return Err(error!(Errors::CannotCreateUser));
        }
        let company = &mut ctx.accounts.company;
        company.wallet_address = ctx.accounts.authority.key();
        company.name = name;
        company.profile_image_url = profile_image_url;
        company.role = role;
        company.point = 0;

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
