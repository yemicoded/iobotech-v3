"use server";

import {
  TForgotPassword,
  TForgotPasswordResponseDTO,
  TGetUserInfo,
  TLogin,
  TLoginResponseData,
  TMerchantSignup,
  TMerchantSignupResponseDTO,
  TResetPassword,
  TStaffSignup,
  TStaffSignupResponseDTO,
  TVerifyEmail,
  TVerifyEmailResponseDTO,
} from "../../types/auth";
import { MakeApiCall, MakeDryApiCall } from "./make-api-call";

export const Login = async (values: TLogin) => {
  const url = `${process.env.BASE_URL}/staff/login`;
  return await MakeDryApiCall<TLoginResponseData>(url, "POST", values);
};

export const GetInfo = async () => {
  const url = `${process.env.BASE_URL}/staff`;
  return await MakeApiCall<TGetUserInfo>(url, "GET");
};

export const StaffSignup = async (values: Omit<TStaffSignup, "consented">) => {
  const url = `${process.env.BASE_URL}/staff/register`;
  console.log("DATA", values);
  return await MakeDryApiCall<TStaffSignupResponseDTO>(url, "POST", values);
};

export const MerchantSignup = async (
  values: Omit<TMerchantSignup, "consented">
) => {
  const url = `${process.env.BASE_URL}/merchant/register`;
  console.log("DATA", values);
  return await MakeDryApiCall<TMerchantSignupResponseDTO>(url, "POST", values);
};

export const VerifyEmail = async (values: TVerifyEmail) => {
  const url = `${process.env.BASE_URL}/otp/verify/${values.id}/${values.otp}`;
  return await MakeDryApiCall<TVerifyEmailResponseDTO>(url, "GET");
};

export const ForgotPassword = async (values: TForgotPassword) => {
  const url = `${process.env.BASE_URL}/staff/forgot-password?email=${values.email}`;
  console.log("VALUESSS", values);
  return await MakeDryApiCall<TForgotPasswordResponseDTO>(url, "GET");
};

export const ResetPassword = async (
  values: Omit<TResetPassword, "confirmPassword">
) => {
  const url = `${process.env.BASE_URL}/staff/reset-password`;
  return await MakeDryApiCall(url, "POST", values);
};
