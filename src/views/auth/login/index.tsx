/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TLogin } from "@/types/auth";
import React from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { APP_LINKS } from "@/contants/app-links";
import { toast } from "sonner";

const LoginValidation: ZodType<TLogin> = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string({ message: "Password is required" }),
});

const LoginView: React.FC = () => {
  const { push } = useRouter();
  const { formState, register, handleSubmit } = useForm<TLogin>({
    resolver: zodResolver(LoginValidation),
  });
  const { isSubmitting, isValid } = formState;

  const onSubmit = async (values: TLogin) => {
    const { error } = (await signIn("credentials", {
      ...values,
      redirect: false,
    })) as SignInResponse;
    if (error) {
      toast.error(error, {
        classNames: { toast: "bg-red-700 border-none text-gray-100" },
      });
      return;
    }
    push(APP_LINKS.COMMUNITIES);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-2">
          <Text className="font-semibold text-2xl text-gray-100">
            Welcome back
          </Text>
          <Text className="font-medium text-base text-gray-300">
            Enter your email and password to login.
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
          <Input
            label="Password"
            placeholder="Enter password"
            containerClassName="bg-white"
            labelClassName="text-white"
            type="password"
            {...register("password")}
            required
          />
          <Button
            variant="link"
            className="text-white font-normal text-sm h-fit p-0 justify-end"
            onClick={() => push(APP_LINKS.FORGOT_PASSWORD)}
          >
            Forgot Password?
          </Button>
          {/* <Checkbox
            text="I agree to terms & conditions"
            checked={watch().consented}
            textClassName="text-gray-100 font-medium"
            className="bg-white data-[state=checked]:bg-blue-500"
            onCheckedChange={(checked) =>
              setValue("consented", checked as boolean, {
                shouldDirty: true,
                shouldValidate: true,
              })
            }
          /> */}
          <Button
            type="submit"
            variant="outline"
            className="bg-transparent text-gray-100 hover:bg-transparent"
            disabled={!isValid || isSubmitting}
            isLoading={isSubmitting}
          >
            Login
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
            onClick={() => push(APP_LINKS.SIGNUP_HOME)}
            disabled={isSubmitting}
          >
            Create an account
          </Button>
        </View>
      </View>
    </form>
  );
};

export { LoginView };
