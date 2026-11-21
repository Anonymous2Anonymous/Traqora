# V1 Passenger Name Validation

## Overview
Traqora supports valid international passenger names (including diacritics and non-ASCII characters such as 'José María') without lossy normalization, while strictly rejecting control characters.

## Rules
- **Length**: Between 1 and 256 bytes.
- **Allowed Characters**: All standard typographic characters, international character sets, and standard whitespace (spaces, tabs, newlines).
- **Rejected Characters**: ASCII control characters (bytes below 32 except tab, LF, CR) and DEL (byte 127).

## Implementation
Validated in smart contract logic and backend checks to ensure booking integrity across international flights.
