import { TGetTransaction } from "@/types/transactions";
import {
  // CircleUserRound,
  // Copy,
  FileSpreadsheet,
  ReceiptText,
  UserRound,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { View } from "@/components/shared/view";
import { Text } from "@/components/shared/text";

export const PreviewCustomer: React.FC<{ transaction: TGetTransaction }> = ({
  // transaction,
}) => {
  //   const lineItems = [
  //     {
  //       label: "Service",
  //       value: transaction.service.name,
  //     },
  //     {
  //       label: "Product",
  //       value: transaction.product.name,
  //     },
  //     transaction.staffName
  //       ? {
  //           label: "Staff Name",
  //           value: transaction.staffName,
  //         }
  //       : {
  //           label: "Name",
  //           value: transaction.name,
  //         },
  //     transaction.isByPassRecharge
  //       ? {
  //           label: "Bypassed recharge",
  //           value: transaction.isByPassRecharge ? "Yes" : "No",
  //         }
  //       : null,
  //     {
  //       label: "Property unit",
  //       value: transaction.unit,
  //     },
  //     transaction.source
  //       ? {
  //           label: "Source",
  //           value: transaction.source,
  //         }
  //       : null,
  //     transaction.bills
  //       ? {
  //           label: "Bills",
  //           value: transaction.bills,
  //         }
  //       : null,
  //     transaction.remark
  //       ? {
  //           label: "Remark",
  //           value: transaction.remark,
  //         }
  //       : null,
  //     transaction.penaltyFee || transaction.data?.penaltyFee
  //       ? {
  //           label: "Penalty Fee",
  //           value: convertAmount(
  //             transaction.penaltyFee || transaction.data?.penaltyFee
  //           ),
  //         }
  //       : null,
  //     transaction.meterId
  //       ? {
  //           label: "Meter Number",
  //           value: transaction.meterId,
  //         }
  //       : null,
  //     transaction.data?.tariff
  //       ? {
  //           label: "Tariff",
  //           value: convertAmount(transaction.data.tariff),
  //         }
  //       : null,
  //     transaction.data?.unit
  //       ? {
  //           label: "Unit",
  //           value: transaction.data.unit,
  //         }
  //       : null,
  //   ];

  const customerDetails = [
    {
      label: "Full Name",
      value: "Benjamin Uwah",
    },
    {
      label: "Property Unit",
      value: "Flat A1, Essien Street",
    },
    {
      label: "Email",
      value: "uwah23@gmail.com",
    },
    {
      label: "Joined On",
      value: "September 12, 2024 4:19Pm",
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="link"
          leftComp={<FileSpreadsheet />}
          className="text-sm font-semibold text-gray-500"
        >
          VIEW
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h- flex-col 2xl:min-w-[600px]">
        <SheetHeader>
          <View className="flex gap-2">
            <Button
              leftComp={<ReceiptText />}
              size="icon"
              className="rounded-full"
            />
            <View>
              <SheetTitle>Preview Customers</SheetTitle>
              {/* <Text className="">
                Here’a a brief summary of your transaction.
              </Text> */}
            </View>
          </View>
        </SheetHeader>
        <View className="flex-1 flex flex-col gap-4 py-6">
          <View className="bg-primary rounded-full w-fit p-4">
            <UserRound size={50} className="text-gray-100" />
          </View>
          <View className="mt-10 space-y-4">
            {customerDetails.map((item, _i) => (
              <View
                key={_i}
                className="flex items-center justify-between text-sm border-b pb-4"
              >
                <Text className="flex-1 font-semibold ">
                  {item.label}:
                </Text>
                <Text className="flex-1 text-[#666666]">{item.value}</Text>
              </View>
            ))}
          </View>
          {/* {lineItems.filter(Boolean).map((item, _i) => (
            <View key={_i} className="flex items-center justify-between">
              <Text className="">{item?.label}</Text>
              <Text className="font-semibold capitalize">{item?.value}</Text>
            </View>
          ))} */}
        </View>

        <SheetFooter className="flex items-center">
          <View className="border-t pt-4">
            <Text className="text-sm text-black/30 text-center">
              Turning this off will prevent the customer from accessing any
              community features.
            </Text>
          </View>
          {/* <Button className="flex-1">PROCEED</Button> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
