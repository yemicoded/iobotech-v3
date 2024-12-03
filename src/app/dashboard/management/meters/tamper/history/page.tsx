import { GetMeterStore } from "@/app/services/meter-store";
import { GetCommunityServices } from "@/app/services/misc";
import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import { TGetCommunityService } from "@/types/misc";
import BypassVendingView from "@/views/dashboard/management/meters/bypass-vending";
import BypassVendingHistoryView from "@/views/dashboard/management/meters/bypass-vending/history";
import TamperView from "@/views/dashboard/management/meters/tamper";
import TamperHistoryView from "@/views/dashboard/management/meters/tamper/history";

interface Props {
  searchParams: Promise<{
    page: string;
    limit: string;
    search: string;
  }>;
}

export default async function MeterTamperPage({ searchParams }: Props) {
  const [history] = await Promise.all([
    GetMeterStore({ queryParams: await searchParams }),
  ]);
  return (
    <DashboardLayoutWrapper pageTitle="Clear Tamper History">
      <TamperHistoryView
        initialData={{
          history,
        }}
      />
    </DashboardLayoutWrapper>
  );
}
