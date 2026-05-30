export interface WalletDto {
  walletId: string;
  address: string;
  currency: string;
}

export interface BalanceDto {
  walletId: string;
  balance: number;
  currency: string;
}

export interface TxDto {
  transactionId: string;
  from: string;
  to: string;
  amount: number;
  currency: string;
  status: string;
}

export interface VirtualCardDto {
  cardId: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  limit: number;
  isLocked: boolean;
}
