"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const FULL_VIEW_SECTIONS = new Set(["#hero", "#about", "#experience", "#process"]);

function getChromeHeight() {
  const chrome = document.getElementById("site-chrome");
  return chrome?.offsetHeight ?? 72;
}

function getViewportSectionScrollY(target: HTMLElement) {
  const chrome = getChromeHeight();
  return Math.round(
    window.scrollY + target.getBoundingClientRect().top - chrome
  );
}

function scrollToViewportSection(target: HTMLElement, lenis: Lenis) {
  const scroll = () => {
    const y = getViewportSectionScrollY(target);

    lenis.scrollTo(y, {
      duration: 1.1,
      lock: true,
      onComplete: () => {
        const corrected = getViewportSectionScrollY(target);
        if (Math.abs(window.scrollY - corrected) > 2) {
          lenis.scrollTo(corrected, { immediate: true });
        }
      },
    });
  };

  requestAnimationFrame(() => requestAnimationFrame(scroll));
}

function scrollToHash(hash: string, lenis: Lenis | null) {
  if (!hash || hash === "#") return;
  const target = document.querySelector(hash) as HTMLElement | null;
  if (!target) return;

  if (FULL_VIEW_SECTIONS.has(hash)) {
    if (lenis) {
      scrollToViewportSection(target, lenis);
    } else {
      const y = getViewportSectionScrollY(target);
      window.scrollTo({ top: y, behavior: "auto" });
    }
    return;
  }

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -getChromeHeight(),
      duration: 1.1,
      lock: true,
    });
  } else {
    const y =
      window.scrollY + target.getBoundingClientRect().top - getChromeHeight();
    window.scrollTo({ top: y, behavior: "auto" });
  }
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    let lenis: Lenis | null = null;

    if (!reducedMotion) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      const rafId = requestAnimationFrame(function raf(time: number) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      });
    }

    const onAnchorClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement).closest("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      scrollToHash(href, lenis);
      history.pushState(null, "", href);
    };

    const onHashChange = () => {
      if (window.location.hash) {
        scrollToHash(window.location.hash, lenis);
      }
    };

    document.addEventListener("click", onAnchorClick);
    window.addEventListener("hashchange", onHashChange);

    if (window.location.hash) {
      window.setTimeout(() => scrollToHash(window.location.hash, lenis), 200);
    }

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("hashchange", onHashChange);
      lenis?.destroy();
    };
  }, [reducedMotion]);

  return <>{children}</>;
}
