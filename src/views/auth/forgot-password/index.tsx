"use client";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TForgotPassword } from "@/types/auth";
import React from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { APP_LINKS } from "@/contants/app-links";
import { ForgotPassword } from "@/app/services/auth";

const ForgotPasswordValidation: ZodType<TForgotPassword> = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordView: React.FC = () => {
  const { push } = useRouter();
  const { formState, register, handleSubmit } = useForm<TForgotPassword>({
    resolver: zodResolver(ForgotPasswordValidation),
  });
  const { isValid, isSubmitting } = formState;

  const onSubmit = async (values: TForgotPassword) => {
    const { error, data } = await ForgotPassword(values);
    if (error) {
      toast.error(error, {
        classNames: { toast: "bg-red-700 border-none text-gray-100" },
      });
      return;
    }
    push(
      `${APP_LINKS.FORGOT_PASS_EMAIL_VERIFICATION}?email=${data?.email}&id=${data?.id}`
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-2">
          <Text className="font-semibold text-2xl text-gray-100">
            Forgotten your Password?
          </Text>
          <Text className="font-medium text-base text-gray-300">
            Let’s help you reset your password with easy steps.
          </Text>
        </View>
        <View className="border border-gray-100 rounded-lg p-4 flex flex-col gap-6">
          <Input
            label="Email address"
            placeholder="Enter email address"
            containerClassName="bg-white"
            labelClassName="text-white"
            type="email"
            required
            {...register("email")}
          />
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

export { ForgotPasswordView };
