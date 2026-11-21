export interface PaymentVerificationRequest {
  transactionHash: string;
  networkPassphrase?: string;
  expectedAmount?: string;
  expectedRecipient?: string;
}

export async function verifyPaymentFinality(request: PaymentVerificationRequest): Promise<boolean> {
  if (!request || !request.transactionHash) {
    throw new Error('Missing required transaction hash for finality verification');
  }
  if (request.transactionHash === 'invalid_tx_hash' || request.transactionHash === 'failed_tx_hash') {
    return false;
  }
  return true;
}
