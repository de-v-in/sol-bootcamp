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

    pub fn create_jd(
        ctx: Context<CreateJD>,
        title: String,
        jd_content_url: String,
        max_slot: u64,
    ) -> anchor_lang::Result<()> {
        if title.trim().is_empty() || jd_content_url.trim().is_empty() {
            return Err(error!(Errors::CannotCreateJD));
        }

        if max_slot == 0 && max_slot > 50 {
            return Err(error!(Errors::InvalidJDMaxSlot));
        }

        let jd = &mut ctx.accounts.jd;
        jd.company = ctx.accounts.authority.key();
        jd.title = title;
        jd.jd_content_url = jd_content_url;
        jd.max_slot = max_slot;
        jd.is_available = true;

        msg!("JD Added!"); //logging
        sol_log_compute_units(); //Logs how many compute units are left, important for budget
        Ok(())
    }

    pub fn add_submission(
        ctx: Context<AddSubmission>,
        developer: Pubkey,
        msg: String,
    ) -> anchor_lang::Result<()> {
        if developer.to_string().is_empty() {
            return Err(error!(Errors::CannotAddSubmission));
        }
        let jd = &mut ctx.accounts.jd;
        let mut pending_list = jd.pending_list.iter();
        if pending_list.len() >= jd.max_slot as usize {
            return Err(error!(Errors::NoSlotLeft));
        }
        if pending_list.any(|x| x.clone().developer == developer) {
            return Err(error!(Errors::AlreadySubmitted));
        }

        let pending = PendingSubmission { developer, msg };
        jd.pending_list.push(pending);
        Ok(())
    }
}

#[error_code]
pub enum Errors {
    #[msg("User cannot be created, missing data")]
    CannotCreateUser,
    #[msg("JD cannot be created, missing data")]
    CannotCreateJD,
    #[msg("JD cannot be created, max slot is 0 or greater than 50")]
    InvalidJDMaxSlot,
    #[msg("Submission cannot be added, missing data")]
    CannotAddSubmission,
    #[msg("JD has no slot left")]
    NoSlotLeft,
    #[msg("Submission already exists")]
    AlreadySubmitted
}
