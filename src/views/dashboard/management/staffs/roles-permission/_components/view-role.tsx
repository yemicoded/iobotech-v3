import { TGetTransaction } from "@/types/transactions";
import {
  // CircleUserRound,
  // Copy,
  FileSpreadsheet,
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
import Permissions from "./permissions";

export const ViewRolePermission: React.FC<{ transaction: TGetTransaction }> = (
  {
    // transaction,
  }
) => {
  const staffDetails = [
    {
      label: "Created by",
      value: "Essien Ability",
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
      <SheetContent className="flex overflow-y-auto scrollbar-thin flex-col 2xl:min-w-[700px] lg:min-w-[500px]">
        <SheetHeader>
          <View className="flex gap-2">
            <View>
              <SheetTitle>Auditor</SheetTitle>
              {/* <Text className="">
                Here’a a brief summary of your transaction.
              </Text> */}
            </View>
          </View>
        </SheetHeader>
        <View className="flex-1 flex flex-col gap-4 py-6">
          <View className="mt-10 space-y-4">
            {staffDetails.map((item, _i) => (
              <View
                key={_i}
                className="flex items-center justify-between text-sm border-b pb-4"
              >
                <Text className="flex-1 font-semibold ">{item.label}:</Text>
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
          <View className="pt-6">
            <Text className="font-bold pb-4">Permissions</Text>
            <Permissions />
          </View>
        </View>

        <SheetFooter className="flex items-center">
          {/* <View className="border-t pt-4">
            <Text className="text-sm text-black/30 text-center">
              Turning this off will prevent the customer from accessing any
              community features.
            </Text>
          </View> */}
          {/* <Button className="flex-1">PROCEED</Button> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
