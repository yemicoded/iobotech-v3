/* eslint-disable @typescript-eslint/no-explicit-any */
import { View } from "@/components/shared/view";
import React from "react";
import { useCommunity } from "@/store/use-community";
import { useQuery } from "react-query";
import { QueryKeys } from "@/contants/query-keys";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { useSearchParams } from "next/navigation";
import { TGetPayout } from "@/types/payout";
import { GetPayouts } from "@/app/services/payout";
import { PayoutsTable } from "./table";

interface Props {
  initialData: IGetAPIResponse<TGetPayout[]>;
}

export const AllPayouts: React.FC<Props> = ({ initialData }) => {
  const limit = useSearchParams().get("limit") || "10";
  const page = useSearchParams().get("page") || "1";
  const search = useSearchParams().get("search") || "";
  const { community } = useCommunity();
  const { data, isRefetching } = useQuery({
    queryKey: [QueryKeys(community).GET_ALL_PAYOUTS, page, search],
    queryFn: () =>
      GetPayouts({
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
      <PayoutsTable data={data} isLoading={isRefetching} />
    </View>
  );
};
