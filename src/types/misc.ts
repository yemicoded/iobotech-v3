export type TGetCommunityService = {
  serviceId: string;
  name: string;
  products: Array<{
    _id: string;
    name: string;
  }>;
  hasTransactions: boolean;
};
