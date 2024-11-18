export type TGetPayout = {
  disbursedAmount: number;
  chargesAmount: number;
  isApproved: boolean;
  toBeDisbursedOn: Date;
  isDisbursed: boolean;
  disbursedDate: Date;
  payoutId: string;
  disbursement: {
    isBenchMark: false;
    benchMarkAmount: 0;
    chargesFormat: "percentage";
    chargesAmount: 0;
    chargesCap: 0;
    emailToBeNotified: "emo@lekkiservicesdflats.com";
  };
  service: string;
  product: string;
  communityProductId: string;
  bank: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
  numberOfTransaction: 0;
  totalAmount: 0;
  status: "paid" | "failed" | "pending";
};

export type TGetPayoutQuery = {
  page?: string;
  limit?: string;
  search?: string;
};
