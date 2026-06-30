"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EXPERIENCE, EASE, SECTION_NUMBERS } from "@/lib/constants";
import { COMPANY_LOGOS } from "@/lib/images";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Work() {
  return (
    <section
      id="experience"
      className="section-gap viewport-section relative"
      aria-label="Work Experience"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_35%_at_12%_18%,rgba(255,59,48,0.05)_0%,transparent_60%)]" aria-hidden="true" />

      <div className="container-grid relative z-10 flex flex-col py-4 sm:py-5 lg:min-h-0 lg:h-full lg:py-6">
        <SectionLabel number={SECTION_NUMBERS.experience} />

        <div className="section-header section-header--split mb-5 shrink-0 lg:mb-6">
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
                  <div className="experience-card__logo">
                    <Image
                      src={COMPANY_LOGOS[job.logoKey]}
                      alt={`${job.company} logo`}
                      width={36}
                      height={36}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="label-caps text-[11px] text-secondary sm:text-xs">
                    {job.period}
                  </span>
                </div>

                  <span className="label-caps mb-2 block text-[10px] sm:text-[11px]">
                  {job.category}
                </span>

                <h3 className="heading-poster mb-1 text-lg text-primary transition-colors duration-300 group-hover:text-accent sm:text-xl lg:text-2xl">
                  {job.company}
                </h3>

                <p className="mb-2 text-xs font-medium tracking-[0.1em] text-primary/75 uppercase sm:tracking-[0.12em]">
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
