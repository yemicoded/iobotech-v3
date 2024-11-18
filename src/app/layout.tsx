import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/app-provider";

// const lato = Lato({
//   subsets: ["latin"],
//   style: ["normal", "italic"],
//   weight: ["400", "700", "900"],
//   variable: "--font-lato",
// });

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IOBOTECH",
  description: "welcome to iobotech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
