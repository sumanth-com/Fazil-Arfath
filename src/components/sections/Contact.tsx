"use client";

import { motion } from "framer-motion";
import { SITE, HERO_SERVICES, EASE, SECTION_NUMBERS } from "@/lib/constants";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { TextReveal } from "@/components/ui/TextReveal";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { LocationPinIcon3D, LinkedInIcon3D, WhatsAppIcon3D } from "@/components/ui/SocialIcons";
import { SectionLabel } from "@/components/ui/SectionLabel";

const WHATSAPP_URL = `https://wa.me/${SITE.phone.replace(/\D/g, "")}`;

export function Contact() {
  return (
    <section
      id="contact"
      className="section-padding relative scroll-mt-[var(--site-chrome)] overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_50%,rgba(255,59,48,0.05)_0%,transparent_60%)]"
        aria-hidden="true"
      />

      <div className="container-grid relative z-10">
        <div className="contact-layout">
          <div className="contact-left">
            <div className="contact-intro max-lg:text-center">
              <SectionLabel number={SECTION_NUMBERS.contact} />

              <h2 id="contact-heading" className="section-heading section-header mb-4 sm:mb-6">
                <span className="section-heading-line">
                  <TextReveal as="span" inline>
                    LET&apos;S GROW
                  </TextReveal>
                  <span className="text-accent">TOGETHER</span>
                </span>
              </h2>

              <Reveal delay={0.25}>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-secondary lg:mx-0">
                  Looking for a senior digital marketing specialist for your B2B
                  SaaS or tech brand? I respond {SITE.responseTime.toLowerCase()}.
                </p>
              </Reveal>
            </div>

            <div className="contact-actions max-lg:text-center">
              <Reveal delay={0.35}>
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5 lg:items-start">
                  <Button
                    href={`mailto:${SITE.email}`}
                    variant="pill3d"
                    size="sm"
                    className="min-h-11 w-full sm:w-auto"
                  >
                    {SITE.ctaLabel}
                  </Button>
                  <span className="contact-channel-location label-caps flex items-center gap-2.5">
                    <LocationPinIcon3D />
                    {SITE.location}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-center gap-4 lg:justify-start">
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-channel-icon"
                    data-cursor="hover"
                    aria-label="LinkedIn"
                  >
                    <span className="contact-channel-icon__shine" aria-hidden="true" />
                    <LinkedInIcon3D />
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-channel-icon"
                    data-cursor="hover"
                    aria-label={`WhatsApp ${SITE.phone}`}
                  >
                    <span className="contact-channel-icon__shine" aria-hidden="true" />
                    <WhatsAppIcon3D />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="contact-offers">
            {HERO_SERVICES.map((item, i) => (
              <motion.article
                key={item.number}
                className="contact-offer group"
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, margin: "-8%" }}
                transition={{
                  duration: 0.85,
                  delay: i * 0.1,
                  ease: EASE.outExpo,
                }}
              >
                <span className="contact-offer__number">{item.number}</span>

                <div className="contact-offer-rail" aria-hidden="true">
                  <span className="contact-offer-line" />
                </div>

                <div className="contact-offer-icon" aria-hidden="true">
                  <ServiceIcon name={item.icon} className="h-5 w-5" />
                  <span className="contact-offer-icon-dot" aria-hidden="true" />
                </div>

                <div className="contact-offer-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
