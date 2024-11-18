"use server";
import { TGetRevenueChartResponseDTO } from "@/types/revenue";
import { MakeApiCall } from "./make-api-call";

export const GetRevenueChart = async (values: {
  startDate: Date;
  endDate: Date;
  groupBy: "hour" | "day" | "month" | "year";
}) => {
  const { groupBy, ...rest } = values;
  const url = `${process.env.BASE_URL}/merchant/community/revenue/chart?groupBy=${groupBy}`;
  return MakeApiCall<TGetRevenueChartResponseDTO>(url, "POST", rest, {
    cache: "no-store",
  });
};
