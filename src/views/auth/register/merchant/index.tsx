"use client";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { TMerchantSignup } from "@/types/auth";
import React from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Lock } from "lucide-react";
import { RegistrationStepOne } from "./_components/registration-step-one";
import { RegistrationStepTwo } from "./_components/registration-step-two";
import { MerchantSignup } from "@/app/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { APP_LINKS } from "@/contants/app-links";

const MerchantRegistrationValidation: ZodType<TMerchantSignup> = z.object({
  businessName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z
    .string()
    .min(10)
    .max(11, { message: "Phone number is required" }),
  password: z.string().min(8),
  consented: z.boolean(),
});

const MerchantRegistrationView: React.FC = () => {
  const { push } = useRouter();
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const formMethods = useForm<TMerchantSignup>({
    resolver: zodResolver(MerchantRegistrationValidation),
  });

  const nextStep = () => setCurrentStep((step) => step + 1);
  const prevStep = () => setCurrentStep((step) => step - 1);

  const onSubmit = async (values: TMerchantSignup) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { consented, ...signupData } = values;
    const { error, data } = await MerchantSignup(signupData);
    console.log("data", data);
    if (error) {
      toast.error(error, {
        classNames: { toast: "bg-red-700 border-none text-gray-100" },
      });
      return;
    }
    push(
      `${APP_LINKS.MERCHANT_EMAIL_VERIFICATION}?email=${data?.email}&id=${data?.id}`
    );
  };
  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <View className="flex flex-col gap-6">
          {currentStep === 1 && <RegistrationStepOne nextStep={nextStep} />}
          {currentStep === 2 && <RegistrationStepTwo prevStep={prevStep} />}
          <View className="flex items-center gap-2 justify-center">
            <Lock size={16} className="text-gray-300" />
            <Text className="text-[12px] text-gray-300">
              Your Info is safely secured
            </Text>
          </View>
        </View>
      </form>
    </FormProvider>
  );
};

export { MerchantRegistrationView };
