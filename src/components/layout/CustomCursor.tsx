"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

type CursorState = "default" | "hover" | "text" | "hidden";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (reducedMotion || window.innerWidth < 768) return;

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
  }, [reducedMotion, cursorX, cursorY, visible]);

  if (reducedMotion) return null;

  const sizes = {
    default: 12,
    hover: 56,
    text: 80,
    hidden: 0,
  };

  const size = sizes[state];

  return (
    <>
      <motion.div
        className={cn(
          "pointer-events-none fixed top-0 left-0 z-[9999] hidden mix-blend-difference md:block",
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
      <style jsx global>{`
        @media (min-width: 768px) {
          body {
            cursor: none;
          }
          a,
          button {
            cursor: none;
          }
        }
      `}</style>
    </>
  );
}
