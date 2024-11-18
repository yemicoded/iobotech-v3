import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import type { Metadata } from "next";
import Image from "next/image";
import AuthBG from "@/assets/images/auth-bg.svg";
import Logo from "@/assets/images/logo-white.svg";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "IOBOTECH",
  description: "welcome to iobotech",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={"Loading..."}>
      <main className="h-screen bg-primary overflow-hidden">
        <View className="w-[95%] mx-auto py-[20px] h-full flex">
          <View className="flex-1 px-12 pr-24 flex flex-col justify-between gap-10 h-full overflow-y-auto">
            <Image src={Logo} alt="auth-background" priority />
            <View className="flex-1">{children}</View>
            <Text className="text-gray-100">
              © 2024 Iobotech Limited. All Rights Reserved.
            </Text>
          </View>
          <View className="w-[900px] rounded-xl max-h-full overflow-hidden">
            <Image src={AuthBG} alt="auth-background" priority />
          </View>
        </View>
      </main>
    </Suspense>
  );
}
