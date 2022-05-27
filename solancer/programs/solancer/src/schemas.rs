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
    pub accepted_list: Vec<Pubkey>,
    pub pending_list: Vec<PendingSubmission>,
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
