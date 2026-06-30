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
      className="hero-section section-gap relative max-lg:!mb-0"
      aria-label="Introduction"
    >
      <div className="relative z-20 hidden shrink-0 lg:block">
        <TopRibbon />
      </div>

      <div className="hero-body relative">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0c0c0c] via-bg to-[#060606]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_18%_48%,rgba(255,80,60,0.14)_0%,transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_88%_25%,rgba(255,59,48,0.07)_0%,transparent_55%)]" />
          </div>
          <div className="hero-mobile-bg absolute inset-0 lg:hidden">
            <span className="hero-mobile-bg__glow" aria-hidden="true" />
          </div>
        </div>

        <div className="container-grid relative z-10 h-full">
          <div className="hero-mobile-stack grid h-full min-h-0 items-stretch gap-0 pt-0 sm:gap-6 sm:pt-4 lg:grid-cols-2 lg:items-center lg:gap-12 lg:pt-0 xl:gap-14">
            <motion.div
              className="hero-portrait-col relative order-1 flex w-full items-center justify-center overflow-hidden lg:mt-0 lg:h-full lg:overflow-hidden"
              initial={false}
              animate={{
                opacity: show ? 1 : 0,
                x: 0,
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
                className="pointer-events-none absolute inset-[8%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,90,60,0.22)_0%,transparent_68%)] blur-2xl max-lg:opacity-40"
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
                className="hero-portrait-wrap relative w-full lg:h-full"
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
                  className="hero-portrait-media"
                />
              </motion.div>
            </motion.div>

            <div className="hero-copy relative order-2 flex min-h-0 flex-col justify-start pb-1 pt-0 text-center sm:pb-6 sm:pt-2 lg:h-full lg:justify-center lg:py-2 lg:pb-0 lg:pl-6 lg:pt-0 lg:text-left xl:pl-10">
              <div className="flex w-full max-w-2xl flex-col items-center lg:items-start">
                <motion.p
                  className="label-caps mb-1.5 text-[0.65rem] text-primary sm:mb-4 sm:text-xs"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
                  transition={{ duration: 0.8, delay: show ? 0.25 : 0, ease: EASE.outExpo }}
                >
                  / {SITE.roleTitle}
                </motion.p>

                <h1 className="hero-display relative flex w-full justify-center lg:justify-start">
                  <CinematicName
                    firstName="FAZIL"
                    lastName="ARFATH"
                    visible={show}
                  />
                </h1>

                <motion.div
                  className="hero-quote mx-auto mt-2.5 sm:mt-5 lg:mx-0"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 14 }}
                  transition={{ duration: 0.9, delay: show ? 0.95 : 0, ease: EASE.outExpo }}
                >
                  {SITE.heroQuote.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </motion.div>

                <motion.ul
                  className="hero-highlights mt-3 w-full sm:mt-5 lg:max-w-none"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
                  transition={{ duration: 0.9, delay: show ? 1.15 : 0, ease: EASE.outExpo }}
                  aria-label="Key credentials"
                >
                  {SITE.heroHighlights.map((item) => (
                    <li key={item} className="hero-highlight-chip">
                      {item}
                    </li>
                  ))}
                </motion.ul>

                <motion.dl
                  className="mt-5 hidden space-y-3 border-t border-border pt-5 sm:mt-6 sm:space-y-4 sm:pt-6 lg:block"
                  initial={false}
                  animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
                  transition={{ duration: 0.9, delay: show ? 1.35 : 0, ease: EASE.outExpo }}
                >
                  {META.map((item) => (
                    <div
                      key={item.label}
                      className="grid grid-cols-1 gap-1 sm:grid-cols-[5.5rem_1fr] sm:items-baseline sm:gap-x-4"
                    >
                      <dt className="label-caps text-xs">{item.label}</dt>
                      <dd
                        className={`text-xs leading-snug font-medium tracking-[0.03em] uppercase sm:text-sm sm:tracking-[0.04em] ${
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
