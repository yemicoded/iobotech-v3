import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TMerchantSignup } from "@/types/auth";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  nextStep: () => void;
}

export const RegistrationStepOne: React.FC<Props> = ({ nextStep }) => {
  const { register, watch } = useFormContext<TMerchantSignup>();
  return (
    <React.Fragment>
      <View className="flex flex-col gap-2">
        <Text className="font-semibold text-2xl text-gray-100">
          Sign up as a Merchant
        </Text>
        <Text className="font-medium text-base text-gray-300">
          Create an account to get started
        </Text>
      </View>
      <Text className="underline text-gray-100 font-extrabold">
        Let’s get to know about your business
      </Text>
      <View className="border border-gray-100 rounded-lg p-4 flex flex-col gap-6">
        <Input
          label="Business Name"
          placeholder="Enter business name"
          containerClassName="bg-white"
          labelClassName="text-white"
          required
          {...register("businessName")}
        />
        <Input
          label="Email Address"
          placeholder="Enter email address"
          containerClassName="bg-white"
          labelClassName="text-white"
          type="email"
          required
          {...register("email")}
        />
        {/* <Input
          label="Business Address"
          placeholder="Enter password"
          containerClassName="bg-white"
          labelClassName="text-white"
          type="email"
          required
          {...register("email")}
        /> */}
        <Input
          label="Phone Number"
          placeholder="Enter phone number"
          containerClassName="bg-white"
          labelClassName="text-white"
          type="tel"
          required
          {...register("phoneNumber")}
        />
        <Button
          type="submit"
          variant="outline"
          className="bg-transparent text-gray-100 hover:bg-transparent"
          onClick={nextStep}
          disabled={
            !watch().businessName ||
            !watch().email ||
            !watch().phoneNumber ||
            watch().phoneNumber.length < 10
          }
        >
          Proceed
        </Button>
        <View className="flex items-center">
          <span className="border border-gray-100 flex-1" />
          <Text className="bg-primary w-[80px] text-gray-400 text-center">
            Or
          </Text>
          <span className="border border-gray-100 flex-1" />
        </View>
        <Button type="button" variant="dark">
          Login to existing account
        </Button>
      </View>
    </React.Fragment>
  );
};
