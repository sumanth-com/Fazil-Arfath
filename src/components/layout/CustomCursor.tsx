"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type CursorState = "default" | "hover" | "text" | "hidden";

const DESKTOP_CURSOR_MIN = 1024;

const sizes = {
  default: 12,
  hover: 56,
  text: 80,
  hidden: 0,
} as const;

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (reducedMotion) return;

    const mq = window.matchMedia(`(min-width: ${DESKTOP_CURSOR_MIN}px)`);

    const syncEnabled = () => {
      const active = mq.matches;
      setEnabled(active);
      document.documentElement.classList.toggle("custom-cursor-active", active);
      if (!active) setVisible(false);
    };

    syncEnabled();
    mq.addEventListener("change", syncEnabled);

    return () => {
      mq.removeEventListener("change", syncEnabled);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='hover']")) setState("hover");
      else if (target.closest("[data-cursor='text']")) setState("text");
      else setState("default");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    document.body.addEventListener("mouseleave", onLeave);
    document.body.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.removeEventListener("mouseleave", onLeave);
      document.body.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, reducedMotion, cursorX, cursorY, visible]);

  if (reducedMotion || !enabled) return null;

  const size = sizes[state];

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[10001] mix-blend-difference",
        visible ? "opacity-100" : "opacity-0"
      )}
      style={{ x: springX, y: springY }}
      aria-hidden="true"
    >
      <motion.div
        className="rounded-full border border-white bg-white"
        animate={{
          width: size,
          height: size,
          x: -size / 2,
          y: -size / 2,
          opacity: state === "hidden" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />
    </motion.div>
  );
}
