import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-providers";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppProvider } from "@/context/AppContext";
import { PaymentPlanProvider } from "@/context/PaymentPlanContext";
import { Toaster } from "@/components/ui/toaster";

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
  title: "Stripe Integration",
  description: "A simple Stripe integration example with Next.js",
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
              {children}
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster />
            </PaymentPlanProvider>
          </AppProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
