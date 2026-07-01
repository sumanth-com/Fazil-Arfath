"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import { useSplash } from "@/contexts/SplashContext";
import { useLenis } from "@/contexts/LenisContext";
import { getSectionIdFromPath } from "@/lib/routes";
import { resetHomeScroll, scrollToSectionWhenReady } from "@/lib/scroll";

function isClientRouteChange(previous: string | null, current: string) {
  return previous !== null && previous !== current;
}

function syncScrollToPath(
  pathname: string,
  lenis: Lenis | null,
  immediate: boolean
) {
  const sectionId = getSectionIdFromPath(pathname);

  if (sectionId === "hero") {
    resetHomeScroll(lenis);
    return;
  }

  scrollToSectionWhenReady(sectionId, lenis, { immediate });
}

export function SectionScroll() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { complete: splashComplete } = useSplash();
  const lastPath = useRef<string | null>(null);
  const lenisMounted = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const previous = history.scrollRestoration;
    history.scrollRestoration = "manual";

    return () => {
      history.scrollRestoration = previous;
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onPageShow = (event: PageTransitionEvent) => {
      syncScrollToPath(window.location.pathname, lenis, true);
      if (event.persisted) {
        window.setTimeout(
          () => syncScrollToPath(window.location.pathname, lenis, true),
          50
        );
      }
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [lenis]);

  const applyScroll = useCallback(
    (immediate: boolean) => {
      syncScrollToPath(pathname, lenis, immediate);
    },
    [pathname, lenis]
  );

  useEffect(() => {
    if (!splashComplete) return;

    const clientRouteChange = isClientRouteChange(lastPath.current, pathname);
    lastPath.current = pathname;
    const immediate = !clientRouteChange;

    applyScroll(immediate);

    const timers: number[] = [];

    if (immediate) {
      for (const ms of [50, 150, 350]) {
        timers.push(window.setTimeout(() => applyScroll(true), ms));
      }
    } else {
      timers.push(window.setTimeout(() => applyScroll(false), 120));
    }

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [pathname, splashComplete, applyScroll]);

  useEffect(() => {
    if (!splashComplete || !lenis || lenisMounted.current) return;

    lenisMounted.current = true;
    applyScroll(true);
  }, [lenis, splashComplete, applyScroll]);

  return null;
}
