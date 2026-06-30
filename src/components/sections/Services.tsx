"use client";

import { motion } from "framer-motion";
import { SERVICES, SERVICES_HIGHLIGHT, EASE, SECTION_NUMBERS } from "@/lib/constants";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function Services() {
  return (
    <section
      id="services"
      className="section-gap section-padding relative scroll-mt-[var(--site-chrome)]"
      aria-labelledby="services-heading"
    >
      <div className="container-grid">
        <SectionLabel number={SECTION_NUMBERS.services} />

        <div className="section-header section-header--split mb-8 sm:mb-10 lg:mb-16">
          <h2 id="services-heading" className="section-heading">
            <span className="section-heading-line">
              <span>CORE</span>
              <span className="text-accent">SERVICES</span>
            </span>
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-secondary lg:text-right">
            Performance marketing, SEO, analytics, and conversion optimization
            for B2B SaaS and technology brands seeking measurable growth.
          </p>
        </div>

        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {SERVICES.map((service, i) => (
            <Reveal key={service.number} delay={i * 0.12}>
              <motion.article
                className="service-card group relative overflow-hidden border-t border-border pt-6 sm:pt-8"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="service-card__head">
                  <div className="service-card__icon" aria-hidden="true">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="service-card__title">{service.title}</h3>
                  <span className="service-card__number">{service.number}</span>
                </div>

                <p className="service-card__description">{service.description}</p>

                <motion.div
                  className="service-card__line"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE.outExpo }}
                />

                <ul className="service-card__list">
                  {service.items.map((item) => (
                    <li key={item} className="service-card__list-item">
                      <span className="service-card__bullet" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="pointer-events-none absolute -inset-4 rounded-sm border border-transparent opacity-0 transition-all duration-500 group-hover:border-accent/8 group-hover:opacity-100" />
              </motion.article>
            </Reveal>
          ))}
        </div>

        <div className="relative mt-20 border-t border-border pt-14 lg:mt-28 lg:pt-20">
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="h-[280px] w-[480px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,59,48,0.04)_0%,transparent_70%)]" />
          </div>

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <blockquote className="heading-serif text-[clamp(1.5rem,3.5vw,2.75rem)] leading-[1.4] text-primary italic">
              <span className="sr-only">&ldquo;</span>
              <WordReveal
                text={SERVICES_HIGHLIGHT.quote}
                className="justify-center"
                highlightWords={[...SERVICES_HIGHLIGHT.highlightWords]}
                delay={0.05}
              />
              <span className="sr-only">&rdquo;</span>
            </blockquote>

            <motion.p
              className="label-caps mt-8 text-secondary"
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.45, ease: EASE.outExpo }}
            >
              <span className="text-accent">/</span> {SERVICES_HIGHLIGHT.caption}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
