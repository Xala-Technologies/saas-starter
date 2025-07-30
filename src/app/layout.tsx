import React from "react";
import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { TRPCReactProvider } from "@/lib/trpc/react";
import { Metadata } from "next";
import ClientProvider from "@/components/ClientProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ThemeAwareToast } from "@/components/theme/ThemeAwareToast";
import { XalaThemeProvider } from "@/components/providers/XalaThemeProvider";

export const metadata: Metadata = {
  title: "",
  description: "",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" enableSystem>
          <XalaThemeProvider defaultTheme="enterprise" enableThemeSwitching={true}>
            <ClientProvider>
              <TRPCReactProvider>
                {children}
                <ThemeAwareToast />
              </TRPCReactProvider>
            </ClientProvider>
          </XalaThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
