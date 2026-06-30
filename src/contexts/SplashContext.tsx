"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type SplashPhase = "loading" | "exit" | "complete";

type SplashContextValue = {
  phase: SplashPhase;
  complete: boolean;
  registerBrandAnchor: (node: HTMLElement | null) => void;
  brandAnchor: HTMLElement | null;
};

const SplashContext = createContext<SplashContextValue | null>(null);

const SPLASH_KEY = "fazil-splash-seen";

export function SplashProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<SplashPhase>("loading");
  const [skipped, setSkipped] = useState(false);
  const [brandAnchor, setBrandAnchor] = useState<HTMLElement | null>(null);

  const registerBrandAnchor = useCallback((node: HTMLElement | null) => {
    setBrandAnchor(node);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (reducedMotion || sessionStorage.getItem(SPLASH_KEY) === "1") {
      setSkipped(true);
      setPhase("complete");
      return;
    }

    document.body.classList.add("splash-active");

    const exitTimer = window.setTimeout(() => setPhase("exit"), 3400);
    const doneTimer = window.setTimeout(() => {
      setPhase("complete");
      sessionStorage.setItem(SPLASH_KEY, "1");
      document.body.classList.remove("splash-active");
    }, 5000);

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
      registerBrandAnchor,
      brandAnchor,
    }),
    [phase, skipped, complete, registerBrandAnchor, brandAnchor]
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
