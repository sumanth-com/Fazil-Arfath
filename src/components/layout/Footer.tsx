"use client";

import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-8" role="contentinfo">
      <div className="container-grid">
        <p className="text-center text-xs text-secondary md:text-left">
          © {year} {SITE.person}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
