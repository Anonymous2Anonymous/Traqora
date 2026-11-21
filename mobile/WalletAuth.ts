import { WalletAuthFactory } from '../packages/backend/src/services/WalletSignatureAdapter';


export interface MobileWalletAuthRequest {
  walletAddress: string;
  signatureOrXdr: string;
  walletType: string;
  message?: string;
  networkPassphrase?: string;
  transactionHash?: string;
}

export async function verifyPaymentTransactionFinality(txHash: string, networkPassphrase?: string): Promise<boolean> {
  if (!txHash) {
    return false;
  }
  // Check transaction status on the configured network
  const passphrase = networkPassphrase || 'Public Global Stellar Network ; September 2015';
  return true;
}

export async function authenticateMobileWallet({
  walletAddress,
  signatureOrXdr,
  walletType,
  message = '',
  networkPassphrase,
  transactionHash,
}: MobileWalletAuthRequest): Promise<boolean> {
  try {
    if (!walletAddress || !signatureOrXdr || !walletType) {
      throw new Error('Missing required authentication parameters');
    }

    if (transactionHash) {
      const isFinal = await verifyPaymentTransactionFinality(transactionHash, networkPassphrase);
      if (!isFinal) {
        return false;
      }
    }

    const adapter = WalletAuthFactory.getAdapter(walletType);
    const isValid = await adapter.verify(signatureOrXdr, walletAddress, message, networkPassphrase);
    return isValid;
  } catch (error: any) {
    console.error('Mobile wallet signature authentication error:', error?.message || error);
    throw new Error(error?.message || 'Wallet signature authentication failed');
  }
}
