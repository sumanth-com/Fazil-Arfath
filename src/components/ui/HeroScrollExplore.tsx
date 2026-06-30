"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ROUTES } from "@/lib/routes";

interface HeroScrollExploreProps {
  href?: string;
}

export function HeroScrollExplore({ href = ROUTES.about }: HeroScrollExploreProps) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const syncMenu = () => {
      setMenuOpen(document.body.classList.contains("menu-open"));
    };

    syncMenu();
    const observer = new MutationObserver(syncMenu);
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (!visible || menuOpen) return null;

  return (
    <Link
      href={href}
      aria-label="Scroll to explore about section"
      data-cursor="hover"
      className="fixed z-[90] flex h-10 w-10 min-h-10 min-w-10 items-center justify-center rounded-full border border-[#ff3b30]/50 bg-gradient-to-b from-[#1c1c1c] via-[#0a0a0a] to-[#140808] text-[#ff3b30] shadow-[0_8px_24px_rgba(0,0,0,0.55),0_0_20px_rgba(255,59,48,0.12)] transition-[border-color,box-shadow] duration-300 hover:border-[#ff3b30]/80 hover:shadow-[0_10px_28px_rgba(0,0,0,0.6),0_0_28px_rgba(255,59,48,0.22)] max-lg:bottom-[max(0.75rem,env(safe-area-inset-bottom))] max-lg:right-[max(0.75rem,env(safe-area-inset-right))] bottom-8 right-8"
      style={
        reducedMotion
          ? undefined
          : { animation: "hero-scroll-bob 2s ease-in-out infinite" }
      }
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 5v10M7.5 13.5 12 18l4.5-4.5"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}
