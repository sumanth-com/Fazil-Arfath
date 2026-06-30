"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NAV_LINKS, SITE, EASE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useSplash } from "@/contexts/SplashContext";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const brandRef = useRef<HTMLSpanElement>(null);
  const { complete, registerBrandAnchor } = useSplash();

  useEffect(() => {
    registerBrandAnchor(brandRef.current);
    return () => registerBrandAnchor(null);
  }, [registerBrandAnchor]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "transition-colors duration-500",
          scrolled ? "bg-bg/90 backdrop-blur-xl" : "bg-bg/80 backdrop-blur-md"
        )}
        initial={false}
        animate={{
          opacity: complete ? 1 : 0,
          y: complete ? 0 : -12,
        }}
        transition={{ duration: 0.5, ease: EASE.outExpo, delay: complete ? 0.05 : 0 }}
      >
        <div className="container-grid relative flex items-center py-4 md:py-5">
          <Link
            href="#"
            className="relative z-10 shrink-0"
            data-cursor="hover"
            aria-label={`${SITE.name} home`}
          >
            <span
              ref={brandRef}
              id="nav-brand-anchor"
              className={cn(
                "logo-text inline-block text-lg md:text-xl",
                !complete && "pointer-events-none opacity-0"
              )}
            >
              {SITE.name}
            </span>
          </Link>

          <nav
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex xl:gap-10"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={false}
                animate={{ opacity: complete ? 1 : 0, y: complete ? 0 : -8 }}
                transition={{
                  delay: complete ? 0.15 + i * 0.06 : 0,
                  duration: 0.7,
                  ease: EASE.outExpo,
                }}
              >
                <Link
                  href={link.href}
                  className="label-caps whitespace-nowrap text-primary/80 transition-colors duration-300 hover:text-accent"
                  data-cursor="hover"
                  tabIndex={complete ? 0 : -1}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="relative z-10 ml-auto hidden shrink-0 lg:block">
            <motion.div
              initial={false}
              animate={{ opacity: complete ? 1 : 0, y: complete ? 0 : -8 }}
              transition={{ delay: complete ? 0.45 : 0, duration: 0.7, ease: EASE.outExpo }}
            >
              <Button href="#contact" variant="pill3d" size="sm">
                {SITE.ctaLabel}
              </Button>
            </motion.div>
          </div>

          <button
            className="relative z-10 ml-auto flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            data-cursor="hover"
            tabIndex={complete ? 0 : -1}
          >
            <motion.span
              className="block h-px w-6 bg-primary"
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-px w-6 bg-primary"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-px w-6 bg-primary"
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && complete && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-bg/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE.outExpo }}
          >
            <nav className="flex flex-col items-center gap-8" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, ease: EASE.outExpo }}
                >
                  <Link
                    href={link.href}
                    className="heading-poster text-4xl"
                    onClick={() => setMenuOpen(false)}
                    data-cursor="hover"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Button href="#contact" variant="pill3d" onClick={() => setMenuOpen(false)}>
                {SITE.ctaLabel}
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
