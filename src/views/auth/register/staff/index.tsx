/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { TStaffSignup } from "@/types/auth";
import React from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { StaffSignup } from "@/app/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { APP_LINKS } from "@/contants/app-links";

const StaffRegistrationValidation: ZodType<TStaffSignup> = z.object({
  fullName: z.string({ message: "Invalid email address" }),
  email: z.string().email("Invalid email address"),
  password: z.string({ message: "Invalid email address" }).min(8),
  consented: z.boolean(),
});

const StaffRegistrationView: React.FC = () => {
  const { push } = useRouter();
  const { formState, register, watch, setValue, handleSubmit } =
    useForm<TStaffSignup>({
      resolver: zodResolver(StaffRegistrationValidation),
    });
  const { isSubmitting, isValid } = formState;

  const onSubmit = async (values: TStaffSignup) => {
    const { consented, ...signupData } = values;
    const { error, data } = await StaffSignup(signupData);
    if (error) {
      toast.error(error, {
        classNames: { toast: "bg-red-700 border-none text-gray-100" },
      });
      return;
    }
    push(
      `${APP_LINKS.STAFF_EMAIL_VERIFICATION}?email=${data?.email}&id=${data?.id}`
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-2">
          <Text className="font-semibold text-2xl text-gray-100">
            Sign up as a Staff
          </Text>
          <Text className="font-medium text-base text-gray-300">
            Create an account to get started{" "}
          </Text>
        </View>
        <View className="border border-gray-100 rounded-lg p-4 flex flex-col gap-6">
          <Input
            label="Fullname"
            placeholder="Enter password"
            containerClassName="bg-white"
            labelClassName="text-white"
            required
            {...register("fullName")}
          />
          <Input
            label="Email Address"
            placeholder="Enter password"
            containerClassName="bg-white"
            labelClassName="text-white"
            type="email"
            required
            {...register("email")}
          />
          <Input
            label="Create Password"
            placeholder="Enter password"
            containerClassName="bg-white"
            labelClassName="text-white"
            type="password"
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
            disabled={(!isValid && !watch().consented) || isSubmitting}
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
        <View className="flex items-center gap-2 justify-center">
          <Lock size={16} className="text-gray-300" />
          <Text className="text-[12px] text-gray-300">
            Your Info is safely secured
          </Text>
        </View>
      </View>
    </form>
  );
};

export { StaffRegistrationView };
