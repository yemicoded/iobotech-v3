import { TCommunity } from "@/types/community";

export const QueryKeys = ({ apikey }: TCommunity) => ({
  GET_COMMUNITIES: [apikey, "communities"].toString(),
  GET_REVENUE_CHART: [apikey, "get-revenue-chart"].toString(),
  GET_CASHFLOW_ANALYTICS: [apikey, "get-cashflow-analytics"].toString(),
  GET_RECENT_TRANSACTIONS: [apikey, "get-recent-transactions"].toString(),
  GET_ALL_TRANSACTIONS: [apikey, "get-all-transactions"].toString(),
  GET_METERING_TRANSACTIONS: [apikey, "get-metering-transactions"].toString(),
  GET_BILLING_TRANSACTIONS: [apikey, "get-billing-transactions"].toString(),
  GET_ALL_PAYOUTS: [apikey, "get-all-payouts"].toString(),
  GET_METERING_PAYOUTS: [apikey, "get-metering-payouts"].toString(),
  GET_BILLING_PAYOUTS: [apikey, "get-billing-payouts"].toString(),
  GET_SINGLE_PAYOUT_TRANSACTIONS: [apikey, "get-single-payout-trx"].toString(),
});
