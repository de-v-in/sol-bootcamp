use anchor_lang::prelude::*;

#[account]
pub struct UserAccount {
    pub wallet_address: Pubkey,
    pub name: String,
    pub profile_image_url: String,
    pub role: String,
    pub point: u64
}
