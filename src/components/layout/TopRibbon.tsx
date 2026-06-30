"use client";

import { motion } from "framer-motion";
import { RIBBON_ITEMS } from "@/lib/constants";
export function TopRibbon() {
  const items = [...RIBBON_ITEMS, ...RIBBON_ITEMS];

  return (
    <div
      className="top-ribbon relative overflow-hidden bg-accent py-2.5"
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 32,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] text-white uppercase"
          >
            {item}
            <span className="h-1 w-1 shrink-0 rounded-full bg-white/70" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
