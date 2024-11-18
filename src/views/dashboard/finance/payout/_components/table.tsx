/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CustomTable } from "@/components/shared/custom-table";
import React from "react";
import { columns } from "./table-columns";
import { IGetAPIResponse } from "@/types/api-response.interface";
import { TGetPayout } from "@/types/payout";

interface Props {
  rightComp?: React.ReactNode;
  data?: IGetAPIResponse<TGetPayout[]> | undefined;
  isLoading?: boolean;
}

export const PayoutsTable: React.FC<Props> = ({
  rightComp,
  data,
  isLoading,
}) => {
  return (
    <CustomTable
      columns={columns}
      data={data?.data || []}
      header={{
        title: "Transactions",
        searchable: true,
        rightComp,
      }}
      pagination={data?.pagination}
      isLoading={isLoading}
    />
  );
};
