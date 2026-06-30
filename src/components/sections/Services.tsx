"use client";

import { motion } from "framer-motion";
import { SERVICES, SERVICES_HIGHLIGHT, EASE } from "@/lib/constants";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { WordReveal } from "@/components/ui/WordReveal";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section
      id="services"
      className="section-gap section-padding relative scroll-mt-[var(--site-chrome)]"
      aria-label="Services"
    >
      <div className="container-grid">
        <motion.span
          className="label-caps mb-4 block text-xs text-accent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: EASE.outExpo }}
        >
          / 05
        </motion.span>

        <div className="mb-12 flex flex-col gap-3 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="section-heading">
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

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {SERVICES.map((service, i) => (
            <Reveal key={service.number} delay={i * 0.12}>
              <motion.article
                className="group relative border-t border-border pt-8"
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center border border-border text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:shadow-[0_0_25px_rgba(255,80,60,0.15)]">
                    <ServiceIcon name={service.icon} className="h-5 w-5" />
                  </div>
                  <span className="text-xs text-accent">{service.number}</span>
                </div>

                <h3 className="mb-3 text-sm font-semibold tracking-[0.15em] uppercase">
                  {service.title}
                </h3>

                <p className="mb-6 text-xs leading-relaxed text-secondary">
                  {service.description}
                </p>

                <motion.div
                  className="mb-6 h-px w-12 bg-accent"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: EASE.outExpo }}
                />

                <ul className="space-y-2">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[10px] tracking-[0.12em] text-secondary uppercase"
                    >
                      <span className="h-1 w-1 rounded-full bg-accent" />
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
