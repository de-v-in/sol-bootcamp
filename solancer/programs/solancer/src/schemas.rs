use anchor_lang::prelude::*;

const USER_NAME_LENGTH: usize = 100;
const URL_LENGTH: usize = 255;
const USER_ROLE_LENGTH: usize = 15;
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
    pub const MAX_SIZE: usize = 32 + USER_NAME_LENGTH + 2*URL_LENGTH + USER_ROLE_LENGTH + 8;
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
    pub const MAX_SIZE: usize = 32 + USER_NAME_LENGTH + URL_LENGTH + USER_ROLE_LENGTH + 8;
}