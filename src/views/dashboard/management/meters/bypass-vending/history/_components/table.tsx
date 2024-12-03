/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CustomTable } from "@/components/shared/custom-table";
import React from "react";
import { columns } from "./table-columns";
import { TGetTransaction } from "@/types/transactions";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { GetMeterStore } from "@/app/services/meter-store";
import { QueryKeys } from "@/contants/query-keys";
import { useQuery } from "react-query";
import { useCommunity } from "@/store/use-community";
import { useSearchParams } from "next/navigation";

interface Props {
  initialData: IGetAPIResponse<TGetTransaction[]> | undefined;
}

export const HistoryTable: React.FC<Props> = ({ initialData }) => {
  const { community } = useCommunity();
  const limit = useSearchParams().get("limit") || "10";
  const page = useSearchParams().get("page") || "1";
  const search = useSearchParams().get("search") || "";
  const { data, isRefetching } = useQuery({
    queryKey: [QueryKeys(community).GET_ALL_TRANSACTIONS, page, search],
    queryFn: () =>
      GetMeterStore({
        productId: "",
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
    <CustomTable
      columns={columns}
      data={data?.data || []}
      header={{
        title: "History",
        searchable: false,
      }}
      pagination={data?.pagination}
    />
  );
};
