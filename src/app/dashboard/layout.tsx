import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { redirect } from "next/navigation";
import { APP_LINKS } from "@/contants/app-links";
import { GetInfo } from "../services/auth";
import { signOut } from "next-auth/react";
// import DashboardLayoutWrapper from "@/components/layouts/dashboard";

export const metadata: Metadata = {
  title: "IOBOTECH",
  description: "welcome to iobotech",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(APP_LINKS.LOGIN);
  }
  const { error } = await GetInfo();
  if (error) {
    await signOut({
      callbackUrl: APP_LINKS.LOGIN,
    });
  }
  return children;
}
