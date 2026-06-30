"use client";

import { useEffect } from "react";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const chrome = document.getElementById("site-chrome");
    if (!chrome) return;

    const update = () => {
      document.documentElement.style.setProperty(
        "--site-chrome",
        `${chrome.offsetHeight}px`
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(chrome);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div id="site-chrome" className="site-chrome fixed inset-x-0 top-0 z-[60]">
      {children}
    </div>
  );
}
