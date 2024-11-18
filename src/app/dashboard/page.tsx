import { GetRevenueChart } from "@/app/services/revenue";
import { DashboardHomeView } from "@/views/dashboard/home";
import { startOfDay } from "date-fns";
import { GetCashflowAnalytics } from "@/app/services/cashflow";
import { GetTransactions } from "@/app/services/transaction";
import { View } from "@/components/shared/view";
import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import { Suspense } from "react";
import { Text } from "@/components/shared/text";

export default async function DashboardManagementPage() {
  const [revenueChart, cashflowAnalytics, transactions] = await Promise.all([
    GetRevenueChart({
      startDate: startOfDay(new Date()),
      endDate: new Date(),
      groupBy: "hour",
    }),
    GetCashflowAnalytics({
      startDate: startOfDay(new Date()).toString(),
      endDate: new Date().toString(),
    }),
    GetTransactions({
      queryParams: {
        limit: "5",
      },
    }),
  ]);

  console.log("Error", cashflowAnalytics);
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <DashboardLayoutWrapper pageTitle="Dashboard">
        <View className="py-6 w-full">
          <DashboardHomeView
            initialData={{
              revenueChart: revenueChart,
              cashflowAnalytics: cashflowAnalytics,
              recentTransactions: transactions,
            }}
          />
        </View>
      </DashboardLayoutWrapper>
    </Suspense>
  );
}
