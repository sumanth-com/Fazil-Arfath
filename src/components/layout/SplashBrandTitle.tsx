"use client";

import { motion } from "framer-motion";
import { EASE, SITE } from "@/lib/constants";
import { BRAND_LAYOUT_ID } from "@/lib/splash";

const brandSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 32,
  mass: 1,
};

const parts = [
  { text: "Mr.", className: "splash-brand-prefix" },
  { text: "Fazil", className: "splash-brand-name" },
] as const;

interface SplashBrandTitleProps {
  active: boolean;
}

export function SplashBrandTitle({ active }: SplashBrandTitleProps) {
  let charIndex = 0;

  return (
    <motion.span
      layoutId={BRAND_LAYOUT_ID}
      className="splash-brand-hero"
      transition={{ layout: brandSpring }}
    >
      <span className="splash-brand-hero__inner" aria-hidden="true">
        {parts.map((part) => (
          <span key={part.text} className={part.className}>
            {part.text.split("").map((char) => {
              const index = charIndex;
              charIndex += 1;

              return (
                <motion.span
                  key={`${part.text}-${index}`}
                  className="splash-brand-char inline-block"
                  initial={{
                    opacity: 0,
                    y: "120%",
                    scale: 0.55,
                    rotateZ: -8,
                    filter: "blur(14px)",
                  }}
                  animate={
                    active
                      ? {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          rotateZ: 0,
                          filter: "blur(0px)",
                        }
                      : {
                          opacity: 0,
                          y: "-30%",
                          scale: 0.9,
                          rotateZ: 4,
                          filter: "blur(8px)",
                        }
                  }
                  transition={{
                    duration: 0.82,
                    delay: active ? 0.12 + index * 0.055 : 0,
                    ease: EASE.outExpo,
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </span>

      <motion.span
        className="splash-brand-hero__shine"
        aria-hidden="true"
        initial={{ x: "-130%", opacity: 0 }}
        animate={
          active
            ? { x: "130%", opacity: [0, 0.85, 0] }
            : { x: "-130%", opacity: 0 }
        }
        transition={{
          duration: 1.1,
          delay: active ? 0.75 : 0,
          ease: EASE.outExpo,
        }}
      />

      <motion.span
        className="splash-brand-hero__underline"
        aria-hidden="true"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={active ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{
          duration: 0.9,
          delay: active ? 0.55 : 0,
          ease: EASE.outExpo,
        }}
      />

      <span className="sr-only">{SITE.name}</span>
    </motion.span>
  );
}
