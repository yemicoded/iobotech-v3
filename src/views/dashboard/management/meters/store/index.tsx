"use client";
import { View } from "@/components/shared/view";
import { MetricsBreakdown } from "./_components/metrics-breakdown";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllMetersStore } from "./_components/all-meters-store";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetCommunityService } from "@/types/misc";
import { TGetMeterStore } from "@/types/meter-store";
import { InstalledMetersStore } from "./_components/installed-meters-store";
import { UninstalledMetersStore } from "./_components/uninstalled-meters-store";
import { BypassedMetersStore } from "./_components/bypassed-meters-store";

interface Props {
  initialData: {
    services: TGetCommunityService[];
    allTransactions: IGetAPIResponse<TGetMeterStore[]>;
    meteringTransactions: IGetAPIResponse<TGetMeterStore[]>;
    billingTransactions: IGetAPIResponse<TGetMeterStore[]>;
  };
}

export default function MeterStoreView({ initialData }: Props) {
  const tabTriggers = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Installed",
      value: "installed",
    },
    {
      label: "Uninstalled",
      value: "uninstalled",
    },
    {
      label: "Bypassed",
      value: "bypassed",
    },
  ];

  return (
    <View className="flex flex-col gap-6 py-6 w-full">
      <MetricsBreakdown />
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-transparent h-16 pt-6 justify-start p-0 gap-4">
          {tabTriggers.map((trigger, _i) => (
            <TabsTrigger
              key={_i}
              value={trigger.value}
              className="font-semibold data-[state=active]:shadow-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 border-b-2 border-transparent data-[state=active]:border-primary rounded-none focus-visible:ring-offset-0 shadow-none"
            >
              {trigger.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <View className="mb-6 w-full overflow-hidden">
          <TabsContent value="all" className="">
            <AllMetersStore
              products={
                initialData.services?.find((service) =>
                  service.name.includes("metering")
                )?.products || []
              }
              initialData={initialData.allTransactions}
            />
          </TabsContent>
          <TabsContent value="installed">
            <InstalledMetersStore
              products={
                initialData.services?.find((service) =>
                  service.name.includes("metering")
                )?.products || []
              }
              initialData={initialData.allTransactions}
            />
          </TabsContent>
          <TabsContent value="uninstalled">
            <UninstalledMetersStore
              products={
                initialData.services?.find((service) =>
                  service.name.includes("metering")
                )?.products || []
              }
              initialData={initialData.allTransactions}
            />
          </TabsContent>
          <TabsContent value="bypassed">
            <BypassedMetersStore
              products={
                initialData.services?.find((service) =>
                  service.name.includes("metering")
                )?.products || []
              }
              initialData={initialData.allTransactions}
            />
          </TabsContent>
        </View>
      </Tabs>
    </View>
  );
}
