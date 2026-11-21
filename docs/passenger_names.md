# Passenger Name Validation & International Support

Traqora supports passenger names with international Unicode characters (such as diacritics, accented letters, non-Latin scripts, hyphens, and apostrophes) without lossy normalization.

## Security & Validation Rules
- **Allowed**: Valid international Unicode characters, spaces, and punctuation.
- **Rejected**: ASCII C0/C1 control characters (e.g. 0x00–0x1F) and DEL (0x7F). Submitting names with these control characters causes the reservation transaction to abort with `InvalidPassengerName` (error code 402).
