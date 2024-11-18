import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import Image from "next/image";
import React from "react";

export const CommunitiesNotFoundView: React.FC = () => {
  return (
    <View className="h-full flex items-center justify-center">
      <View className="flex flex-col gap-6 items-center">
        <View className="text-center flex flex-col gap-2">
          <Text className="font-bold text-3xl text-[#151D48]">
            Welcome to your dashboard!
          </Text>
          <Text className="text-gray-600 font-medium w-[500px]">
            You currently do not have access to any community. Please contact
            admin for assistance
          </Text>
        </View>
        <View className="w-[320px] h-[300px]">
          <Image
            src="/images/communities-not-found.png"
            alt="auth-background"
            height={2000}
            width={2000}
            className="w-full h-full"
            priority
          />
        </View>
      </View>
    </View>
  );
};
