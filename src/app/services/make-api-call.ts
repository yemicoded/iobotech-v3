/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { TCommunity } from "@/types/community";
import { IGetAPIResponse } from "../../types/api-response.interface";
import { cookies } from "next/headers";

export const MakeApiCall = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, any> | null | undefined,
  options?: Omit<RequestInit, "headers" | "body" | "method">
): Promise<Omit<IGetAPIResponse<T>, "access_token" | "refresh_token">> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("authToken")?.value;
    const community = JSON.parse(
      cookieStore.get("community")?.value || "{}"
    ) as TCommunity;

    console.log("ACCESS TOKEN", accessToken);

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
        "x-api-key": community.apikey,
      },
      body: JSON.stringify(body),
      method: method,
      ...options,
    });

    const { data, message, pagination, status, type } =
      (await res.json()) as IGetAPIResponse<T>;

    if (status && status >= 400) {
      throw new Error(message);
    }

    return {
      status,
      message,
      data,
      pagination,
      type,
    };
  } catch (error) {
    return {
      error: (error as any).message,
    };
  }
};

export const MakeApiCallNoAPIKey = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, any> | null | undefined,
  options?: Omit<RequestInit, "headers" | "body" | "method">
): Promise<Omit<IGetAPIResponse<T>, "access_token" | "refresh_token">> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("authToken")?.value;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
      method: method,
      ...options,
    });

    const { data, message, pagination, status, type } =
      (await res.json()) as IGetAPIResponse<T>;

    if (status && status >= 400) {
      throw new Error(message);
    }

    return {
      status,
      message,
      data,
      pagination,
      type,
    };
  } catch (error) {
    return {
      error: (error as any).message,
    };
  }
};

export const MakeDryApiCall = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, any> | null | undefined
): Promise<IGetAPIResponse<T>> => {
  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      method: method,
    });

    const { token, data, refreshToken, message, status } =
      (await res.json()) as IGetAPIResponse<T>;

    if (status && status >= 400) {
      throw new Error(message);
    }

    return {
      status,
      message,
      data,
      token,
      refreshToken,
    };
  } catch (error) {
    return {
      error: (error as any).message,
    };
  }
};
