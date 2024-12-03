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
import { Button } from "@/components/ui/button";
import { History, NotebookTabs } from "lucide-react";

interface Props {
  initialData: {
    services: TGetCommunityService[];
    allTransactions: IGetAPIResponse<TGetMeterStore[]>;
    meteringTransactions: IGetAPIResponse<TGetMeterStore[]>;
    billingTransactions: IGetAPIResponse<TGetMeterStore[]>;
  };
}

export default function TamperView({ initialData }: Props) {
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
    <View className="flex flex-col gap-6 w-full">
      {/* <MetricsBreakdown /> */}
      <Tabs defaultValue="all" className="w-full">
        <View className="bg-white z-10 fixed w-[calc(100%-var(--sidebar-width))] right-0">
          <View className="w-[95%] mx-auto flex items-center justify-between">
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
            <View>
              <Button leftComp={<NotebookTabs />} variant="link">
                History
              </Button>
              {/* <TrxFilter /> */}
            </View>
          </View>
        </View>
        <View className="mt-16 mb-6 pt-4 w-full overflow-hidden">
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
