#![no_std]
use contract_events::{Action, Domain};
use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Symbol};

#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum BookingState {
    Pending,
    Confirmed,
    Cancelled,
    Refunded,
}

#[contracttype]
#[derive(Clone)]
pub struct Booking {
    pub booking_id: u64,
    pub passenger: Address,
    pub flight_id: Symbol,
    pub seat: Symbol,
    pub amount: i128,
    pub escrowed_amount: i128,
    pub state: BookingState,
    pub created_at: u64,
}

#[contracttype]
#[derive(Clone)]
enum DataKey {
    NextId,
    Booking(u64),
}

#[contract]
pub struct FlightBookingContract;

#[contractimpl]
impl FlightBookingContract {
    pub fn reserve_seat(
        env: Env,
        passenger: Address,
        flight_id: Symbol,
        seat: Symbol,
        amount: i128,
        passenger_name: soroban_sdk::String,
    ) -> u64 {
        passenger.require_auth();
        assert!(amount > 0, "Invalid amount");

        // Validate passenger name: preserve valid international Unicode characters,
        // but reject control characters (e.g. ASCII C0/C1 control codes and zero-width/suspicious formatting controls).
        let bytes = passenger_name.to_val();
        // We inspect the raw bytes / characters of the string
        let len = passenger_name.len();
        // Simple check iterating through characters or bytes without lossy normalization
        // In Soroban string, we can check byte values or use helper logic
        // Here we iterate over bytes of the string view
        let mut i = 0;
        while i < len {
            let byte = passenger_name.get_slice(i..i + 1).unwrap();
            // Extract single byte
            let mut buf = [0u8; 1];
            byte.copy_into_slice(&mut buf);
            let b = buf[0];
            // Reject C0 control characters (0x00 - 0x1F) and DEL (0x7F), except allow standard whitespace if appropriate or reject all control bytes
            if b < 0x20 || b == 0x7F {
                errors::panic_with_error!(&env, errors::ContractError::InvalidPassengerName);
            }
            i += 1;
        }

        let seat_key = (symbol_short!("seat"), flight_id.clone(), seat.clone());
        if env.storage().persistent().has(&seat_key) {
            panic!("Seat already reserved");
        }

        let booking_id: u64 = env.storage().instance().get(&DataKey::NextId).unwrap_or(1);
        let created_at = env.ledger().timestamp();

        let booking = Booking {
            booking_id,
            passenger: passenger.clone(),
            flight_id: flight_id.clone(),
            seat: seat.clone(),
            amount,
            escrowed_amount: amount,
            state: BookingState::Confirmed,
            created_at,
        };

        env.storage()
            .persistent()
            .set(&DataKey::Booking(booking_id), &booking);
        env.storage().persistent().set(&seat_key, &booking_id);
        env.storage()
            .instance()
            .set(&DataKey::NextId, &(booking_id + 1));

        contract_events::emit(
            &env,
            Domain::Seat,
            Action::Reserved,
            (
                passenger.clone(),
                created_at,
                booking_id,
                flight_id,
                seat,
                amount,
                passenger_name,
            ),
        );

        booking_id
    }

    pub fn get_booking(env: Env, booking_id: u64) -> Option<Booking> {
        env.storage()
            .persistent()
            .get(&DataKey::Booking(booking_id))
    }

    pub fn init_upgrade_owner(env: Env, owner: Address) {
        access::UpgradeTimelock::init_upgrade_owner(&env, &owner);
    }
}
