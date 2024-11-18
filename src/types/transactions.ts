export type TGetTransaction = {
  _id: string;
  name: string;
  staffName: string;
  amount: string;
  meterId: string;
  unit: string;
  service: {
    _id: string;
    name: string;
  };
  source: string;
  product: {
    name: string;
  };
  remark: string;
  data?: {
    token: string;
    unit: number;
    amount: number;
    tariff: number;
    penaltyFee: number;
  };
  bills?: "service charge";
  frequency?: "monthly";
  penaltyFee?: 5;
  createdAt: Date;
  isByPassRecharge: false;
  timeAgo: string;
};

export type TGetTransactionQuery = {
  page?: string;
  limit?: string;
  search?: string;
};
