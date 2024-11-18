export type TLogin = {
  email: string;
  password: string;
};

export type TForgotPassword = {
  email: string;
};

export type TVerifyEmail = {
  id: string;
  otp: string;
};

export type TResetPassword = {
  token: string;
  password: string;
  confirmPassword: string;
};

export type TStaffSignup = {
  fullName: string;
  email: string;
  password: string;
  consented: boolean;
};

export type TMerchantSignup = {
  businessName: string;
  email: string;
  // businessAddress: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
  consented: boolean;
};

export type TGetUserInfo = {
  fullName: string;
  email: string;
  phoneNumber: string;
  badge: string;
  profilePicture: string;
  isSuperAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type TStaffSignupResponseDTO = {
  id: string;
  email: string;
};

export type TMerchantSignupResponseDTO = {
  id: string;
  email: string;
};

export type TLoginResponseData = {
  token: string;
  expires: Date;
  refreshToken: string;
};

export type TVerifyEmailResponseDTO = {
  token: string;
};

export type TForgotPasswordResponseDTO = {
  id: string;
  email: string;
};
