/* eslint-disable @typescript-eslint/no-explicit-any */
import { View } from "@/components/shared/view";
import React from "react";
import { StaffsTable } from "./table";
import { useCommunity } from "@/store/use-community";
import { useQuery } from "react-query";
import { QueryKeys } from "@/contants/query-keys";
import { GetTransactions } from "@/app/services/transaction";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetTransaction } from "@/types/transactions";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Download, Share, Share2 } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface Props {
  initialData: IGetAPIResponse<TGetTransaction[]>;
}

export const AllStaffs: React.FC<Props> = ({ initialData }) => {
  const limit = useSearchParams().get("limit") || "10";
  const page = useSearchParams().get("page") || "1";
  const search = useSearchParams().get("search") || "";
  const { community } = useCommunity();
  const { data, isRefetching } = useQuery({
    queryKey: [QueryKeys(community).GET_ALL_TRANSACTIONS, page, search],
    queryFn: () =>
      GetTransactions({
        queryParams: {
          page,
          limit,
          search,
        },
      }),
    initialData,
    refetchOnMount: false,
  });
  return (
    <View>
      <StaffsTable
        data={(data || { data: [] }) as IGetAPIResponse<TGetTransaction[]>}
        isLoading={isRefetching}
        rightComp={<ExportData />}
      />
    </View>
  );
};

const ExportData: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Button leftComp={<Share />} className="rounded-full" />
      </SheetTrigger>
      <SheetContent className="min-w-[500px]">
        <SheetHeader>
          <SheetTitle>Export Data</SheetTitle>
        </SheetHeader>
        <View className="flex flex-col gap-4 py-6">
          <Card className="hover:bg-gray-100 cursor-pointer">
            <CardContent className="py-4 flex items-center">
              <Button
                leftComp={<Share2 />}
                variant="link"
                className="px-0 h-fit"
              >
                <CardTitle>Share to self</CardTitle>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:bg-gray-100 cursor-pointer">
            <CardContent className="py-4 flex items-center">
              <Button
                leftComp={<Share2 />}
                variant="link"
                className="px-0 h-fit"
              >
                <CardTitle>Share with others</CardTitle>
              </Button>
            </CardContent>
          </Card>
          <Card className="hover:bg-gray-100 cursor-pointer">
            <CardContent className="py-4 flex items-center">
              <Button
                leftComp={<Download />}
                variant="link"
                className="px-0 h-fit"
              >
                <CardTitle>Download as CSV</CardTitle>
              </Button>
            </CardContent>
          </Card>
        </View>
        <SheetFooter>kd</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
