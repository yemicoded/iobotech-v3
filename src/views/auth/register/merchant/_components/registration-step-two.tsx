import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { APP_LINKS } from "@/contants/app-links";
import { TMerchantSignup } from "@/types/auth";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  prevStep: () => void;
}

export const RegistrationStepTwo: React.FC<Props> = ({ prevStep }) => {
  const { push } = useRouter();
  const { formState, register, watch, setValue } =
    useFormContext<TMerchantSignup>();
  const { isValid, isSubmitting } = formState;

  return (
    <React.Fragment>
      <View
        className="flex items-center gap-2 cursor-pointer"
        onClick={prevStep}
      >
        <ArrowLeft className="text-gray-100" size={18} />
        <Text className=" text-gray-100">Back</Text>
      </View>
      <Text className="underline text-gray-100 font-extrabold">
        Let’s get to know about you
      </Text>
      <View className="border border-gray-100 rounded-lg p-4 flex flex-col gap-6">
        <Input
          label="First Name"
          placeholder="Enter first name"
          containerClassName="bg-white"
          labelClassName="text-white"
          required
          {...register("firstName")}
        />
        <Input
          label="Last Name"
          placeholder="Enter last name"
          containerClassName="bg-white"
          labelClassName="text-white"
          required
          {...register("lastName")}
        />
        <Input
          label="Create a Password"
          placeholder="Enter password"
          containerClassName="bg-white"
          labelClassName="text-white"
          required
          {...register("password")}
        />
        {/* <View className="flex flex-col gap-4">
          <Checkbox
            text="Password Strength : Weak"
            textClassName="text-gray-100 text-[12px]"
            className="bg-white data-[state=checked]:bg-blue-500 rounded-full"
          />
          <Checkbox
            text="Cannot contain your name or email address"
            textClassName="text-gray-100 text-[12px]"
            className="bg-white data-[state=checked]:bg-blue-500 rounded-full"
          />
          <Checkbox
            text="At least 8 characters"
            textClassName="text-gray-100 text-[12px]"
            className="bg-white data-[state=checked]:bg-blue-500 rounded-full"
          />
          <Checkbox
            text="Contains a number or symbol"
            textClassName="text-gray-100 text-[12px]"
            className="bg-white data-[state=checked]:bg-blue-500 rounded-full"
          />
        </View> */}
        <Checkbox
          text="I agree to terms & conditions"
          textClassName="text-gray-100"
          className="bg-white data-[state=checked]:bg-blue-500"
          checked={watch().consented}
          onCheckedChange={(checked) => {
            setValue("consented", checked as boolean, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }}
        />
        <Button
          type="submit"
          variant="outline"
          className="bg-transparent text-gray-100 hover:bg-transparent"
          disabled={!isValid || !watch().consented || isSubmitting}
          isLoading={isSubmitting}
        >
          Create Account
        </Button>
        <View className="flex items-center">
          <span className="border border-gray-100 flex-1" />
          <Text className="bg-primary w-[80px] text-gray-400 text-center">
            Or
          </Text>
          <span className="border border-gray-100 flex-1" />
        </View>
        <Button
          type="button"
          variant="dark"
          disabled={isSubmitting}
          onClick={() => push(APP_LINKS.LOGIN)}
        >
          Login to existing account
        </Button>
      </View>
    </React.Fragment>
  );
};
