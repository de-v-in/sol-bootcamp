use anchor_lang::prelude::*;
pub mod schemas;
pub use schemas::*;

pub mod instructions;
pub use instructions::*;

declare_id!("FWPedSThzPVNU7QUjgVnJSDJFpd6P64KExFKxXUT5DtC");

#[program]
pub mod solancer {
    use anchor_lang::solana_program::log::sol_log_compute_units;
    use anchor_spl::token;

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
        ctx: Context<UpdateSubmission>,
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

    pub fn add_approvement(
        ctx: Context<UpdateSubmission>,
        developer: Pubkey,
    ) -> anchor_lang::Result<()> {
        let signer = ctx.accounts.authority.key();

        if signer != ctx.accounts.jd.company {
            return Err(error!(Errors::CannotAddApprovement));
        }

        if developer.to_string().is_empty() {
            return Err(error!(Errors::CannotAddApprovement));
        }
        let jd = &mut ctx.accounts.jd;
        let pending_list = jd
            .pending_list
            .iter()
            .filter(|x| x.clone().developer != developer)
            .cloned()
            .collect::<Vec<PendingSubmission>>();
        let mut approved_list = jd.approved_list.iter();
        if approved_list.len() >= jd.max_slot as usize {
            return Err(error!(Errors::NoSlotLeft));
        }
        if approved_list.any(|&x| x == developer) {
            return Err(error!(Errors::AlreadySubmitted));
        }

        jd.approved_list.push(developer);
        jd.pending_list = pending_list;
        Ok(())
    }

    pub fn create_interview(
        ctx: Context<CreateInterview>,
        jd_title: String,
        test_url: String,
    ) -> anchor_lang::Result<()> {
        if jd_title.trim().is_empty() || test_url.trim().is_empty() {
            return Err(error!(Errors::CannotCreateInterview));
        }
        let interview = &mut ctx.accounts.interview;
        interview.authority = ctx.accounts.authority.key();
        interview.jd_title = jd_title;
        interview.test_url = test_url;
        Ok(())
    }

    pub fn add_interview_submission(
        ctx: Context<AddInterviewSubmission>,
        developer: Pubkey,
        test_submit_url: String,
    ) -> anchor_lang::Result<()> {
        if developer.to_string().is_empty() || test_submit_url.trim().is_empty() {
            return Err(error!(Errors::CannotAddSubmission));
        }
        let interview = &mut ctx.accounts.interview;

        if interview.developer == developer {
            return Err(error!(Errors::AlreadySubmitted));
        }

        interview.developer = developer;
        interview.test_submit_url = test_submit_url;
        Ok(())
    }

    pub fn update_interview_result(
        ctx: Context<UpdateInterviewResult>,
        result: String,
    ) -> anchor_lang::Result<()> {
        if result.trim().is_empty() {
            return Err(error!(Errors::CannotUpdateInterviewResult));
        }
        let interview = &mut ctx.accounts.interview;

        interview.result = result;
        Ok(())
    }

    pub fn create_contract(
        ctx: Context<CreateContract>,
        developer: Pubkey,
        company_peg_from: u64,
        company_peg_to: u64,
        developer_peg_from: u64,
        developer_peg_to: u64,
        company_peg_amount: u64,
        developer_peg_amount: u64,
        start: u64,
        end: u64,
    ) -> anchor_lang::Result<()> {
        if developer.to_string().is_empty() {
            return Err(error!(Errors::CannotCreateContract));
        }
        let now = Clock::get().unwrap().unix_timestamp as u64;
        if now > company_peg_to
            || now > developer_peg_to
            || company_peg_from - company_peg_to <= 0
            || developer_peg_from - developer_peg_to <= 0
        {
            return Err(error!(Errors::InvalidPegTime));
        }
        let contract = &mut ctx.accounts.contract;
        contract.company = ctx.accounts.authority.key();
        contract.developer = developer;
        let company_peg_time = PegTimeRange {
            from: company_peg_from,
            to: company_peg_to,
        };
        let developer_peg_time = PegTimeRange {
            from: developer_peg_from,
            to: developer_peg_to,
        };
        contract.company_peg_timeline = company_peg_time;
        contract.developer_peg_timeline = developer_peg_time;
        contract.company_peg_amount = company_peg_amount;
        contract.developer_peg_amount = developer_peg_amount;
        contract.start = start;
        contract.end = end;
        Ok(())
    }

    pub fn company_peg_to(ctx: Context<PegContract>) -> anchor_lang::Result<()> {
        let now = Clock::get().unwrap().unix_timestamp as u64;
        let contract = &mut ctx.accounts.contract;
        if now < contract.start || now > contract.end {
            return Err(error!(Errors::ContractNotAvailable));
        }
        let seeds: &[&[&[u8]]] = &[&[
            "treasurer".as_ref(),
            &contract.company.to_bytes(),
            &[*ctx.bumps.get("treasurer").unwrap()],
        ]];
        let transfer_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.owner_token_account.to_account_info(),
                to: ctx.accounts.contract_token_account.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            },
            seeds,
        );
        token::transfer(transfer_ctx, contract.company_peg_amount)?;

        Ok(())
    }

    pub fn developer_peg_to(ctx: Context<PegContract>) -> anchor_lang::Result<()> {
        let now = Clock::get().unwrap().unix_timestamp as u64;
        let contract = &mut ctx.accounts.contract;
        if now < contract.start || now > contract.end {
            return Err(error!(Errors::ContractNotAvailable));
        }
        let seeds: &[&[&[u8]]] = &[&[
            "treasurer".as_ref(),
            &contract.developer.to_bytes(),
            &[*ctx.bumps.get("treasurer").unwrap()],
        ]];
        let transfer_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.owner_token_account.to_account_info(),
                to: ctx.accounts.contract_token_account.to_account_info(),
                authority: ctx.accounts.authority.to_account_info(),
            },
            seeds,
        );
        token::transfer(transfer_ctx, contract.developer_peg_amount)?;

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
    AlreadySubmitted,
    #[msg("Approvement cannot be added, missing data")]
    CannotAddApprovement,
    #[msg("Interview cannot be added, missing data")]
    CannotCreateInterview,
    #[msg("Interview result cannot be updated, missing data")]
    CannotUpdateInterviewResult,
    #[msg("Contract cannot be created, missing data")]
    CannotCreateContract,
    #[msg("Peg time range is not valid")]
    InvalidPegTime,
    #[msg("Contract is not available in time range")]
    ContractNotAvailable
}
