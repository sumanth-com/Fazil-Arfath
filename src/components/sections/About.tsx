"use client";

import { motion } from "framer-motion";
import { SITE, STATS, TOOLS, EASE, SECTION_NUMBERS } from "@/lib/constants";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { StatIcon } from "@/components/ui/StatIcon";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function About() {
  return (
    <section
      id="about"
      className="section-gap viewport-section relative"
      aria-labelledby="about-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(255,59,48,0.05)_0%,transparent_60%)]" aria-hidden="true" />

      <div className="container-grid relative z-10 flex flex-col py-4 sm:py-5 lg:min-h-0 lg:h-full lg:py-6">
        <SectionLabel number={SECTION_NUMBERS.about} />

        <h2 id="about-heading" className="section-heading section-header mb-4 shrink-0 sm:mb-6 lg:mb-8">
          <span className="section-heading-line">
            <span>{SITE.aboutHeading}</span>
            <span className="text-accent">{SITE.aboutHeadingAccent}</span>
          </span>
        </h2>

        <div className="grid min-h-0 flex-1 items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="about-copy min-w-0 w-full">
            <Reveal delay={0.3}>
              <p className="about-copy__text text-sm leading-relaxed text-secondary lg:text-lg">
                I&apos;m{" "}
                <strong className="text-primary">{SITE.person}</strong>, a{" "}
                {SITE.roleTitle} with{" "}
                <strong className="text-primary">8+ years</strong> helping B2B
                SaaS and technology companies in India improve online visibility,
                generate quality leads, and deliver{" "}
                <strong className="text-primary">measurable growth</strong>{" "}
                through optimized campaigns and continuous analysis.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <p className="about-copy__text text-sm leading-relaxed text-secondary lg:text-lg">
                From Google Ads and Meta campaigns to technical SEO and conversion
                optimization, I focus on outcomes that matter: lower CPA, higher
                ROI, stronger organic traffic, and better lead quality.{" "}
                <strong className="text-primary">{SITE.certification}.</strong>
              </p>
            </Reveal>
          </div>

          <Reveal
            delay={0.2}
            className="about-stats grid grid-cols-2 gap-x-5 gap-y-6 sm:gap-x-8 sm:gap-y-8 lg:gap-x-10 lg:gap-y-10 lg:border-l lg:border-border lg:pl-12 xl:pl-16"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.08,
                  ease: EASE.outExpo,
                }}
              >
                <span className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-accent">
                  <StatIcon name={stat.icon} className="h-4 w-4" />
                </span>
                <div className="min-h-[3rem]">
                  {"display" in stat && stat.display ? (
                    <span className="stat-value block text-primary">
                      {stat.display}
                    </span>
                  ) : (
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="stat-value block text-primary"
                    />
                  )}
                </div>
                <span className="stat-label block">{stat.label}</span>
              </motion.div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.3} className="mt-auto shrink-0 border-t border-border pt-5">
          <h3 className="label-caps mb-4 block text-xs">Tools &amp; Skills</h3>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:gap-3">
            {TOOLS.map((tool, i) => (
              <motion.span
                key={tool}
                className="tool-chip flex cursor-default items-center justify-center border border-border px-2.5 py-2 text-center text-xs leading-tight tracking-[0.08em] text-secondary uppercase sm:px-3 sm:py-2.5 sm:text-[11px] sm:tracking-[0.1em]"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.03,
                  ease: EASE.outExpo,
                }}
                whileHover={{
                  y: -2,
                  borderColor: "rgba(255, 59, 48, 0.45)",
                  color: "#ffffff",
                  backgroundColor: "rgba(255, 59, 48, 0.08)",
                  boxShadow: "0 0 28px rgba(255, 80, 60, 0.18)",
                }}
                data-cursor="hover"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
