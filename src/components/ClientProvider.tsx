"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Client Provider
 * 
 * Provides client-side contexts that need to be available throughout the app.
 * Note: ThemeProvider is now handled in the root layout with XalaThemeProvider integration.
 */
export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
