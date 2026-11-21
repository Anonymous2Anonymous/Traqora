import { verifyPaymentFinality } from '../booking/PaymentFinality';

describe('Payment Transaction Finality Verification', () => {
  it('successfully verifies a valid payment transaction on the network', async () => {
    const isValid = await verifyPaymentFinality({
      transactionHash: 'abc123hash',
      expectedAmount: '100.00',
      expectedRecipient: 'GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB',
    });
    expect(isValid).toBe(true);
  });

  it('rejects an invalid or failed payment transaction', async () => {
    const isValid = await verifyPaymentFinality({
      transactionHash: 'failed_tx_hash',
    });
    expect(isValid).toBe(false);
  });

  it('throws an error when transaction hash is missing', async () => {
    await expect(
      verifyPaymentFinality({
        transactionHash: '',
      })
    ).rejects.toThrow('Missing required transaction hash for finality verification');
  });
});
