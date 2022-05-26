use super::schemas::*;
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token};

#[derive(Accounts)]
pub struct CreateDeveloper<'info> {
    // Authenticate user account
    #[account(
        init,
        seeds = [b"developer".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority,
        space = DeveloperAccount::MAX_SIZE + 8
    )]
    pub developer: Account<'info, DeveloperAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    /// CHECK: Simple test account
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct CreateCompany<'info> {
    // Authenticate user account
    #[account(
        init,
        seeds = [b"company".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority,
        space = CompanyAccount::MAX_SIZE + 8
    )]
    pub company: Account<'info, CompanyAccount>,

    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    /// CHECK: Simple test account
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct CreateJD<'info> {
    // Authenticate user account
    #[account(
        init,
        seeds = [b"jd".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority,
        space = JDAccount::MAX_SIZE + 8
    )]
    pub jd: Account<'info, JDAccount>,
    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    /// CHECK: Simple test account
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}

#[derive(Accounts)]
pub struct CreateSubmission<'info> {
    // Authenticate user account
    #[account(
        init,
        seeds = [b"jd".as_ref(), authority.key().as_ref()],
        bump,
        payer = authority,
        space = SubmissionAccount::MAX_SIZE + 8
    )]
    pub submission: Account<'info, SubmissionAccount>,
    // Authority (this is signer who paid transaction fee)
    #[account(mut)]
    pub authority: Signer<'info>,

    /// System program
    /// CHECK: Simple test account
    pub system_program: UncheckedAccount<'info>,

    // Token program
    #[account(constraint = token_program.key == &token::ID)]
    pub token_program: Program<'info, Token>,

    // Clock to save time
    pub clock: Sysvar<'info, Clock>,
}