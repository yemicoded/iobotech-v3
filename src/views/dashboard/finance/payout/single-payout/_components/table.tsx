/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CustomTable } from "@/components/shared/custom-table";
import React from "react";
import { TGetTransaction } from "@/types/transactions";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { Text } from "@/components/shared/text";
import { columns } from "./table-columns";
import { useParams, useSearchParams } from "next/navigation";
import { useCommunity } from "@/store/use-community";
import { useQuery } from "react-query";
import { QueryKeys } from "@/contants/query-keys";
import { GetTransactions } from "@/app/services/transaction";

interface Props {
  rightComp?: React.ReactNode;
  totalTransactions: number;
  initialData: IGetAPIResponse<TGetTransaction[]> | undefined;
}

export const PayoutsTable: React.FC<Props> = ({
  rightComp,
  totalTransactions,
  initialData,
}) => {
  const { id } = useParams();
  const limit = useSearchParams().get("limit") || "10";
  const page = useSearchParams().get("page") || "1";
  const search = useSearchParams().get("search") || "";
  const { community } = useCommunity();
  const { data, isRefetching } = useQuery({
    queryKey: [
      QueryKeys(community).GET_SINGLE_PAYOUT_TRANSACTIONS,
      id,
      page,
      search,
    ],
    queryFn: () =>
      GetTransactions({
        payoutId: id as string,
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
        title: <Text>Payout Transactions ({totalTransactions})</Text>,
        searchable: true,
        rightComp,
      }}
      pagination={data?.pagination}
      isLoading={isRefetching}
    />
  );
};
