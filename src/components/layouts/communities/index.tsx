"use client";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { APP_LINKS } from "@/contants/app-links";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

export const CommunitiesLayoutWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <View className="flex flex-col h-screen overflow-hidden">
      <View>
        <View className="w-[95%] mx-auto py-4 flex items-center justify-between">
          <View className="w-fit h-[50px]">
            <Image
              src="/images/logo-dark.svg"
              alt="auth-background"
              height={20}
              width={20}
              className="w-full h-full"
              priority
            />
          </View>
          <Button
            leftComp={<LogOut />}
            variant="link"
            className="text-destructive p-0 font-semibold"
            onClick={() => {
              signOut({ callbackUrl: APP_LINKS.LOGIN });
            }}
          >
            Logout
          </Button>
        </View>
      </View>
      <View className="w-[95%] mx-auto flex-1">{children}</View>
    </View>
  );
};
