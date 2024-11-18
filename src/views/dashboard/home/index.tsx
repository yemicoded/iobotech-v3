"use client";
import { View } from "@/components/shared/view";
import React from "react";
import { RecentTransactionsTable } from "./_components/table";
import { Chart } from "./_components/chart";
import { IGetAPIResponse } from "@/types/api-response.interface";
import {
  TGetCashflowAnalytics,
  TGetRevenueChartResponseDTO,
} from "@/types/revenue";
import { CashflowANalytics } from "./_components/cashflow-analytics";
import { TGetTransaction } from "@/types/transactions";

interface Props {
  initialData: {
    revenueChart: IGetAPIResponse<TGetRevenueChartResponseDTO>;
    cashflowAnalytics: IGetAPIResponse<TGetCashflowAnalytics>;
    recentTransactions: IGetAPIResponse<TGetTransaction[]>;
  };
}
export const DashboardHomeView: React.FC<Props> = ({ initialData }) => {
  return (
    <View className="flex flex-col gap-6 w-full">
      <View className="flex gap-6">
        <View className="flex-1 shadow min-h-[300px] p-6 rounded-lg">
          <Chart initialData={initialData.revenueChart} />
        </View>
        <CashflowANalytics initialData={initialData.cashflowAnalytics} />
      </View>
      {/* <View className="flex-1 shadow rounded-lg"> */}
      <RecentTransactionsTable initialData={initialData.recentTransactions} />
      {/* </View> */}
    </View>
  );
};
