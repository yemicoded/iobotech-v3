"use client";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TVerifyEmail } from "@/types/auth";
import React from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { APP_LINKS } from "@/contants/app-links";
import { toast } from "sonner";
import { VerifyEmail } from "@/app/services/auth";

interface Props {
  header: React.ReactNode;
  callbackUrl: APP_LINKS;
}

const EmailVerificationValidation: ZodType<TVerifyEmail> = z.object({
  id: z.string(),
  otp: z.string().min(6),
});

const EmailVerificationView: React.FC<Props> = ({ header, callbackUrl }) => {
  const { push } = useRouter();
  const verificationId = useSearchParams().get("id") || "";
  const { formState, setValue, register, handleSubmit } = useForm<TVerifyEmail>(
    {
      resolver: zodResolver(EmailVerificationValidation),
    }
  );
  const { isValid, isSubmitting } = formState;

  const onSubmit = async (values: TVerifyEmail) => {
    const { error, data } = await VerifyEmail(values);
    if (error) {
      toast.error(error, {
        classNames: { toast: "bg-red-700 border-none text-gray-100" },
      });
      return;
    }
    toast.success("Email verified successfully!", {
      classNames: { toast: "bg-green-700 border-none text-gray-100" },
    });
    push(`${callbackUrl}?token=${data?.token}`);
  };

  React.useEffect(() => {
    setValue("id", verificationId);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <View className="flex flex-col gap-6">
        {header}
        <View className="border border-gray-100 rounded-lg p-4 flex flex-col gap-6">
          <Input
            label="OTP"
            placeholder="Enter OTP"
            containerClassName="bg-white"
            labelClassName="text-white"
            type="number"
            required
            {...register("otp")}
          />
          <View className="flex items-center gap-2">
            <Text className="text-white">Request a new OTP? </Text>
            <Button variant="link" className="p-0 text-gray-300 font-medium">
              Click here
            </Button>
          </View>
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

export { EmailVerificationView };
