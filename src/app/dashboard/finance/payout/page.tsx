import { GetCommunityServices } from "@/app/services/misc";
import { GetPayouts } from "@/app/services/payout";
import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import { TGetCommunityService } from "@/types/misc";
import { DashboardPayoutsView } from "@/views/dashboard/finance/payout";

interface Props {
  searchParams: Promise<{
    page: string;
    limit: string;
    search: string;
  }>;
}
export default async function DashboardPayoutPage({ searchParams }: Props) {
  const { data: services, message, error } = await GetCommunityServices();

  console.log("SERVICES MESSAGE", message, services);
  if (error) {
    return null;
  }

  const billing = services?.find((service) => service.name.includes("billing"));
  const metering = services?.find((service) =>
    service.name.includes("metering")
  );

  // console.log("SEARCH PARAMS", searchParams);
  const [allPayouts, meteringPayouts, billingPayouts] = await Promise.all([
    GetPayouts({ queryParams: await searchParams }),
    GetPayouts({
      serviceId: metering?.serviceId,
      queryParams: await searchParams,
    }),
    GetPayouts({
      serviceId: billing?.serviceId,
      queryParams: await searchParams,
    }),
  ]);

  console.log("METERING PAYOUT", meteringPayouts);

  return (
    <DashboardLayoutWrapper pageTitle="Payout">
      <DashboardPayoutsView
        initialData={{
          services: services as TGetCommunityService[],
          allPayouts,
          meteringPayouts,
          billingPayouts,
        }}
      />
    </DashboardLayoutWrapper>
  );
}
