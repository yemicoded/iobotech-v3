/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CustomTable } from "@/components/shared/custom-table";
import React from "react";
import { columns } from "./table-columns";
import { TGetTransaction } from "@/types/transactions";
import { IGetAPIResponse } from "@/types/api-response.interface";

interface Props {
  rightComp?: React.ReactNode;
  data?: IGetAPIResponse<TGetTransaction[]> | undefined;
  isLoading?: boolean;
}

export const MeterStoreTable: React.FC<Props> = ({
  rightComp,
  data,
  isLoading,
}) => {
  return (
    <CustomTable
      columns={columns}
      data={data?.data || []}
      header={{
        title: "Meter Store",
        searchable: true,
        rightComp,
      }}
      pagination={data?.pagination}
      isLoading={isLoading}
    />
  );
};
