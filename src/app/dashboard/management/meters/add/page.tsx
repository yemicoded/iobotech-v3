import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import AddMeterView from "@/views/dashboard/management/meters/add";

export default async function MeterManagementPage() {
  return (
    <DashboardLayoutWrapper pageTitle="Add Meter">
      <AddMeterView />
    </DashboardLayoutWrapper>
  );
}
