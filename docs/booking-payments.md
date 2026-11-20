# Booking Payments and Transaction Finality

When a passenger calls `pay_for_booking`, the booking contract transfers tokens into escrow and verifies payment transaction finality by asserting that the contract's token balance increased by at least the booking price. If this check fails, the transaction reverts.
