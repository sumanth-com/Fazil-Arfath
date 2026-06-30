"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { EASE, SITE } from "@/lib/constants";
import { BRAND_LAYOUT_ID, SPLASH_LOAD_MS } from "@/lib/splash";
import { useSplash } from "@/contexts/SplashContext";

const LETTERS = ["F", "A", "Z", "I", "L"] as const;

function SplashFazil({ progress }: { progress: number }) {
  return (
    <h1 className="logo-text splash-brand-title" aria-hidden="true">
      {LETTERS.map((char, i) => {
        const start = i * 0.13;
        const fill = Math.min(1, Math.max(0, (progress - start) / 0.24));
        const y = (1 - fill) * 36;
        const scale = 0.82 + fill * 0.18;
        const blur = (1 - fill) * 6;

        return (
          <span
            key={`${char}-${i}`}
            className="splash-brand-char"
            style={{
              opacity: 0.12 + fill * 0.88,
              transform: `translateY(${y}px) scale(${scale})`,
              filter: `blur(${blur}px)`,
            }}
          >
            {char}
          </span>
        );
      })}
    </h1>
  );
}

const brandSpring = {
  type: "spring" as const,
  stiffness: 320,
  damping: 36,
  mass: 0.9,
};

export function IntroSplash() {
  const { phase, complete } = useSplash();
  const progress = useMotionValue(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [show, setShow] = useState(false);

  const progressPercent = useTransform(progress, (v) => `${Math.round(v * 100)}%`);

  useMotionValueEvent(progress, "change", (v) => setLoadProgress(v));

  useEffect(() => {
    if (!complete) setShow(true);
  }, [complete]);

  useEffect(() => {
    if (!complete || !show) return;
    const timer = window.setTimeout(() => setShow(false), 650);
    return () => window.clearTimeout(timer);
  }, [complete, show]);

  useEffect(() => {
    if (complete) return;

    const controls = animate(progress, 1, {
      duration: SPLASH_LOAD_MS / 1000,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [complete, progress]);

  if (!show) return null;

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: complete ? 0 : 1 }}
      transition={{ duration: 0.45, ease: EASE.outExpo, delay: complete ? 0.28 : 0 }}
    >
      <div className="splash-screen__bg" />
      <div className="splash-screen__glow splash-screen__glow--left" />
      <div className="splash-screen__glow splash-screen__glow--right" />
      <div className="splash-screen__grain" />

      <div className="splash-screen__stage">
        <AnimatePresence mode="wait">
          {phase === "loading" && (
            <motion.div
              key="fazil"
              className="splash-screen__word"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
              transition={{ duration: 0.35, ease: EASE.outExpo }}
            >
              <SplashFazil progress={loadProgress} />
              <div className="splash-screen__loader-track" aria-hidden="true">
                <motion.span
                  className="splash-screen__loader-fill"
                  style={{ scaleX: progress }}
                />
              </div>
            </motion.div>
          )}

          {phase === "exit" && !complete && (
            <motion.span
              key="mr"
              layoutId={BRAND_LAYOUT_ID}
              className="logo-text splash-brand-hero"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                layout: brandSpring,
                opacity: { duration: 0.35, ease: EASE.outExpo },
                scale: { duration: 0.35, ease: EASE.outExpo },
              }}
            >
              {SITE.name}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <motion.p
        className="splash-screen__caption label-caps"
        animate={{ opacity: phase === "loading" ? 0.6 : 0 }}
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
