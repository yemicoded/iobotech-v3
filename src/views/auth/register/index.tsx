"use client";
import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { TLogin } from "@/types/auth";
import React from "react";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn, SignInResponse } from "next-auth/react";
import { CircleArrowRight, Lock } from "lucide-react";
// import StaffIcon from "/images/staff-icon.svg";
// import MerchantIcon from "/images/merchant-icon.svg";
// import JoinStaffBG from "/images/join-staff.svg";
import Image from "next/image";
import { APP_LINKS } from "@/contants/app-links";
import { useRouter } from "next/navigation";

const RegistrationValidation: ZodType<Pick<TLogin, "email">> = z.object({
  email: z.string().email("Invalid email address"),
});

const RegistrationView: React.FC = () => {
  const { push } = useRouter();
  const { handleSubmit } = useForm<Pick<TLogin, "email">>({
    resolver: zodResolver(RegistrationValidation),
  });

  const onSubmit = async (values: Pick<TLogin, "email">) => {
    const { error } = (await signIn("credentials", {
      ...values,
      redirect: false,
    })) as SignInResponse;
    if (error) {
      console.log("Error Occured", error);
      return;
    }
    // push("/organizations");
    console.log("Values", values);
  };

  const lineItems = [
    {
      label: "Join as a Staff",
      description:
        "This account is required to join an existing community as a staff member.",
      icon: "/images/staff-icon.svg",
      route: APP_LINKS.STAFF_SIGNUP,
    },
    {
      label: "Join as a Merchant",
      description:
        "Create this account if you’re a new merchant looking to establish your own community.",
      icon: "/images/merchant-icon.svg",
      route: APP_LINKS.MERCHANT_SIGNUP,
    },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <View className="flex flex-col gap-6">
        <View className="flex flex-col gap-2">
          <Text className="font-semibold text-2xl text-gray-100">
            Welcome to Iobotech Property Management Utility App.
          </Text>
          <Text className="font-medium text-base text-gray-300">
            Select the role that best describe you{" "}
          </Text>
        </View>
        <View className="flex flex-col gap-6">
          {lineItems.map((item) => (
            <View
              key={item.label}
              className="cursor-pointer flex items-center gap-6 p-6 border border-gray-100 rounded-md py-8"
              onClick={() => push(item.route)}
            >
              <View className="w-[60px] h-[60px]">
                <Image
                  src={item.icon}
                  alt="staff-icon"
                  className="w-full h-full"
                  width={2000}
                  height={2000}
                />
              </View>
              <View>
                <Text className="font-semibold text-2xl text-white">
                  {item.label}
                </Text>
                <Text className="text-sm text-gray-300">
                  {item.description}
                </Text>
              </View>
              <View>
                <CircleArrowRight className="text-gray-100" />
              </View>
            </View>
          ))}
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

export { RegistrationView };
