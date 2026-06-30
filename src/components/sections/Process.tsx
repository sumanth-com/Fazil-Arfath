"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PROCESS_STEPS, EASE, SECTION_NUMBERS } from "@/lib/constants";
import { ProcessIcon } from "@/components/ui/ProcessIcon";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/ui/SectionLabel";

const PUZZLE_VARIANTS = [
  "process-puzzle-card--a",
  "process-puzzle-card--b",
  "process-puzzle-card--c",
  "process-puzzle-card--d",
] as const;

const PUZZLE_KNOBS = [
  [
    { type: "out", pos: "right" },
    { type: "out", pos: "bottom" },
  ],
  [{ type: "in", pos: "left" }],
  [
    { type: "out", pos: "right" },
    { type: "in", pos: "top" },
  ],
  [
    { type: "in", pos: "top" },
    { type: "in", pos: "left" },
  ],
] as const;

/** Each card flies in from its screen corner */
const CORNER_ENTRANCE = [
  { x: "-52vw", y: "-38vh", rotate: -10 },
  { x: "52vw", y: "-38vh", rotate: 10 },
  { x: "-52vw", y: "38vh", rotate: 10 },
  { x: "52vw", y: "38vh", rotate: -10 },
] as const;

const CORNER_ENTRANCE_MOBILE = [
  { x: 0, y: -32, rotate: 0 },
  { x: 0, y: -24, rotate: 0 },
  { x: 0, y: 24, rotate: 0 },
  { x: 0, y: 32, rotate: 0 },
] as const;

function usePuzzleLayout() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export function Process() {
  const boardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isDesktop = usePuzzleLayout();
  const isInView = useInView(boardRef, {
    once: false,
    amount: 0.35,
    margin: "-8% 0px",
  });

  const assembled = reducedMotion || isInView;

  return (
    <section
      id="process"
      className="process-section section-gap viewport-section relative"
      aria-labelledby="process-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_88%_22%,rgba(255,59,48,0.05)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      <div className="container-grid relative z-10 flex flex-col py-4 sm:py-5 lg:min-h-0 lg:h-full lg:py-6">
        <SectionLabel number={SECTION_NUMBERS.process} />

        <div className="section-header section-header--split mb-5 shrink-0 lg:mb-6">
          <h2 id="process-heading" className="section-heading">
            <span className="section-heading-line">
              <span>MY</span>
              <span className="text-accent">PROCESS</span>
            </span>
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-secondary lg:text-right">
            A clear four-step framework for Google Ads, SEO, and performance
            marketing — built to turn data into leads, revenue, and scalable
            growth for B2B brands.
          </p>
        </div>

        <div
          ref={boardRef}
          className="process-puzzle-board relative flex min-h-0 flex-1 items-start justify-start lg:items-center lg:justify-center"
          data-assembled={assembled ? "true" : "false"}
        >
          <motion.div
            className="process-puzzle-seam process-puzzle-seam--h"
            aria-hidden="true"
            initial={false}
            animate={{
              scaleX: assembled ? 1 : 0,
              opacity: assembled ? 1 : 0,
            }}
            transition={{
              duration: 0.75,
              delay: assembled ? 0.55 : 0,
              ease: EASE.outExpo,
            }}
            style={{ transformOrigin: "center" }}
          />
          <motion.div
            className="process-puzzle-seam process-puzzle-seam--v"
            aria-hidden="true"
            initial={false}
            animate={{
              scaleY: assembled ? 1 : 0,
              opacity: assembled ? 1 : 0,
            }}
            transition={{
              duration: 0.75,
              delay: assembled ? 0.55 : 0,
              ease: EASE.outExpo,
            }}
            style={{ transformOrigin: "center" }}
          />

          <div className="process-puzzle-grid">
            {PROCESS_STEPS.map((step, i) => {
              const corner = isDesktop
                ? CORNER_ENTRANCE[i]
                : CORNER_ENTRANCE_MOBILE[i];
              const landDelay = i * 0.12;
              const exitDelay = (3 - i) * 0.05;

              return (
                <motion.article
                  key={step.number}
                  className={`process-puzzle-card ${PUZZLE_VARIANTS[i]} group`}
                  initial={false}
                  animate={
                    assembled
                      ? {
                          x: 0,
                          y: 0,
                          opacity: 1,
                          scale: 1,
                          rotate: 0,
                          filter: "blur(0px)",
                        }
                      : {
                          x: corner.x,
                          y: corner.y,
                          opacity: 0,
                          scale: 0.72,
                          rotate: corner.rotate,
                          filter: "blur(10px)",
                        }
                  }
                  transition={{
                    duration: assembled ? 1.15 : 0.75,
                    delay: assembled ? landDelay : exitDelay,
                    ease: EASE.outExpo,
                  }}
                  whileHover={assembled ? { y: -4 } : undefined}
                >
                  <span className="process-puzzle-card__watermark" aria-hidden="true">
                    {step.number}
                  </span>

                  <div className="process-puzzle-card__inner">
                    <div className="process-puzzle-card__head">
                      <div className="process-puzzle-card__icon" aria-hidden="true">
                        <ProcessIcon name={step.icon} className="h-[18px] w-[18px] lg:h-[18px] lg:w-[18px]" />
                      </div>
                      <h3 className="process-puzzle-card__title">{step.title}</h3>
                    </div>

                    <p className="process-puzzle-card__text">{step.description}</p>
                  </div>

                  {PUZZLE_KNOBS[i].map((knob, knobIndex) => (
                    <motion.span
                      key={knobIndex}
                      className={`process-puzzle-knob process-puzzle-knob--${knob.type} process-puzzle-knob--${knob.pos}`}
                      aria-hidden="true"
                      initial={false}
                      animate={{
                        opacity: assembled ? 1 : 0,
                        scale: assembled ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: assembled ? 0.65 + i * 0.08 : 0,
                        ease: EASE.outExpo,
                      }}
                    />
                  ))}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
