"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/constants";

interface SectionLabelProps {
  number: string;
  className?: string;
}

export function SectionLabel({ number, className }: SectionLabelProps) {
  return (
    <motion.span
      className={cn(
        "section-label label-caps block shrink-0 text-xs tracking-[0.28em] text-accent",
        className
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, ease: EASE.outExpo }}
    >
      / {number}
    </motion.span>
  );
}
