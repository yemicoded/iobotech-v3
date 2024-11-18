export type TCommunity = {
  active: boolean;
  merchantId: string;
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  communityName: string;
  logo: string;
  type: string;
  apikey: string;
  address: string;
  createdAt: Date;
  role: {
    name: string;
    permission: Array<string>;
    isMerchant: boolean;
    isFullAccess: boolean;
    description: string;
  };
};

export type TMerchant = {
  merchantId: string;
  businessName: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

export type TGetCommunity = {
  communities: Array<TCommunity>;
  merchants: Array<TMerchant>;
};
