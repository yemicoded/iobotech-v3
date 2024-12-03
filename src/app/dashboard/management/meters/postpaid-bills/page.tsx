import { GetMeterStore } from "@/app/services/meter-store";
import { GetCommunityServices } from "@/app/services/misc";
import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import { TGetCommunityService } from "@/types/misc";
import BypassVendingView from "@/views/dashboard/management/meters/bypass-vending";
import PostpaidBillingView from "@/views/dashboard/management/meters/postpaid-billing";
import TamperView from "@/views/dashboard/management/meters/tamper";

interface Props {
  searchParams: Promise<{
    page: string;
    limit: string;
    search: string;
  }>;
}

export default async function MeterTamperPage({ searchParams }: Props) {
  const [postpaidBills] = await Promise.all([
    GetMeterStore({ queryParams: await searchParams }),
  ]);
  return (
    <DashboardLayoutWrapper pageTitle="Bypass Vending">
      <PostpaidBillingView
        initialData={{
          postpaidBills,
        }}
      />
    </DashboardLayoutWrapper>
  );
}
