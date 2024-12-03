"use server";
import { TGetMeterStore, TGetMeterStoreQuery } from "@/types/meter-store";
import { MakeApiCall } from "./make-api-call";

export const GetMeterStore = async (values: {
  startDate?: string;
  endDate?: string;
  serviceId?: string;
  productId?: string;
  payoutId?: string;
  amountFrom?: string;
  amountTo?: string;
  queryParams: TGetMeterStoreQuery;
}) => {
  const { queryParams, ...rest } = values;
  const queries = new URLSearchParams(Object.entries(queryParams));
  const url = `${process.env.BASE_URL}/merchant/community/meters?${queries}`;
  return MakeApiCall<TGetMeterStore[]>(url, "POST", rest, {
    cache: "no-store",
  });
};
