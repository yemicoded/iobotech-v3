"use server";
import { cookies } from "next/headers";
import { MakeApiCallNoAPIKey } from "./make-api-call";
import { TCommunity, TGetCommunity } from "@/types/community";

export const GetCommunities = async () => {
  const url = `${process.env.BASE_URL}/merchant/community`;
  return MakeApiCallNoAPIKey<TGetCommunity>(url, "GET");
};

export const SetCommunity = async (community: TCommunity) => {
  const cookieStore = await cookies();
  cookieStore.set("community", JSON.stringify(community));
};

export const GetCookieCommunity = async () => {
  const cookieStore = await cookies();
  const organization = JSON.parse(
    cookieStore.get("community")?.value ?? "{}"
  ) as TCommunity;
  return organization;
};
