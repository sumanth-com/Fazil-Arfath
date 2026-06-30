"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/constants";

interface CinematicNameProps {
  firstName: string;
  lastName: string;
  visible: boolean;
  className?: string;
}

function CinematicLetter({
  char,
  index,
  visible,
  stroke = false,
  baseDelay = 0,
}: {
  char: string;
  index: number;
  visible: boolean;
  stroke?: boolean;
  baseDelay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <motion.span
        className={cn("inline-block", stroke && "text-stroke")}
        initial={{
          y: "125%",
          opacity: 0,
          filter: "blur(14px)",
          scale: 0.88,
        }}
        animate={
          visible
            ? { y: 0, opacity: 1, filter: "blur(0px)", scale: 1 }
            : {
                y: "125%",
                opacity: 0,
                filter: "blur(14px)",
                scale: 0.88,
              }
        }
        transition={{
          duration: 1.05,
          delay: baseDelay + index * 0.055,
          ease: EASE.outExpo,
        }}
      >
        {char}
      </motion.span>
    </span>
  );
}

export function CinematicName({
  firstName,
  lastName,
  visible,
  className,
}: CinematicNameProps) {
  const lastDelay = firstName.length * 0.055 + 0.18;

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="inline-flex flex-nowrap items-baseline gap-x-[0.35em] whitespace-nowrap">
        <span aria-hidden="true">
          {firstName.split("").map((char, i) => (
            <CinematicLetter
              key={`first-${i}`}
              char={char}
              index={i}
              visible={visible}
              baseDelay={0.2}
            />
          ))}
        </span>
        <span aria-hidden="true">
          {lastName.split("").map((char, i) => (
            <CinematicLetter
              key={`last-${i}`}
              char={char}
              index={i}
              visible={visible}
              stroke
              baseDelay={lastDelay}
            />
          ))}
        </span>
      </span>
      <span className="sr-only">
        {firstName} {lastName}
      </span>
      <motion.span
        className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          visible
            ? { scaleX: 1, opacity: 1 }
            : { scaleX: 0, opacity: 0 }
        }
        transition={{
          duration: 1.1,
          delay: lastDelay + lastName.length * 0.055 + 0.1,
          ease: EASE.outExpo,
        }}
        aria-hidden="true"
      />
    </span>
  );
}
