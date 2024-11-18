import { GetCommunityServices } from "@/app/services/misc";
import { GetTransactions } from "@/app/services/transaction";
import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import { TGetCommunityService } from "@/types/misc";
import { DashboardTransactionsView } from "@/views/dashboard/finance/transactions";

interface Props {
  searchParams: Promise<{
    page: string;
    limit: string;
    search: string;
  }>;
}
export default async function DashboardTransactionsPage({
  searchParams,
}: Props) {
  const { data: services, error } = await GetCommunityServices();

  if (error) {
    return null;
  }

  const billing = services?.find((service) => service.name.includes("billing"));
  const metering = services?.find((service) =>
    service.name.includes("metering")
  );

  console.log("SEARCH PARAMS", searchParams);
  const [allTransactions, meteringTransactions, billingTransactions] =
    await Promise.all([
      GetTransactions({ queryParams: await searchParams }),
      GetTransactions({
        serviceId: metering?.serviceId,
        queryParams: await searchParams,
      }),
      GetTransactions({
        serviceId: billing?.serviceId,
        queryParams: await searchParams,
      }),
    ]);
  return (
    <DashboardLayoutWrapper pageTitle="Transactions">
      <DashboardTransactionsView
        initialData={{
          services: services as TGetCommunityService[],
          allTransactions,
          meteringTransactions,
          billingTransactions,
        }}
      />
    </DashboardLayoutWrapper>
  );
}
