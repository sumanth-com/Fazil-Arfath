"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  inline?: boolean;
}

export function TextReveal({
  children,
  className,
  delay = 0,
  as: Tag = "span",
  inline = false,
}: TextRevealProps) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: reducedMotion,
    amount: 0.15,
  });

  const lines = children.split("\n");
  const blockClass = inline ? "inline-block align-baseline" : "block";
  const visible = reducedMotion || isInView;

  return (
    <Tag ref={ref} className={cn(blockClass, "overflow-hidden", className)}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={cn(blockClass, "overflow-hidden")}>
          <motion.span
            className={blockClass}
            initial={{ y: "110%", opacity: 0 }}
            animate={visible ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 1,
              delay: delay + lineIndex * 0.12,
              ease: EASE.outExpo,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
