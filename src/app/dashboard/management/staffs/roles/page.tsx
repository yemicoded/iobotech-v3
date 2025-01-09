import DashboardLayoutWrapper from "@/components/layouts/dashboard";
import { RolesAndPermission } from "@/views/dashboard/management/staffs/roles-permission";
import React from "react";
import { GetCommunityServices } from "@/app/services/misc";
import { GetTransactions } from "@/app/services/transaction";
import { TGetCommunityService } from "@/types/misc";

interface Props {
  searchParams: Promise<{
    page: string;
    limit: string;
    search: string;
  }>;
}
export default async function DashboardRolesPage({ searchParams }: Props) {
  const { data: services, error } = await GetCommunityServices();

  if (error) {
    return null;
  }

  const billing = services?.find((service) => service.name.includes("billing"));
  const metering = services?.find((service) =>
    service.name.includes("metering")
  );

  console.log("SEARCH PARAMS", searchParams);
  const [allTransactions] =
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
    <DashboardLayoutWrapper pageTitle="Roles and Permission">
      <RolesAndPermission
        initialData={{
          services: services as TGetCommunityService[],
          allTransactions,
        }}
      />
    </DashboardLayoutWrapper>
  );
}
