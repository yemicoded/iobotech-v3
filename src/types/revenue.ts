export type TGetRevenueChartResponseDTO = {
  chart: Array<{
    label: Date;
    billing: number;
    metering: number;
  }>;
  totalRevenue: number;
};

export type TGetCashflowAnalytics = {
  incomeCashFlow: number;
  expensesCashFlow: number;
  pendingPayout: number;
  disbursedPayout: number;
};
