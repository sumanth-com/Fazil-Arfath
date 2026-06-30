"use client";

import { SplashProvider } from "@/contexts/SplashContext";
import { IntroSplash } from "@/components/layout/IntroSplash";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SplashProvider>
      <IntroSplash />
      {children}
    </SplashProvider>
  );
}
