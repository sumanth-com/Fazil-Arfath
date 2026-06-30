"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSplash } from "@/contexts/SplashContext";
import { useLenis } from "@/contexts/LenisContext";
import { getSectionIdFromPath } from "@/lib/routes";
import { scrollToSectionWhenReady } from "@/lib/scroll";

export function SectionScroll() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { complete: splashComplete } = useSplash();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";
    return () => {
      history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (!splashComplete) return;

    const sectionId = getSectionIdFromPath(pathname);
    const isClientNavigation =
      lastPath.current !== null && lastPath.current !== pathname;
    lastPath.current = pathname;

    const timer = window.setTimeout(() => {
      scrollToSectionWhenReady(sectionId, lenis, {
        immediate: !isClientNavigation,
      });
    }, isClientNavigation ? 80 : 150);

    return () => window.clearTimeout(timer);
  }, [pathname, splashComplete, lenis]);

  return null;
}
