import { GetSinglePayout } from "@/app/services/payout";
import { GetTransactions } from "@/app/services/transaction";
import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import { View } from "@/components/shared/view";
import { DashboardSinglePayoutView } from "@/views/dashboard/finance/payout/single-payout";

interface Props {
  params: {
    id: string;
  };
  searchParams: Promise<{
    page: string;
    limit: string;
    search: string;
  }>;
}
export default async function SinglePayoutPage({
  params,
  searchParams,
}: Props) {
  const [payouts, payoutTransactions] = await Promise.all([
    GetSinglePayout(params.id),
    GetTransactions({ payoutId: params.id, queryParams: await searchParams }),
  ]);
  if (payouts.error) {
    return "An error occured";
  }
  return (
    <DashboardLayoutWrapper pageTitle="Payout Details">
      <View className="py-6 w-full">
        <DashboardSinglePayoutView
          payout={payouts.data![0]}
          initialData={{ payoutTransactions }}
        />
      </View>
    </DashboardLayoutWrapper>
  );
}
