use anchor_lang::prelude::*;

const NAME_LENGTH: usize = 100;
const URL_LENGTH: usize = 255;
const USER_ROLE_LENGTH: usize = 15;
const DEVELOPER_MSG_LENGTH: usize = 255;
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
pub struct JDAccount {
    pub company: Pubkey,
    pub title: String,
    pub jd_content_url: String,
    pub max_slot: u64,
    pub submit_id_list: Vec<u64>,
}

impl JDAccount {
    pub const MAX_SIZE: usize = 32 + NAME_LENGTH + URL_LENGTH + 8 + (4 + 100 * 8);
}

#[account]
pub struct SubmissionAccount {
    pub developer: Pubkey,
    pub company: Pubkey,
    pub jd_title: String,
    pub developer_msg: String,
    pub is_approve: bool,
}

impl SubmissionAccount {
    pub const MAX_SIZE: usize = 2 * 32 + NAME_LENGTH + DEVELOPER_MSG_LENGTH + 1;
}
