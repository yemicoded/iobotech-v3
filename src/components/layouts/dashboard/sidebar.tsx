"use client";
import { View } from "@/components/shared/view";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import React from "react";
import { Text } from "@/components/shared/text";
import Link from "next/link";
import { FOOTER_MENU, SIDEBAR_MENU } from "@/contants/sidebar-menu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CommunitySwitch } from "./community-switch";
import { signOut } from "next-auth/react";
import { APP_LINKS } from "@/contants/app-links";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const DashboardSidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <Sidebar className="overflow-hidden">
      <View className="bg-primary flex flex-col gap-4 pt-4">
        <View className="w-fit h-[30px] px-4 ">
          <Image
            src="/images/logo-white.svg"
            alt="auth-background"
            height={20}
            width={20}
            className="w-full h-full"
            priority
          />
        </View>
        <CommunitySwitch
        // initialData={{ communities: initialData.communities }}
        />
      </View>
      <SidebarContent className="scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-primary bg-primary gap-0">
        {SIDEBAR_MENU.slice(0, 6).map((item, _i) => (
          <SidebarGroup key={_i} className="px-0 flex flex-col gap-1 pb-3">
            {item.label ? (
              <SidebarGroupLabel className="px-4 uppercase text-white text-sm font-semibold">
                {item.label}
              </SidebarGroupLabel>
            ) : null}
            <SidebarGroupContent>
              <SidebarMenu className="flex flex-col">
                {item.menus.map((menu, _i) => (
                  <View key={_i}>
                    <Accordion type="single" collapsible>
                      <SidebarMenuItem key={menu.title}>
                        {menu.menus?.length ? (
                          <AccordionItem
                            key={_i}
                            value={menu.title}
                            className="border-none"
                          >
                            <AccordionTrigger
                              className={cn(
                                "border-l-4 border-transparent rounded-none px-4 hover:bg-black/20 h-11 active:bg-black/20 flex items-center hover:no-underline",
                                pathname === menu.url &&
                                  pathname !== APP_LINKS.COMING_SOON &&
                                  "bg-black/20 border-gray-100"
                              )}
                            >
                              <View className="flex items-center gap-2 text-sm">
                                <menu.icon
                                  className="text-secondary text-sm"
                                  size={16}
                                />
                                <span className="font-medium text-gray-300">
                                  {menu.title}
                                </span>
                              </View>
                            </AccordionTrigger>
                            <AccordionContent className="pb-0 pl-6">
                              {menu.menus.map((sub_menu, _i) => (
                                <SidebarMenuButton
                                  key={_i}
                                  className={cn(
                                    "rounded-none px-5 h-11 active:underline active:bg-transparent hover:bg-transparent hover:underline",
                                    pathname === menu.url &&
                                      pathname !== APP_LINKS.COMING_SOON &&
                                      ""
                                  )}
                                  asChild
                                >
                                  <Link
                                    href={`${menu.url}`}
                                    className="hover:underline"
                                    prefetch
                                  >
                                    <menu.icon className="text-secondary" />
                                    <span className="font-medium text-gray-300">
                                      {sub_menu.title}
                                    </span>
                                  </Link>
                                </SidebarMenuButton>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <SidebarMenuButton
                            className={cn(
                              "border-l-4 border-transparent rounded-none px-4 hover:bg-black/20 h-11 active:bg-black/20",
                              pathname === menu.url &&
                                pathname !== APP_LINKS.COMING_SOON &&
                                "bg-black/20 border-gray-100"
                            )}
                            asChild
                          >
                            <Link href={`${menu.url}`} prefetch>
                              <menu.icon className="text-secondary" />
                              <span className="font-medium text-gray-300">
                                {menu.title}
                              </span>
                            </Link>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    </Accordion>
                  </View>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-0 bg-primary pb-3 border-t-2">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-0">
              {FOOTER_MENU.map((menu, _i) => (
                <View key={_i}>
                  <SidebarMenuItem key={menu.title}>
                    <SidebarMenuButton
                      className={cn(
                        "border-l-4 border-transparent rounded-none px-4 hover:bg-black/20 py-6 active:bg-black/20",
                        pathname === menu.url &&
                          pathname !== APP_LINKS.COMING_SOON &&
                          "bg-black/20 border-gray-100"
                      )}
                      asChild
                    >
                      <Link href={`${menu.url}`} prefetch>
                        <menu.icon className="text-secondary" />
                        <span className="font-medium text-gray-300">
                          {menu.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </View>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <View className="flex items-center justify-between px-4">
          <View
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: APP_LINKS.LOGIN })}
          >
            <Text className="text-red-700 text-sm font-bold">Log Out</Text>
          </View>
          <Text className="text-gray-500 text-[10px] font-bold">
            iobotech v3.0
          </Text>
        </View>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSidebar;
