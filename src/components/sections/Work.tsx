"use client";

import { motion } from "framer-motion";
import { EXPERIENCE, EASE } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

export function Work() {
  return (
    <section
      id="experience"
      className="section-gap viewport-section relative"
      aria-label="Work Experience"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_12%_18%,rgba(255,59,48,0.05)_0%,transparent_60%)]" aria-hidden="true" />

      <div className="container-grid relative z-10 flex h-full min-h-0 flex-col py-5 lg:py-6">
        <motion.span
          className="label-caps shrink-0 text-xs text-accent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: EASE.outExpo }}
        >
          / 02
        </motion.span>

        <div className="mt-4 mb-5 flex shrink-0 flex-col gap-3 lg:mb-6 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="section-heading">
            <span className="section-heading-line">
              <span>WORK</span>
              <span className="text-accent">EXPERIENCE</span>
            </span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-secondary lg:text-right">
            Eight years driving measurable growth for B2B SaaS, technology, and
            e-commerce brands across India.
          </p>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:gap-5">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.id} delay={i * 0.08}>
              <motion.article
                className="experience-card group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: EASE.outExpo,
                }}
                data-cursor="hover"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-accent/40 text-[10px] font-semibold tracking-wider text-accent">
                    {job.id}
                  </span>
                  <span className="label-caps text-[10px] text-secondary">
                    {job.period}
                  </span>
                </div>

                <span className="label-caps mb-2 block text-[9px]">
                  {job.category}
                </span>

                <h3 className="heading-poster mb-1 text-xl text-primary transition-colors duration-300 group-hover:text-accent lg:text-2xl">
                  {job.company}
                </h3>

                <p className="mb-2 text-[10px] font-medium tracking-[0.12em] text-primary/75 uppercase">
                  {job.role}
                </p>

                <p className="mt-auto text-xs leading-relaxed text-secondary line-clamp-3">
                  {job.description}
                </p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
