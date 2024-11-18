"use server";
import { TGetCashflowAnalytics } from "@/types/revenue";
import { MakeApiCall } from "./make-api-call";

export const GetCashflowAnalytics = async (values: {
  startDate: string;
  endDate: string;
}) => {
  const queries = new URLSearchParams(Object.entries(values));
  const url = `${process.env.BASE_URL}/merchant/community/cashflow/analytics?${queries}`;
  return MakeApiCall<TGetCashflowAnalytics>(
    url,
    "POST",
    {},
    {
      cache: "no-store",
    }
  );
};
