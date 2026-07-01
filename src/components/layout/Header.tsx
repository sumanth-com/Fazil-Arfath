"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS, SITE, EASE } from "@/lib/constants";
import { ROUTES, getSectionIdFromPath } from "@/lib/routes";
import { BRAND_LAYOUT_ID } from "@/lib/splash";
import { scrollToSectionWhenReady } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useSplash } from "@/contexts/SplashContext";
import { useLenis } from "@/contexts/LenisContext";

const brandSpring = {
  type: "spring" as const,
  stiffness: 260,
  damping: 32,
  mass: 1,
};

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animatedMenuClose, setAnimatedMenuClose] = useState(true);
  const { complete } = useSplash();
  const lenis = useLenis();
  const pathname = usePathname();
  const router = useRouter();

  const unlockBody = useCallback(() => {
    document.body.style.overflow = "";
    document.body.classList.remove("menu-open");
  }, []);

  const closeMenu = useCallback(
    (animated = true) => {
      setAnimatedMenuClose(animated);
      unlockBody();
      setMenuOpen(false);

      if (!animated) {
        document.documentElement.classList.add("mobile-nav-instant");
        window.setTimeout(() => {
          document.documentElement.classList.remove("mobile-nav-instant");
        }, 50);
        lenis?.start();
        return;
      }

      lenis?.start();
    },
    [lenis, unlockBody]
  );

  const openMenu = useCallback(() => {
    setAnimatedMenuClose(true);
    setMenuOpen(true);
    lenis?.stop();
  }, [lenis]);

  const handleMobileNav = useCallback(
    (href: string) => {
      const sectionId = getSectionIdFromPath(href);
      closeMenu(false);

      if (pathname === href) {
        requestAnimationFrame(() => {
          scrollToSectionWhenReady(sectionId, lenis, { immediate: false });
        });
        return;
      }

      router.push(href);
    },
    [closeMenu, lenis, pathname, router]
  );

  const toggleMenu = () => {
    if (menuOpen) closeMenu(true);
    else openMenu();
  };

  const hamburgerTransition = {
    duration: animatedMenuClose ? 0.25 : 0,
    ease: EASE.outExpo,
  };

  useEffect(() => {
    const updateScrolled = (scrollY: number) => {
      setScrolled(scrollY > 24);
    };

    if (lenis) {
      const onLenisScroll = () => updateScrolled(lenis.scroll);
      lenis.on("scroll", onLenisScroll);
      updateScrolled(lenis.scroll);
      return () => {
        lenis.off("scroll", onLenisScroll);
      };
    }

    const onScroll = () => updateScrolled(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };

    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open");

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen, closeMenu]);

  return (
    <>
      <motion.header
        className={cn(
          "site-header relative z-50 w-full border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-border/80 bg-bg/95 backdrop-blur-xl"
            : "border-transparent bg-bg/80 backdrop-blur-md"
        )}
        initial={false}
        animate={{ opacity: complete ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE.outExpo, delay: complete ? 0.35 : 0 }}
      >
        <div className="container-grid relative flex items-center py-4 md:py-5">
          <Link
            href={ROUTES.home}
            className="relative z-10 shrink-0"
            data-cursor="hover"
            aria-label={`${SITE.name} home`}
            onClick={() => closeMenu(true)}
          >
            {complete ? (
              <motion.span
                layoutId={BRAND_LAYOUT_ID}
                className="logo-text inline-block text-lg md:text-xl"
                transition={{ layout: brandSpring }}
              >
                {SITE.name}
              </motion.span>
            ) : (
              <span
                className="logo-text pointer-events-none inline-block text-lg md:text-xl opacity-0"
                aria-hidden="true"
              >
                {SITE.name}
              </span>
            )}
          </Link>

          <nav
            className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 lg:flex xl:gap-10"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={false}
                animate={{ opacity: complete ? 1 : 0 }}
                transition={{
                  delay: complete ? 0.55 + i * 0.05 : 0,
                  duration: 0.5,
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
              animate={{ opacity: complete ? 1 : 0 }}
              transition={{ delay: complete ? 0.72 : 0, duration: 0.5, ease: EASE.outExpo }}
            >
              <Button href={ROUTES.contact} variant="pill3d" size="sm">
                {SITE.ctaLabel}
              </Button>
            </motion.div>
          </div>

          <button
            type="button"
            className={cn(
              "relative z-10 ml-auto flex h-11 w-11 min-h-11 min-w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full transition-colors lg:hidden",
              menuOpen && "bg-white/5"
            )}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            data-cursor="hover"
            tabIndex={complete ? 0 : -1}
          >
            <motion.span
              className="block h-px w-6 bg-primary"
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={hamburgerTransition}
            />
            <motion.span
              className="block h-px w-6 bg-primary"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={
                menuOpen && animatedMenuClose
                  ? { duration: 0.2 }
                  : { duration: animatedMenuClose ? 0.2 : 0 }
              }
            />
            <motion.span
              className="block h-px w-6 bg-primary"
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={hamburgerTransition}
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && complete && (
          <motion.div
            key="mobile-nav-overlay"
            className="mobile-nav-overlay fixed inset-x-0 bottom-0 top-[var(--site-chrome)] z-[80] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: animatedMenuClose ? 0.3 : 0, ease: EASE.outExpo },
            }}
            transition={{ duration: 0.35, ease: EASE.outExpo }}
            onClick={() => closeMenu(true)}
            aria-hidden={!menuOpen}
          >
            <div className="mobile-nav-backdrop absolute inset-0 bg-bg/92 backdrop-blur-2xl" />

            <nav
              id="mobile-nav"
              className="relative flex h-full flex-col items-center justify-center px-6 py-10"
              aria-label="Mobile navigation"
              onClick={(event) => event.stopPropagation()}
            >
              <ul className="flex w-full max-w-xs flex-col items-center justify-center gap-1 sm:max-w-sm">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    className="w-full"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.05, duration: 0.4, ease: EASE.outExpo }}
                  >
                    <Link
                      href={link.href}
                      className="mobile-nav-link heading-poster py-3.5 text-[1.65rem] leading-none text-primary transition-colors hover:text-accent sm:text-4xl"
                      onClick={(event) => {
                        event.preventDefault();
                        handleMobileNav(link.href);
                      }}
                      data-cursor="hover"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                className="mt-12 flex w-full justify-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4, ease: EASE.outExpo }}
              >
                <Button
                  href={ROUTES.contact}
                  variant="pill3d"
                  onClick={(event) => {
                    event.preventDefault();
                    handleMobileNav(ROUTES.contact);
                  }}
                >
                  {SITE.ctaLabel}
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
