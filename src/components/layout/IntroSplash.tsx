"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { EASE, SITE } from "@/lib/constants";
import { BRAND_LAYOUT_ID, SPLASH_LOAD_MS } from "@/lib/splash";
import { useSplash } from "@/contexts/SplashContext";

const brandSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 32,
  mass: 1,
};

export function IntroSplash() {
  const { complete } = useSplash();
  const progress = useMotionValue(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (complete) {
      const timer = window.setTimeout(() => setShow(false), 400);
      return () => window.clearTimeout(timer);
    }

    setShow(true);
  }, [complete]);

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
      transition={{ duration: 0.35, ease: EASE.outExpo, delay: complete ? 0.15 : 0 }}
      aria-hidden={complete}
    >
      <div className="splash-screen__bg" aria-hidden="true" />
      <div className="splash-screen__vignette" aria-hidden="true" />

      <div className="splash-screen__center">
        {!complete && (
          <motion.div
            className="splash-screen__brand-block"
            initial={{ opacity: 0, scale: 0.88, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.85, ease: EASE.outExpo }}
          >
            <motion.span
              layoutId={BRAND_LAYOUT_ID}
              className="logo-text splash-brand-hero"
              transition={{ layout: brandSpring }}
            >
              {SITE.name}
            </motion.span>
          </motion.div>
        )}

        <motion.div
          className="splash-screen__progress"
          initial={{ opacity: 0 }}
          animate={{ opacity: complete ? 0 : 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          aria-hidden="true"
        >
          <motion.span className="splash-screen__progress-fill" style={{ scaleX: progress }} />
        </motion.div>
      </div>

      <span className="sr-only">Loading portfolio for {SITE.person}</span>
    </motion.div>
  );
}
