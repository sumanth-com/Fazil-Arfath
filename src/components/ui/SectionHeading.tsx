"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/constants";

interface SectionHeadingProps {
  index?: string;
  title: string;
  accent?: string;
  description?: string;
  align?: "left" | "split";
  className?: string;
}

export function SectionHeading({
  index,
  title,
  accent,
  description,
  align = "split",
  className,
}: SectionHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  return (
    <div
      ref={ref}
      className={cn(
        align === "split"
          ? "grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-16"
          : "flex flex-col gap-6",
        className
      )}
    >
      <div>
        {index && (
          <motion.span
            className="mb-4 block text-sm text-accent"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.8, ease: EASE.outExpo }}
          >
            / {index}
          </motion.span>
        )}
        <h2 className="heading-poster text-[clamp(3rem,8vw,7rem)]">
          <motion.span
            className="block overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          >
            <motion.span
              className="block text-primary"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ duration: 1, ease: EASE.outExpo }}
            >
              {title}
            </motion.span>
          </motion.span>
          {accent && (
            <motion.span
              className="heading-serif block text-[clamp(3rem,8vw,7rem)] text-accent"
              initial={{ y: "100%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE.outExpo }}
            >
              {accent}
            </motion.span>
          )}
        </h2>
      </div>

      {description && (
        <motion.p
          className="max-w-sm text-sm leading-relaxed text-secondary lg:pt-4 lg:text-right"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, delay: 0.3, ease: EASE.outExpo }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
