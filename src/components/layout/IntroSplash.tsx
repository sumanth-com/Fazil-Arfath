"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { EASE } from "@/lib/constants";
import { SPLASH_LOAD_MS } from "@/lib/splash";
import { useSplash } from "@/contexts/SplashContext";
import { SplashBrandTitle } from "@/components/layout/SplashBrandTitle";

export function IntroSplash() {
  const { complete } = useSplash();
  const progress = useMotionValue(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!complete) return;

    const timer = window.setTimeout(() => setVisible(false), 520);
    return () => window.clearTimeout(timer);
  }, [complete]);

  useEffect(() => {
    if (complete) return;

    const controls = animate(progress, 1, {
      duration: SPLASH_LOAD_MS / 1000,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [complete, progress]);

  if (!visible) return null;

  return (
    <motion.div
      className="splash-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: complete ? 0 : 1 }}
      transition={{ duration: 0.45, ease: EASE.outExpo, delay: complete ? 0.12 : 0 }}
      aria-hidden={complete}
      aria-live="polite"
    >
      <div className="splash-screen__bg" aria-hidden="true">
        <span className="splash-orb splash-orb--one" />
        <span className="splash-orb splash-orb--two" />
        <span className="splash-orb splash-orb--three" />
        <span className="splash-beam" />
        <span className="splash-grid" />
        <span className="splash-grain" />
      </div>

      <div className="splash-screen__vignette" aria-hidden="true" />

      <div className="splash-screen__center">
        {!complete && (
          <motion.div
            className="splash-screen__brand-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: EASE.outExpo }}
          >
            <SplashBrandTitle active />
          </motion.div>
        )}

        <motion.div
          className="splash-screen__progress"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: complete ? 0 : 1, y: complete ? 8 : 0 }}
          transition={{ duration: 0.45, delay: complete ? 0 : 0.25 }}
          aria-hidden="true"
        >
          <motion.span className="splash-screen__progress-fill" style={{ scaleX: progress }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
