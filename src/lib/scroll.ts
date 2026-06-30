import type Lenis from "lenis";
import { FULL_VIEW_SECTIONS } from "@/lib/routes";

function getChromeHeight() {
  const chrome = document.getElementById("site-chrome");
  return chrome?.offsetHeight ?? 72;
}

export function resetHomeScroll(lenis: Lenis | null) {
  if (typeof window === "undefined") return;

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  }
}

function getViewportSectionScrollY(target: HTMLElement) {
  const chrome = getChromeHeight();
  return Math.round(
    window.scrollY + target.getBoundingClientRect().top - chrome
  );
}

export function scrollToSectionId(
  sectionId: string,
  lenis: Lenis | null,
  options?: { immediate?: boolean }
) {
  const immediate = options?.immediate ?? false;

  if (sectionId === "hero") {
    resetHomeScroll(lenis);
    return;
  }

  const target = document.getElementById(sectionId);
  if (!target) return;

  if (FULL_VIEW_SECTIONS.has(sectionId)) {
    const y = getViewportSectionScrollY(target);
    if (lenis) {
      lenis.scrollTo(y, {
        immediate,
        lock: !immediate,
        duration: immediate ? 0 : 1.1,
      });
    } else {
      window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
    }
    return;
  }

  if (lenis) {
    lenis.scrollTo(target, {
      offset: -getChromeHeight(),
      immediate,
      lock: !immediate,
      duration: immediate ? 0 : 1.1,
    });
  } else {
    const y =
      window.scrollY + target.getBoundingClientRect().top - getChromeHeight();
    window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" });
  }
}

export function scrollToSectionWhenReady(
  sectionId: string,
  lenis: Lenis | null,
  options?: { immediate?: boolean }
) {
  const run = () => scrollToSectionId(sectionId, lenis, options);

  const target = sectionId === "hero" ? document.body : document.getElementById(sectionId);
  if (target) {
    requestAnimationFrame(() => requestAnimationFrame(run));
    return;
  }

  let attempts = 0;
  const tryScroll = () => {
    const el = sectionId === "hero" ? document.body : document.getElementById(sectionId);
    if (el || sectionId === "hero") {
      run();
      return;
    }
    if (attempts < 30) {
      attempts += 1;
      requestAnimationFrame(tryScroll);
    }
  };

  requestAnimationFrame(tryScroll);
}
