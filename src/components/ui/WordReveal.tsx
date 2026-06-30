"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface WordRevealProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
  delay?: number;
}

export function WordReveal({
  text,
  className,
  highlightWords = [],
  highlightClassName = "text-accent",
  delay = 0,
}: WordRevealProps) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: reducedMotion,
    margin: "-15%",
  });
  const words = text.split(" ");
  const visible = reducedMotion || isInView;

  return (
    <p
      ref={ref}
      className={cn("flex flex-wrap gap-x-[0.3em]", className)}
      data-cursor="text"
    >
      {words.map((word, i) => {
        const clean = word.replace(/[.,!?""]/g, "");
        const isHighlight = highlightWords.some(
          (hw) => clean.toLowerCase() === hw.toLowerCase()
        );
        const punctuation = word.slice(clean.length);

        return (
          <span key={i} className="inline-flex overflow-hidden">
            <motion.span
              className={cn("inline-block", isHighlight && highlightClassName)}
              initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
              animate={
                visible
                  ? { y: 0, opacity: 1, filter: "blur(0px)" }
                  : { y: "100%", opacity: 0, filter: "blur(8px)" }
              }
              transition={{
                duration: 0.8,
                delay: delay + i * 0.06,
                ease: EASE.outExpo,
              }}
            >
              {clean}
              {punctuation}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}
