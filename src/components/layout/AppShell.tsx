"use client";

import { LayoutGroup } from "framer-motion";
import { SplashProvider } from "@/contexts/SplashContext";
import { IntroSplash } from "@/components/layout/IntroSplash";
import { SectionScroll } from "@/components/layout/SectionScroll";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SplashProvider>
      <LayoutGroup id="site-brand">
        <SectionScroll />
        <IntroSplash />
        {children}
      </LayoutGroup>
    </SplashProvider>
  );
}
