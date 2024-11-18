"use client";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TResetPassword } from "@/types/auth";
import React from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { APP_LINKS } from "@/contants/app-links";
import { ResetPassword } from "@/app/services/auth";

const ResetPasswordValidation: ZodType<TResetPassword> = z
  .object({
    token: z.string(),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ResetPasswordView: React.FC = () => {
  const resetPassToken = useSearchParams().get("token") || "";
  const { push } = useRouter();
  const { formState, register, setValue, handleSubmit } =
    useForm<TResetPassword>({
      resolver: zodResolver(ResetPasswordValidation),
    });
  const { isSubmitting, isValid } = formState;

  const onSubmit = async (values: TResetPassword) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...data } = values;
    const { error } = await ResetPassword(data);
    if (error) {
      toast.error(error, {
        classNames: { toast: "bg-red-700 border-none text-gray-100" },
      });
      return;
    }
    toast.success("Password reset successfully!", {
      classNames: { toast: "bg-green-700 border-none text-gray-100" },
    });
    push(APP_LINKS.LOGIN);
  };

  React.useEffect(() => {
    setValue("token", resetPassToken);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-2">
          <Text className="font-semibold text-2xl text-gray-100">
            Create a New Password
          </Text>
          <Text className="font-medium text-base text-gray-300">
            Your email address has been confirmed. Create a new password.{" "}
          </Text>
        </View>
        <View className="border border-gray-100 rounded-lg p-4 flex flex-col gap-6">
          <Input
            label="Password"
            placeholder="Enter password"
            containerClassName="bg-white"
            labelClassName="text-white"
            type="password"
            required
            {...register("password")}
          />
          <Input
            label="Re-enter Password"
            placeholder="Re-enter Password"
            containerClassName="bg-white"
            labelClassName="text-white"
            type="password"
            required
            {...register("confirmPassword")}
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
          <Button
            type="submit"
            variant="outline"
            className="bg-transparent text-gray-100 hover:bg-transparent"
            disabled={!isValid || isSubmitting}
            isLoading={isSubmitting}
          >
            Submit
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

export { ResetPasswordView };
