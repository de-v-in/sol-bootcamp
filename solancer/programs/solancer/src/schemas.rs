use anchor_lang::prelude::*;
use std::mem::size_of;

const NAME_LENGTH: usize = 100;
const URL_LENGTH: usize = 255;
const USER_ROLE_LENGTH: usize = 15;
const MAX_CV_SLOT: usize = 20;
#[account]
pub struct DeveloperAccount {
    pub wallet_address: Pubkey,
    pub name: String,
    pub profile_image_url: String,
    pub role: String,
    pub point: u64,
    pub cv_url: String,
}

impl DeveloperAccount {
    pub const MAX_SIZE: usize = 32 + NAME_LENGTH + 2 * URL_LENGTH + USER_ROLE_LENGTH + 8;
}

#[account]
pub struct CompanyAccount {
    pub wallet_address: Pubkey,
    pub name: String,
    pub profile_image_url: String,
    pub role: String,
    pub point: u64,
}

impl CompanyAccount {
    pub const MAX_SIZE: usize = 32 + NAME_LENGTH + URL_LENGTH + USER_ROLE_LENGTH + 8;
}

#[account]
pub struct JdAccount {
    pub company: Pubkey,
    pub title: String,
    pub jd_content_url: String,
    pub max_slot: u64,
    pub approved_list: Vec<Pubkey>,           // approved developers
    pub pending_list: Vec<PendingSubmission>, // pending developers
    pub is_available: bool,
}

impl JdAccount {
    pub const MAX_SIZE: usize =
        32 + NAME_LENGTH + URL_LENGTH + 8 + MAX_CV_SLOT * (32 + size_of::<PendingSubmission>()) + 1;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct PendingSubmission {
    pub msg: String,
    pub developer: Pubkey,
}

/*
    1. Created by company after approving developer CV:
     - authority
     - jd_tile
     - test_url
    2. Developer update:
     - test_submit_url
     - developer
    3. Company final update:
     - result
*/
#[account]
pub struct InterviewAccount {
    pub authority: Pubkey,
    pub developer: Pubkey,
    pub jd_title: String,
    pub test_url: String,
    pub test_submit_url: String,
    pub result: String,
}

impl InterviewAccount {
    pub const MAX_SIZE: usize = 32 * 2 + NAME_LENGTH + URL_LENGTH * 3 + 20;
}

#[account]
pub struct ContractAccount {
    pub company: Pubkey,
    pub developer: Pubkey,
    pub company_peg_timeline: PegTimeRange,
    pub developer_peg_timeline: PegTimeRange,
    pub company_peg_amount: u64,
    pub developer_peg_amount: u64,
    pub start: u64,
    pub end: u64,
}

impl ContractAccount {
    pub const MAX_SIZE: usize = 2 * 32 + 2 * (size_of::<PegTimeRange>()) + 2 * 8;
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, PartialEq, Eq)]
pub struct PegTimeRange {
    pub from: u64,
    pub to: u64,
}
