# Booking Lifecycle and Payment Finality Recovery

## Overview
Traqora v1 requires verifying transaction finality on the configured network before marking any payment complete. This document details the recovery procedures and finality verification requirements.

## Payment Finality Verification
- Payments submitted via Soroban smart contracts must be confirmed on-chain.
- The client or backend service queries the configured network RPC for transaction status and result XDR before transitioning a booking state to 'Paid' or 'Complete'.
- If finality cannot be verified within the timeout window, the transaction status is marked as pending/failed and eligible for safe retry or reconciliation.
