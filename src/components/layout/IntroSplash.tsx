"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  AnimatePresence,
} from "framer-motion";
import { EASE, SITE } from "@/lib/constants";
import { useSplash } from "@/contexts/SplashContext";

const LETTERS = ["F", "A", "Z", "I", "L"] as const;
const LOAD_MS = 3200;

function SplashLetters({ progress }: { progress: number }) {
  return (
    <span className="splash-letters" aria-hidden="true">
      {LETTERS.map((char, i) => {
        const start = i * 0.16;
        const fill = Math.min(1, Math.max(0, (progress - start) / 0.28));

        return (
          <span key={`${char}-${i}`} className="splash-letter">
            <span className="splash-letter__ghost">{char}</span>
            <span
              className="splash-letter__fill"
              style={{ clipPath: `inset(0 ${100 - fill * 100}% 0 0)` }}
            >
              {char}
            </span>
            <span
              className="splash-letter__bar"
              style={{
                transform: `scaleX(${fill})`,
                opacity: fill > 0.02 ? 1 : 0,
              }}
            />
          </span>
        );
      })}
    </span>
  );
}

export function IntroSplash() {
  const { phase, complete, brandAnchor } = useSplash();
  const progress = useMotionValue(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [show, setShow] = useState(false);
  const [showMr, setShowMr] = useState(false);
  const [flyTo, setFlyTo] = useState({ x: 0, y: 0, scale: 0.14 });
  const measured = useRef(false);

  const progressPercent = useTransform(progress, (v) => `${Math.round(v * 100)}%`);

  useMotionValueEvent(progress, "change", (v) => setLoadProgress(v));

  useEffect(() => {
    if (!complete) setShow(true);
  }, [complete]);

  useEffect(() => {
    if (!complete || !show) return;
    const timer = window.setTimeout(() => setShow(false), 580);
    return () => window.clearTimeout(timer);
  }, [complete, show]);

  useEffect(() => {
    if (phase !== "exit" || !brandAnchor || measured.current) return;

    const anchor = brandAnchor.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const targetX = anchor.left + anchor.width / 2;
    const targetY = anchor.top + anchor.height / 2;
    const splashWidth = Math.min(window.innerWidth * 0.82, 520);
    const scale = anchor.width / splashWidth;

    setFlyTo({
      x: targetX - centerX,
      y: targetY - centerY,
      scale: Math.max(scale, 0.11),
    });
    measured.current = true;

    const mrTimer = window.setTimeout(() => setShowMr(true), 520);
    return () => window.clearTimeout(mrTimer);
  }, [phase, brandAnchor]);

  useEffect(() => {
    if (complete) return;

    const controls = animate(progress, 1, {
      duration: LOAD_MS / 1000,
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
      transition={{ duration: 0.55, ease: EASE.outExpo }}
    >
          <div className="splash-screen__bg" />
          <div className="splash-screen__glow splash-screen__glow--left" />
          <div className="splash-screen__glow splash-screen__glow--right" />
          <div className="splash-screen__grain" />

          <motion.div
            className="splash-screen__brand"
            initial={false}
            animate={
              phase === "exit"
                ? { x: flyTo.x, y: flyTo.y, scale: flyTo.scale }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{ duration: 1.05, ease: EASE.outExpo }}
          >
            <AnimatePresence mode="wait">
              {!showMr ? (
                <motion.div
                  key="fazil"
                  className="splash-screen__word"
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.22 }}
                >
                  <SplashLetters progress={loadProgress} />
                  <div className="splash-screen__loader-track" aria-hidden="true">
                    <motion.span
                      className="splash-screen__loader-fill"
                      style={{ scaleX: progress }}
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.span
                  key="mr"
                  className="logo-text splash-screen__mr whitespace-nowrap text-lg md:text-xl"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: EASE.outExpo }}
                >
                  {SITE.name}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.p
            className="splash-screen__caption label-caps"
            animate={{ opacity: phase === "loading" ? 0.65 : 0 }}
            transition={{ duration: 0.45 }}
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
