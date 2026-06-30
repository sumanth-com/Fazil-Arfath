"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { LenisProvider } from "@/contexts/LenisContext";
import { getSectionIdFromPath, isHomePath } from "@/lib/routes";
import { resetHomeScroll, scrollToSectionWhenReady } from "@/lib/scroll";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) {
      setLenis(null);
      return;
    }

    const path = window.location.pathname;

    if (isHomePath(path)) {
      resetHomeScroll(null);
    }

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    if (isHomePath(path)) {
      instance.scrollTo(0, { immediate: true, force: true });
    } else {
      const sectionId = getSectionIdFromPath(path);
      const scrollToSection = () =>
        scrollToSectionWhenReady(sectionId, instance, { immediate: true });

      requestAnimationFrame(() => requestAnimationFrame(scrollToSection));
      window.setTimeout(scrollToSection, 100);
      window.setTimeout(scrollToSection, 300);
    }

    setLenis(instance);

    let rafId = 0;
    const raf = (time: number) => {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [reducedMotion]);

  return <LenisProvider value={lenis}>{children}</LenisProvider>;
}
