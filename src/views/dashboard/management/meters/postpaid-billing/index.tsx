"use client";
import { View } from "@/components/shared/view";
import {
  PostpaidBilling,
} from "./_components/all-meters-store";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetMeterStore } from "@/types/meter-store";
import { Button } from "@/components/ui/button";
import { History, NotebookTabs } from "lucide-react";

interface Props {
  initialData: {
    postpaidBills: IGetAPIResponse<TGetMeterStore[]>;
  };
}

export default function PostpaidBillingView({ initialData }: Props) {
  return (
    <View className="flex flex-col gap-6 w-full">
      {/* <MetricsBreakdown /> */}
      <View className="bg-white z-10 fixed w-[calc(100%-var(--sidebar-width))] right-0">
        <View className="w-[95%] mx-auto flex items-center justify-end">
          <View>
            <Button leftComp={<NotebookTabs />} variant="link" className="">
              Add
            </Button>
            {/* <TrxFilter /> */}
          </View>
        </View>
      </View>
      <View className="mt-16 mb-6 pt-4 w-full overflow-hidden">
        <PostpaidBilling initialData={initialData.postpaidBills} />
      </View>
    </View>
  );
}
