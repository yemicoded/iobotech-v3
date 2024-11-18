"use server";
import { MakeApiCall } from "./make-api-call";
import { TGetCommunityService } from "@/types/misc";

export const GetCommunityServices = async () => {
  const url = `${process.env.BASE_URL}/services`;
  return MakeApiCall<TGetCommunityService[]>(url, "GET");
};
