"use client";
import { View } from "@/components/shared/view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetCommunityService } from "@/types/misc";
import { TGetMeterStore } from "@/types/meter-store";
import { HistoryTable } from "./_components/table";

interface Props {
  initialData: {
    history: IGetAPIResponse<TGetMeterStore[]>;
  };
}

export default function BypassVendingHistoryView({ initialData }: Props) {
  return (
    <View className="flex flex-col py-6 gap-6 w-full">
      <View className="w-full overflow-hidden">
        <HistoryTable initialData={initialData.history} />
      </View>
    </View>
  );
}
