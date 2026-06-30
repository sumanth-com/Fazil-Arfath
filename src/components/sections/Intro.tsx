"use client";

import { motion } from "framer-motion";
import { SITE, EASE } from "@/lib/constants";
import { IMAGES } from "@/lib/images";
import { PortraitImage } from "@/components/ui/PortraitImage";
import { TextReveal } from "@/components/ui/TextReveal";

export function Intro() {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      aria-label="Introduction"
    >
      <div className="container-grid grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative z-10">
          <motion.p
            className="heading-serif mb-6 text-lg text-primary/80 italic md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, ease: EASE.outExpo }}
          >
            {SITE.tagline}
          </motion.p>

          <h2 className="heading-poster text-[clamp(3rem,9vw,7.5rem)]">
            <TextReveal as="span">FAZIL</TextReveal>
            <motion.span
              className="text-stroke block text-[clamp(3rem,9vw,7.5rem)]"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.15, ease: EASE.outExpo }}
            >
              ARFATH
            </motion.span>
            <motion.span
              className="block text-[clamp(2rem,6vw,5rem)] text-accent"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.3, ease: EASE.outExpo }}
            >
              {SITE.roleDetail}
            </motion.span>
          </h2>

          <motion.div
            className="mt-10 grid gap-4 border-t border-border pt-8 sm:grid-cols-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE.outExpo }}
          >
            <div>
              <span className="label-caps mb-2 block">Location</span>
              <span className="text-sm text-primary">{SITE.location}</span>
            </div>
            <div>
              <span className="label-caps mb-2 block">Status</span>
              <span className="text-sm text-success">{SITE.status}</span>
            </div>
            <div>
              <span className="label-caps mb-2 block">Focus</span>
              <span className="text-sm text-primary">{SITE.focus}</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative h-[55vh] lg:h-[75vh]"
          initial={{ opacity: 0, scale: 1.03 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ duration: 1.2, ease: EASE.outExpo }}
        >
          <PortraitImage
            src={IMAGES.portrait}
            alt={`${SITE.person} — ${SITE.roleTitle}`}
            align="right"
            fit="contain"
          />
        </motion.div>
      </div>
    </section>
  );
}
