"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { View } from "@/components/shared/view";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetTransaction } from "@/types/transactions";
import { TGetCommunityService } from "@/types/misc";
import { AllCustomers } from "./_components/all-customers";
import { Active } from "./_components/active";
import { Inactive } from "./_components/inactive";
import { FilterCustomers } from "./_components/filter-customers";
import ExportCSV from "./_components/export-csv";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Props {
  initialData: {
    services: TGetCommunityService[];
    allTransactions: IGetAPIResponse<TGetTransaction[]>;
    meteringTransactions: IGetAPIResponse<TGetTransaction[]>;
    billingTransactions: IGetAPIResponse<TGetTransaction[]>;
  };
}

export const DashboardCustomersView: React.FC<Props> = ({ initialData }) => {
  console.log("Services", initialData.services);
  const tabTriggers = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
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
          <View className="flex gap-6">
            <Link href='./customers/add'>
              <Button
                leftComp={<Plus />}
                variant="link"
                className="font-bold p-0"
              >
                Add Customer
              </Button>
            </Link>
            <ExportCSV />
            <FilterCustomers />
          </View>
        </View>
      </View>
      {/* <View className="overflow-y-auto"> */}
      <View className="mt-16 mb-6 pt-4 w-full overflow-hidden">
        <TabsContent value="all" className="">
          <AllCustomers initialData={initialData.allTransactions} />
        </TabsContent>
        <TabsContent value="metering">
          <Active
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
            initialData={initialData.meteringTransactions}
          />
        </TabsContent>
        <TabsContent value="billing">
          <Inactive
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
            initialData={initialData.billingTransactions}
          />
        </TabsContent>
        {/* </View> */}
      </View>
    </Tabs>
  );
};

