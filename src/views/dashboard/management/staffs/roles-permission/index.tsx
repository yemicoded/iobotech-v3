"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import React from "react";
import { View } from "@/components/shared/view";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetTransaction } from "@/types/transactions";
import { TGetCommunityService } from "@/types/misc";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { AllRoles } from "./_components/all-roles";
// import { AllStaffs } from "./_components/all-staffs";
// import { Active } from "../_components/active";

interface Props {
  initialData: {
    services: TGetCommunityService[];
    allTransactions: IGetAPIResponse<TGetTransaction[]>;
  };
}

export const RolesAndPermission: React.FC<Props> = ({ initialData }) => {
  console.log("Services", initialData.services);
  //   const tabTriggers = [
  //     {
  //       label: "All",
  //       value: "all",
  //     },
  //     {
  //       label: "Active",
  //       value: "active",
  //     },
  //     {
  //       label: "Inactive",
  //       value: "inactive",
  //     },
  //   ];
  return (
    <Tabs defaultValue="all" className="w-full">
      <View className="bg-white z-10 fixed w-[calc(100%-var(--sidebar-width))] right-0">
        <View className="w-[95%] mx-auto flex items-center justify-end">
          <View className="flex gap-6">
            <Link href="./staffs/add">
              <Button
                leftComp={<Plus />}
                variant="link"
                className="font-bold p-0"
              >
                Add
              </Button>
            </Link>
            {/* <ExportCSV />
            <FilterCustomers /> */}
          </View>
        </View>
      </View>
      {/* <View className="overflow-y-auto"> */}
      <View className="mt-16 mb-6 pt-4 w-full overflow-hidden">
        <TabsContent value="all" className="">
          <AllRoles initialData={initialData.allTransactions} />
        </TabsContent>
      </View>
    </Tabs>
  );
};
