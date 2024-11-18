import { Text } from "@/components/shared/text";
import { View } from "@/components/shared/view";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectTrigger } from "@/components/ui/select";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Bell, ChevronDown, User } from "lucide-react";
import React from "react";

const DashboardHeader: React.FC<{
  pageTitle: string;
}> = ({ pageTitle }) => {
  const { state } = useSidebar();
  return (
    <View
      className={cn(
        "bg-white z-10 fixed top-0 2xl:right-0 w-full border-b-4 border-primary",
        state === "expanded" ? "w-[calc(100%-var(--sidebar-width))]" : "w-full"
      )}
    >
      <View className="w-[95%] mx-auto h-[80px] flex items-center justify-between">
        <Text className="text-[24px] font-semibold text-primary">
          {pageTitle}
        </Text>
        <View className="flex items-center gap-4">
          <View>
            <Button
              size="icon"
              className="h-12 w-12"
              leftComp={<Bell className="w-[30px] h-[30px]" />}
            />
          </View>
          <Select>
            <SelectTrigger
              asChild
              className="rounded-none focus:ring-0 border-0 p-0 h-fit gap-4 shadow-none"
            >
              <View className="flex items-center justify-between">
                <View className="flex flex-1 items-center gap-3">
                  <Button
                    size="icon"
                    className="h-12 w-12"
                    leftComp={<User className="w-[30px] h-[30px]" />}
                  />
                  <View className="flex flex-col items-start">
                    <Text className="text-primary text-lg font-semibold">
                      Iobotech
                    </Text>
                    <Text className="text-gray-500 text-sm font-medium">
                      Super Admin
                    </Text>
                  </View>
                </View>
                <ChevronDown className="text-primary mr-2" />
              </View>
            </SelectTrigger>
            <SelectContent
              side="bottom"
              className="top-0 min-w-[200px] max-w-[350px] p-2"
            >
              {/* <CommunityList closeSelect={() => setSelectOpen(false)} /> */}
            </SelectContent>
          </Select>
        </View>
      </View>
    </View>
  );
};

export default DashboardHeader;
