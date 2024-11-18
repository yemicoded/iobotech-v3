/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";
import { View } from "@/components/shared/view";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

interface Props {
  children: React.ReactNode;
  pageTitle: string;
}
const LazySidebar = React.lazy(() => import("./sidebar"));
const LazyHeader = React.lazy(() => import("./header"));

const DashboardLayoutWrapper: React.FC<Props> = ({ children, pageTitle }) => {
  // const { setCommunity } = useCommunity();

  // React.useEffect(() => {
  //   setCommunity(community);
  // }, []);

  return (
    <SidebarProvider className="w-full">
      <main className="w-full flex h-screen overflow-auto">
        <LazySidebar />
        <View className="flex-1 h-screen relative">
          <LazyHeader pageTitle={pageTitle} />
          <View className="mt-[84px] min-h-[calc(100vh-64px)] bg-white">
            <View className="w-[95%] flex mx-auto overflow-hidden">
              {children}
            </View>
          </View>
        </View>
      </main>
    </SidebarProvider>
  );
};

export default DashboardLayoutWrapper;
