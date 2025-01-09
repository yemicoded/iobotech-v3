import { TGetTransaction } from "@/types/transactions";
import {
  // CircleUserRound,
  // Copy,
  FileSpreadsheet,
  ReceiptText,
  SquarePen,
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
import Permissions from "./permissions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select } from "@/components/shared/select";

export const StaffDetails: React.FC<{ transaction: TGetTransaction }> = (
  {
    // transaction,
  }
) => {
  const staffDetails = [
    {
      label: "Full Name",
      value: "Benjamin Uwah",
    },
    {
      label: "Email",
      value: "uwah23@gmail.com",
    },
    {
      label: "Role",
      value: (
        <View className="w-full flex items-center justify-between">
          <Text>Auditor</Text>
          <Dialog>
            {/* Dialog Trigger */}
            <DialogTrigger asChild>
              <Button
                leftComp={<SquarePen />}
                variant={"ghost"}
                className="text-[#04048C] text-xs"
              >
                Change role
              </Button>
            </DialogTrigger>

            {/* Dialog Content */}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Role</DialogTitle>
                <DialogDescription>
                  Change role of Team Member
                </DialogDescription>
              </DialogHeader>

              <View className="mt-4">
                <View className="space-y-2">
                  <Text className="font-bold">Role</Text>
                  <Select
                    id="property-unit"
                    name="property-unit"
                    required
                    options={[
                      { label: "Unit 1", value: "unit-1" },
                      { label: "Unit 2", value: "unit-2" },
                      { label: "Unit 3", value: "unit-3" },
                    ]}
                    placeholder="Select Role"
                  />
                </View>{" "}
                {/* Add role selection logic here */}
              </View>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"ghost"} className="text-gray-600">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Confirm
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </View>
      ),
    },
    {
      label: "Added by",
      value: "Omoteso Vincent",
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
            <Button
              leftComp={<ReceiptText />}
              size="icon"
              className="rounded-full"
            />
            <View>
              <SheetTitle>Team Member Details</SheetTitle>
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
          <View className="pt-4">
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
