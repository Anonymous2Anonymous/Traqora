#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, token, Env};

#[test]
fn test_pay_for_booking_finality_success() {
    let env = Env::default();
    env.mock_all_auths();

    let admin = Address::generate(&env);
    let passenger = Address::generate(&env);
    let airline = Address::generate(&env);

    let token_admin = Address::generate(&env);
    let token_contract = env.register_stellar_asset_contract(token_admin);
    let token_client = token::Client::new(&env, &token_contract);

    token_client.mint(&passenger, &1000);

    let booking_id = BookingContract::create_booking(
        env.clone(),
        passenger.clone(),
        airline.clone(),
        symbol_short!("FL123"),
        symbol_short!("JFK"),
        symbol_short!("LAX"),
        1000000,
        500,
        token_contract.address(),
    );

    BookingContract::pay_for_booking(env.clone(), booking_id);

    let booking = BookingContract::get_booking(env, booking_id).unwrap();
    assert_eq!(booking.status, symbol_short!("confirmed"));
    assert_eq!(booking.amount_escrowed, 500);
    assert_eq!(token_client.balance(&passenger), 500);
}

#[test]
#[should_panic(expected = "Payment transaction finality verification failed")]
fn test_pay_for_booking_finality_failure() {
    let env = Env::default();
    env.mock_all_auths();

    let passenger = Address::generate(&env);
    let airline = Address::generate(&env);

    let token_admin = Address::generate(&env);
    let token_contract = env.register_stellar_asset_contract(token_admin);
    let token_client = token::Client::new(&env, &token_contract);

    // Passenger has 0 balance, transfer will fail or balance won't increase sufficiently
    let booking_id = BookingContract::create_booking(
        env.clone(),
        passenger.clone(),
        airline.clone(),
        symbol_short!("FL123"),
        symbol_short!("JFK"),
        symbol_short!("LAX"),
        1000000,
        500,
        token_contract.address(),
    );

    BookingContract::pay_for_booking(env, booking_id);
}
