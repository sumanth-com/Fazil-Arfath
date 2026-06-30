"use client";

import { useId, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TopRibbon } from "@/components/layout/TopRibbon";
import { SITE, EASE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { PortraitImage } from "@/components/ui/PortraitImage";
import { TextReveal } from "@/components/ui/TextReveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const META = [
  { label: "Location", value: SITE.location, highlight: false },
  { label: "Status", value: SITE.status, highlight: true },
  { label: "Focus", value: SITE.focus, highlight: false },
] as const;

export function Hero() {
  const scrollArcId = useId().replace(/:/g, "");
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(heroRef, {
    once: reducedMotion,
    amount: 0.3,
  });
  const show = reducedMotion || isInView;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section section-gap relative"
      aria-label="Introduction"
    >
      <div className="relative z-20 shrink-0">
        <TopRibbon />
      </div>

      <div className="hero-body">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] via-bg to-[#060606]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_18%_48%,rgba(255,80,60,0.14)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_88%_25%,rgba(255,59,48,0.07)_0%,transparent_55%)]" />
        </div>

        <div className="container-grid relative z-10 h-full">
          <div className="grid h-full items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-14">
            <motion.div
              className="relative order-1 flex h-full min-h-0 items-center justify-center overflow-hidden"
              initial={false}
              animate={{ opacity: show ? 1 : 0 }}
              transition={{ duration: 1.2, delay: show ? 0.2 : 0, ease: EASE.outExpo }}
            >
              <PortraitImage
                src={IMAGES.portrait}
                alt={`${SITE.person}, ${SITE.roleTitle} in ${SITE.location}`}
                priority
                clean
                zoom
              />
            </motion.div>

            <div className="relative order-2 flex h-full min-h-0 flex-col justify-center py-3 lg:py-2 lg:pl-6 xl:pl-10">
              <div className="flex w-full max-w-2xl flex-col">
                <motion.p
                  className="label-caps mb-4 text-xs text-accent"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
                  transition={{ duration: 0.8, delay: show ? 0.3 : 0, ease: EASE.outExpo }}
                >
                  / {SITE.roleTitle}
                </motion.p>

                <h1 className="hero-display">
                  <span className="inline-flex flex-nowrap items-baseline gap-x-[0.35em] whitespace-nowrap">
                    <TextReveal inline delay={0.35}>
                      FAZIL
                    </TextReveal>
                    <TextReveal inline delay={0.5} className="text-stroke">
                      ARFATH
                    </TextReveal>
                  </span>
                </h1>

                <motion.p
                  className="mt-5 max-w-xl text-lg leading-relaxed text-primary/90 lg:text-xl"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
                  transition={{ duration: 0.9, delay: show ? 0.85 : 0, ease: EASE.outExpo }}
                >
                  {SITE.heroTagline}
                </motion.p>

                <motion.ul
                  className="mt-5 flex flex-wrap gap-2.5"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
                  transition={{ duration: 0.9, delay: show ? 1.05 : 0, ease: EASE.outExpo }}
                  aria-label="Key credentials"
                >
                  {SITE.heroHighlights.map((item) => (
                    <li
                      key={item}
                      className="border border-border px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] text-primary/85 uppercase"
                    >
                      {item}
                    </li>
                  ))}
                </motion.ul>

                <motion.dl
                  className="mt-6 space-y-4 border-t border-border pt-6"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 8 }}
                  transition={{ duration: 0.9, delay: show ? 1.25 : 0, ease: EASE.outExpo }}
                >
                  {META.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-[7rem_1fr] items-baseline gap-x-6"
                    >
                      <dt className="label-caps text-xs">{item.label}</dt>
                      <dd
                        className={`text-sm leading-snug font-medium tracking-[0.04em] uppercase ${
                          item.highlight ? "text-success" : "text-primary"
                        }`}
                      >
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </motion.dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.a
        href="#about"
        className="hero-scroll-explore group absolute right-[var(--spacing-container)] bottom-6 z-30 block text-primary/80 transition-colors hover:text-primary"
        initial={false}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : -8 }}
        transition={{ duration: 0.9, delay: show ? 1.6 : 0, ease: EASE.outExpo }}
        aria-label="Scroll to explore about section"
        data-cursor="hover"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 128 72"
            fill="none"
            className="h-[4.5rem] w-[8rem] transition-colors group-hover:text-accent"
            role="presentation"
          >
            <defs>
              <path
                id={scrollArcId}
                d="M 12 46 Q 64 4 116 46"
              />
            </defs>
            <text className="hero-scroll-explore__text">
              <textPath href={`#${scrollArcId}`} startOffset="50%" textAnchor="middle">
                SCROLL TO EXPLORE
              </textPath>
            </text>
            <path
              d="M64 48v14M56 56l8 8 8-8"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.a>
    </section>
  );
}
