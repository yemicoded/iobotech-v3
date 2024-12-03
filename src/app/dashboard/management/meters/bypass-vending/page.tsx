import { GetMeterStore } from "@/app/services/meter-store";
import { GetCommunityServices } from "@/app/services/misc";
import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import { TGetCommunityService } from "@/types/misc";
import BypassVendingView from "@/views/dashboard/management/meters/bypass-vending";
import TamperView from "@/views/dashboard/management/meters/tamper";

interface Props {
  searchParams: Promise<{
    page: string;
    limit: string;
    search: string;
  }>;
}

export default async function MeterTamperPage({ searchParams }: Props) {
  const { data: services, error } = await GetCommunityServices();

  if (error) {
    return null;
  }

  const billing = services?.find((service) => service.name.includes("billing"));
  const metering = services?.find((service) =>
    service.name.includes("metering")
  );

  const [allTransactions, meteringTransactions, billingTransactions] =
    await Promise.all([
      GetMeterStore({ queryParams: await searchParams }),
      GetMeterStore({
        serviceId: metering?.serviceId,
        queryParams: await searchParams,
      }),
      GetMeterStore({
        serviceId: billing?.serviceId,
        queryParams: await searchParams,
      }),
    ]);
  return (
    <DashboardLayoutWrapper pageTitle="Bypass Vending">
      <BypassVendingView
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
