"use client";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

interface Props {
  children: React.ReactNode;
}
const queryClient = new QueryClient();
const AppProvider: React.FC<Props> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools position="bottom-right" />
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default AppProvider;
