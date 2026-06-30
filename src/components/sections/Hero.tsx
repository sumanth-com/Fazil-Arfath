"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TopRibbon } from "@/components/layout/TopRibbon";
import { SITE, EASE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { PortraitImage } from "@/components/ui/PortraitImage";
import { CinematicName } from "@/components/ui/CinematicName";
import { HeroScrollExplore } from "@/components/ui/HeroScrollExplore";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const META = [
  { label: "Location", value: SITE.location, highlight: false },
  { label: "Status", value: SITE.status, highlight: true },
  { label: "Focus", value: SITE.focus, highlight: false },
] as const;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isInView = useInView(heroRef, {
    once: reducedMotion,
    amount: 0.28,
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

      <div className="hero-body relative">
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
              animate={{
                opacity: show ? 1 : 0,
                x: show ? 0 : -56,
                scale: show ? 1 : 1.1,
                filter: show ? "blur(0px)" : "blur(10px)",
              }}
              transition={{
                duration: 1.35,
                delay: show ? 0.1 : 0,
                ease: EASE.outExpo,
              }}
            >
              <motion.div
                className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,90,60,0.22)_0%,transparent_68%)] blur-2xl"
                initial={false}
                animate={{
                  opacity: show ? 1 : 0,
                  scale: show ? 1 : 0.85,
                }}
                transition={{
                  duration: 1.6,
                  delay: show ? 0.35 : 0,
                  ease: EASE.outExpo,
                }}
                aria-hidden="true"
              />
              <motion.div
                className="relative h-full w-full"
                initial={false}
                animate={{
                  y: show ? 0 : 24,
                  scale: show ? 1 : 1.06,
                }}
                transition={{
                  duration: 1.25,
                  delay: show ? 0.2 : 0,
                  ease: EASE.outExpo,
                }}
              >
                <PortraitImage
                  src={IMAGES.portrait}
                  alt={`${SITE.person}, ${SITE.roleTitle} in ${SITE.location}`}
                  priority
                  clean
                  zoom
                />
              </motion.div>
            </motion.div>

            <div className="relative order-2 flex h-full min-h-0 flex-col justify-center py-3 lg:py-2 lg:pl-6 xl:pl-10">
              <div className="flex w-full max-w-2xl flex-col">
                <motion.p
                  className="label-caps mb-4 text-xs text-accent"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
                  transition={{ duration: 0.8, delay: show ? 0.25 : 0, ease: EASE.outExpo }}
                >
                  / {SITE.roleTitle}
                </motion.p>

                <h1 className="hero-display relative">
                  <CinematicName
                    firstName="FAZIL"
                    lastName="ARFATH"
                    visible={show}
                  />
                </h1>

                <motion.p
                  className="mt-5 max-w-xl text-lg leading-relaxed text-primary/90 lg:text-xl"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14 }}
                  transition={{ duration: 0.9, delay: show ? 0.95 : 0, ease: EASE.outExpo }}
                >
                  {SITE.heroTagline}
                </motion.p>

                <motion.ul
                  className="mt-5 flex flex-wrap gap-2.5"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
                  transition={{ duration: 0.9, delay: show ? 1.15 : 0, ease: EASE.outExpo }}
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
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
                  transition={{ duration: 0.9, delay: show ? 1.35 : 0, ease: EASE.outExpo }}
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

      <HeroScrollExplore />
    </section>
  );
}
