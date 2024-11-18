/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { TGetPayout, TGetPayoutQuery } from "@/types/payout";
import { MakeApiCall } from "./make-api-call";

export const GetPayouts = async (values: {
  startDate?: string;
  endDate?: string;
  serviceId?: string;
  productId?: string;
  // payoutId?: string;
  // amountFrom?: string;
  // amountTo?: string;
  queryParams: TGetPayoutQuery;
}) => {
  const { queryParams, ...rest } = values;
  const queries = new URLSearchParams(Object.entries(queryParams));
  const url = `${process.env.BASE_URL}/merchant/community/payout?${queries}`;

  return MakeApiCall<TGetPayout[]>(url, "POST", rest, {
    cache: "no-store",
  });
};

export const GetSinglePayout = async (id: string) => {
  const url = `${process.env.BASE_URL}/merchant/community/payout`;
  return MakeApiCall<TGetPayout[]>(
    url,
    "POST",
    { payoutId: id },
    {
      cache: "no-store",
    }
  );
};
