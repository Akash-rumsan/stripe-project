import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-providers";
import HydrationZustand from "@/layouts/zustand-hydration";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProvider } from "@/context/AppContext";
import { PaymentPlanProvider } from "@/context/PaymentPlanContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Admin Portal",
  description: "AI Admin Portal designed and developed by Rumsan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(" min-h-screen", geistSans, geistMono)}>
        <QueryProvider>
          <AppProvider>
            <PaymentPlanProvider>
              <HydrationZustand>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
              </HydrationZustand>
            </PaymentPlanProvider>
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
