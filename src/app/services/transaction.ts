"use server";
import { MakeApiCall } from "./make-api-call";
import { TGetTransaction, TGetTransactionQuery } from "@/types/transactions";

export const GetTransactions = async (values: {
  startDate?: string;
  endDate?: string;
  serviceId?: string;
  productId?: string;
  payoutId?: string;
  amountFrom?: string;
  amountTo?: string;
  queryParams: TGetTransactionQuery;
}) => {
  const { queryParams, ...rest } = values;
  const queries = new URLSearchParams(Object.entries(queryParams));
  const url = `${process.env.BASE_URL}/merchant/community/transactions?${queries}`;
  return MakeApiCall<TGetTransaction[]>(url, "POST", rest, {
    cache: "no-store",
  });
};
