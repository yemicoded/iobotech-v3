"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Text } from "@/components/shared/text";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetCommunityService } from "@/types/misc";
import { TGetPayout } from "@/types/payout";
import { AllPayouts } from "./_components/all-payouts";
import { MeteringPayouts } from "./_components/metering-payouts";
import { BillingPayouts } from "./_components/billing-payouts";

interface Props {
  initialData: {
    services: TGetCommunityService[];
    allPayouts: IGetAPIResponse<TGetPayout[]>;
    meteringPayouts: IGetAPIResponse<TGetPayout[]>;
    billingPayouts: IGetAPIResponse<TGetPayout[]>;
  };
}


export const DashboardPayoutsView: React.FC<Props> = ({ initialData }) => {
  console.log("Services", initialData.services);
  const tabTriggers = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Metering",
      value: "metering",
    },
    {
      label: "Billing",
      value: "billing",
    },
  ];
  return (
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
            <TrxFilter />
          </View>
        </View>
      </View>
      <View className="mt-16 mb-6 pt-4 w-full overflow-hidden">
        {/* <View className="overflow-y-auto"> */}
        <TabsContent value="all" className="">
          <AllPayouts initialData={initialData.allPayouts} />
        </TabsContent>
        <TabsContent value="metering">
          <MeteringPayouts
            serviceId={
              initialData.services?.find((service) =>
                service.name.includes("metering")
              )?.serviceId as string
            }
            products={
              initialData.services?.find((service) =>
                service.name.includes("metering")
              )?.products || []
            }
            initialData={initialData.meteringPayouts}
          />
        </TabsContent>
        <TabsContent value="billing">
          <BillingPayouts
            serviceId={
              initialData.services?.find((service) =>
                service.name.includes("billing")
              )?.serviceId as string
            }
            products={
              initialData.services?.find((service) =>
                service.name.includes("billing")
              )?.products || []
            }
            initialData={initialData.billingPayouts}
          />
        </TabsContent>
        {/* </View> */}
      </View>
    </Tabs>
  );
};

const TrxFilter: React.FC = () => {
  // const lineItems = [{
  //   label:
  // }]
  return (
    <Sheet>
      <SheetTrigger className="w-fit" asChild>
        <Button
          leftComp={<Filter />}
          variant="link"
          className="font-semibold p-0"
        >
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col 2xl:min-w-[600px]">
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
        </SheetHeader>
        <View className="flex-1 flex flex-col gap-10">
          <View>
            <View className="flex flex-col gap-1">
              <Text className="text-primary font-semibold">Amount Section</Text>
              <SheetDescription>
                Set the amount range to filter by amount of your choice
              </SheetDescription>
            </View>
          </View>
          <View>
            <View className="flex flex-col gap-1">
              <Text className="text-primary font-semibold">Date Section</Text>
              <SheetDescription>
                Filter by date range or select a custom date of your choice
              </SheetDescription>
            </View>
          </View>
        </View>
        <SheetFooter className="flex items-center">
          <Button variant="dark" className="flex-1">
            Reset Filter
          </Button>
          <Button className="flex-1">PROCEED</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
