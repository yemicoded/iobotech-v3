"use client";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
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
      <NextTopLoader
        color="#009900"
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        crawlSpeed={200}
        height={3}
        template='<div class="bar" role="bar"><div class="peg"></div></div> 
        <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
        zIndex={1600}
      />
      <ReactQueryDevtools position="bottom-right" />
      <Toaster />
      {children}
    </QueryClientProvider>
  );
};

export default AppProvider;
