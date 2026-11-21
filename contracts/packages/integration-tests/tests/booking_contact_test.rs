use booking::{validate_contact_details, ContactDetails};
use soroban_sdk::{Env, String, Symbol};

#[test]
fn test_valid_email_contact() {
    let env = Env::default();
    let contact = ContactDetails {
        channel_type: Symbol::new(&env, "email"),
        identifier: String::from_str(&env, "traveler@example.com"),
    };
    assert!(validate_contact_details(&env, &contact));
}

#[test]
fn test_valid_sms_contact() {
    let env = Env::default();
    let contact = ContactDetails {
        channel_type: Symbol::new(&env, "sms"),
        identifier: String::from_str(&env, "+15555550199"),
    };
    assert!(validate_contact_details(&env, &contact));
}

#[test]
fn test_invalid_contact_channel() {
    let env = Env::default();
    let contact = ContactDetails {
        channel_type: Symbol::new(&env, "pigeon"),
        identifier: String::from_str(&env, "roost-1"),
    };
    assert!(!validate_contact_details(&env, &contact));
}

#[test]
fn test_empty_identifier_rejected() {
    let env = Env::default();
    let contact = ContactDetails {
        channel_type: Symbol::new(&env, "email"),
        identifier: String::from_str(&env, ""),
    };
    assert!(!validate_contact_details(&env, &contact));
}
