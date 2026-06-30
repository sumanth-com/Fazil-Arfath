"use client";

import { motion } from "framer-motion";
import { EXPERIENCE, EASE, SECTION_NUMBERS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Work() {
  return (
    <section
      id="experience"
      className="section-gap viewport-section relative"
      aria-labelledby="experience-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_12%_18%,rgba(255,59,48,0.05)_0%,transparent_60%)]" aria-hidden="true" />

      <div className="container-grid relative z-10 flex flex-col py-4 sm:py-5 lg:min-h-0 lg:h-full lg:py-6">
        <SectionLabel number={SECTION_NUMBERS.experience} />

        <div className="section-header section-header--split mb-5 shrink-0 lg:mb-6">
          <h2 id="experience-heading" className="section-heading">
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
                <div className="experience-card__head mb-2 flex items-baseline justify-between gap-3">
                  <h3 className="heading-poster min-w-0 text-left text-lg text-primary transition-colors duration-300 group-hover:text-accent sm:text-xl lg:text-2xl">
                    {job.company}
                  </h3>
                  <span className="label-caps shrink-0 text-[11px] text-secondary sm:text-xs">
                    {job.period}
                  </span>
                </div>

                <p className="mb-2 text-left text-xs font-medium tracking-[0.1em] text-primary/75 uppercase sm:tracking-[0.12em]">
                  {job.role}
                </p>

                <p className="text-left text-xs leading-relaxed text-secondary line-clamp-3">
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
