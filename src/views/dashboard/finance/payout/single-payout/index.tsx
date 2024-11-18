"use client";
import React from "react";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
// import { Filter } from "lucide-react";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
import { Text } from "@/components/shared/text";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetPayout } from "@/types/payout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { convertAmount } from "@/lib/util/convert-amount";
import { PayoutsTable } from "./_components/table";
import { TGetTransaction } from "@/types/transactions";

interface Props {
  payout: TGetPayout;
  initialData: {
    payoutTransactions: IGetAPIResponse<TGetTransaction[]>;
  };
}

export const DashboardSinglePayoutView: React.FC<Props> = ({
  payout,
  initialData,
}) => {
  const lineItems = [
    {
      label: "Services",
      value: payout.service,
    },
    {
      label: "Product",
      value: payout.product,
    },
    {
      label: "Disbursement Date",
      value: format(payout.toBeDisbursedOn, "dd MMM, yyyy p"),
    },
    {
      label: "Disbursement Amount",
      value: convertAmount(payout.disbursedAmount),
    },
    {
      label: "Charges Amount",
      value: convertAmount(payout.chargesAmount),
    },
  ];
  return (
    <View className="flex flex-col gap-6">
      <Card className="bg-accent flex flex-col gap-6">
        <CardHeader className="flex flex-row items-center justify-between border-b-2 border-gray-300">
          <View className="flex flex-col gap-1">
            <View
              className={cn(
                "w-fit h-5 rounded-full px-3 flex items-center justify-senter",
                payout.status === "paid" && "bg-green-500",
                payout.status === "pending" && "bg-orange-500",
                payout.status === "failed" && "bg-red-500"
              )}
            >
              <Text className="font-medium text-[12px] text-gray-100 capitalize">
                {payout.status}
              </Text>
            </View>
            <View className="flex items-center gap-2">
              <Text as="span" className="uppercase font-medium">
                Bank Details{" "}
              </Text>
              <Text as="span" className="font-bold">
                1466441536 - Iobotech Limited (Access Bank)
              </Text>
            </View>
          </View>
          <View className="flex items-center gap-3">
            <Button>Withdraw now</Button>
          </View>
        </CardHeader>
        <CardContent className="grid grid-cols-6">
          {lineItems.map((item, _i) => (
            <View key={_i} className="flex flex-col gap-2">
              <Text className="uppercase text-sm">{item.label}</Text>
              <Text className="font-semibold capitalize">{item.value}</Text>
            </View>
          ))}
          <View className="flex flex-col gap-2">
            <Text className="uppercase text-sm text-primary font-medium">
              Total Amount
            </Text>
            <Text className="font-semibold capitalize text-primary">
              {convertAmount(payout.totalAmount)}
            </Text>
          </View>
        </CardContent>
      </Card>
      <View className="pt-6">
        <PayoutsTable
          totalTransactions={payout.numberOfTransaction}
          initialData={initialData.payoutTransactions}
        />
      </View>
      {/* <Tabs defaultValue="all" className="w-full">
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
        </View>
      </Tabs> */}
    </View>
  );
};

// const TrxFilter: React.FC = () => {
//   return (
//     <Sheet>
//       <SheetTrigger className="w-fit" asChild>
//         <Button
//           leftComp={<Filter />}
//           variant="link"
//           className="font-semibold p-0"
//         >
//           Filter
//         </Button>
//       </SheetTrigger>
//       <SheetContent className="flex flex-col 2xl:min-w-[600px]">
//         <SheetHeader>
//           <SheetTitle>Filter</SheetTitle>
//         </SheetHeader>
//         <View className="flex-1 flex flex-col gap-10">
//           <View>
//             <View className="flex flex-col gap-1">
//               <Text className="text-primary font-semibold">Amount Section</Text>
//               <SheetDescription>
//                 Set the amount range to filter by amount of your choice
//               </SheetDescription>
//             </View>
//           </View>
//           <View>
//             <View className="flex flex-col gap-1">
//               <Text className="text-primary font-semibold">Date Section</Text>
//               <SheetDescription>
//                 Filter by date range or select a custom date of your choice
//               </SheetDescription>
//             </View>
//           </View>
//         </View>
//         <SheetFooter className="flex items-center">
//           <Button variant="dark" className="flex-1">
//             Reset Filter
//           </Button>
//           <Button className="flex-1">PROCEED</Button>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// };
