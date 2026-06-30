"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SPLASH_EXIT_MS, SPLASH_LOAD_MS } from "@/lib/splash";

type SplashPhase = "loading" | "exit" | "complete";

type SplashContextValue = {
  phase: SplashPhase;
  complete: boolean;
};

const SplashContext = createContext<SplashContextValue | null>(null);

const SPLASH_KEY = "fazil-splash-seen";

function markSplashReady() {
  document.documentElement.classList.remove("splash-pending");
  document.documentElement.classList.add("splash-ready");
}

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<SplashPhase>(() => {
    if (typeof window === "undefined") return "loading";
    try {
      return sessionStorage.getItem(SPLASH_KEY) === "1" ? "complete" : "loading";
    } catch {
      return "loading";
    }
  });
  const [skipped, setSkipped] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(SPLASH_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (reducedMotion || sessionStorage.getItem(SPLASH_KEY) === "1") {
      setSkipped(true);
      setPhase("complete");
      markSplashReady();
      return;
    }

    document.body.classList.add("splash-active");

    const exitTimer = window.setTimeout(() => setPhase("exit"), SPLASH_LOAD_MS);
    const doneTimer = window.setTimeout(() => {
      setPhase("complete");
      sessionStorage.setItem(SPLASH_KEY, "1");
      document.body.classList.remove("splash-active");
      markSplashReady();
    }, SPLASH_EXIT_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.classList.remove("splash-active");
    };
  }, [reducedMotion]);

  const complete = skipped || phase === "complete";

  const value = useMemo(
    () => ({
      phase: skipped ? ("complete" as const) : phase,
      complete,
    }),
    [phase, skipped, complete]
  );

  return (
    <SplashContext.Provider value={value}>{children}</SplashContext.Provider>
  );
}

export function useSplash() {
  const ctx = useContext(SplashContext);
  if (!ctx) {
    throw new Error("useSplash must be used within SplashProvider");
  }
  return ctx;
}
