"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
} from "framer-motion";
import { EASE, SITE } from "@/lib/constants";
import { BRAND_LAYOUT_ID, SPLASH_LOAD_MS } from "@/lib/splash";
import { useSplash } from "@/contexts/SplashContext";

const BRAND_CHARS = SITE.name.split("");

const brandSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 32,
  mass: 1,
};

function SplashBrandLetters({ progress }: { progress: number }) {
  return (
    <>
      {BRAND_CHARS.map((char, i) => {
        if (char === " ") {
          return (
            <span key={`space-${i}`} className="splash-brand-space">
              {" "}
            </span>
          );
        }

        const start = i * 0.1;
        const fill = Math.min(1, Math.max(0, (progress - start) / 0.22));
        const y = (1 - fill) * 32;
        const scale = 0.84 + fill * 0.16;
        const blur = (1 - fill) * 5;

        return (
          <span
            key={`${char}-${i}`}
            className="splash-brand-char"
            style={{
              opacity: 0.1 + fill * 0.9,
              transform: `translateY(${y}px) scale(${scale})`,
              filter: `blur(${blur}px)`,
            }}
          >
            {char}
          </span>
        );
      })}
    </>
  );
}

export function IntroSplash() {
  const { complete } = useSplash();
  const progress = useMotionValue(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem("fazil-splash-seen") !== "1";
    } catch {
      return false;
    }
  });

  const progressPercent = useTransform(progress, (v) => `${Math.round(v * 100)}%`);

  useMotionValueEvent(progress, "change", (v) => setLoadProgress(v));

  useEffect(() => {
    if (!complete) setShow(true);
  }, [complete]);

  useEffect(() => {
    if (complete) return;

    const controls = animate(progress, 1, {
      duration: SPLASH_LOAD_MS / 1000,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [complete, progress]);

  useEffect(() => {
    if (!complete || !show) return;
    const timer = window.setTimeout(() => setShow(false), 400);
    return () => window.clearTimeout(timer);
  }, [complete, show]);

  if (!show) return null;

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: complete ? 0 : 1 }}
      transition={{ duration: 0.35, ease: EASE.outExpo, delay: complete ? 0.15 : 0 }}
      aria-hidden={complete}
    >
      <div className="splash-screen__bg" />
      <div className="splash-screen__glow splash-screen__glow--left" />
      <div className="splash-screen__glow splash-screen__glow--right" />
      <div className="splash-screen__grain" />

      <div className="splash-screen__stage">
        {!complete && (
          <motion.span
            layoutId={BRAND_LAYOUT_ID}
            className="logo-text splash-brand-hero"
            transition={{ layout: brandSpring }}
          >
            <SplashBrandLetters progress={loadProgress} />
          </motion.span>
        )}
      </div>

      <motion.p
        className="splash-screen__caption label-caps"
        animate={{ opacity: complete ? 0 : 0.6 }}
        transition={{ duration: 0.35 }}
      >
        Loading
        <motion.span className="splash-screen__caption-progress">
          {progressPercent}
        </motion.span>
      </motion.p>

      <span className="sr-only">Loading portfolio for {SITE.person}</span>
    </motion.div>
  );
}
