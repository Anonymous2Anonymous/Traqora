#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::{Env, String};

    #[test]
    fn test_validate_passenger_name() {
        let env = Env::default();
        let valid_name = String::from_str(&env, "José María");
        assert!(FlightBookingContract::validate_passenger_name(
            env.clone(),
            valid_name
        ));

        let mut bad_bytes = [0u8; 1];
        bad_bytes[0] = 0x01; // Control character
        let invalid_name = String::from_str(&env, "Bad");
        assert!(!FlightBookingContract::validate_passenger_name(
            env.clone(),
            invalid_name
        ));
    }
}
