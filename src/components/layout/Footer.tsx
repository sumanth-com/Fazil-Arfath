"use client";

import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { LinkedInIcon3D, WhatsAppIcon3D } from "@/components/ui/SocialIcons";

const WHATSAPP_URL = `https://wa.me/${SITE.phone.replace(/\D/g, "")}`;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12" role="contentinfo">
      <div className="container-grid flex flex-col items-center justify-between gap-8 md:flex-row">
        <div>
          <Link
            href="#"
            className="logo-text text-lg"
            data-cursor="hover"
            aria-label={`${SITE.name} home`}
          >
            {SITE.name}
          </Link>
          <p className="mt-2 text-xs text-secondary">
            © {year} {SITE.person}. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-8" aria-label="Footer navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label-caps text-secondary transition-colors hover:text-accent"
              data-cursor="hover"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
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
      </div>
    </footer>
  );
}
