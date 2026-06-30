"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface PortraitImageProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
  align?: "left" | "right";
  fit?: "contain" | "cover";
  clean?: boolean;
  zoom?: boolean;
}

export function PortraitImage({
  src,
  alt,
  className,
  priority = false,
  align = "right",
  fit = "cover",
  clean = false,
  zoom = false,
}: PortraitImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-2, 2]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [2, -2]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-6, 6]);

  const handleMove = (e: React.MouseEvent) => {
    if (reducedMotion || clean || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  if (clean) {
    const isStatic = typeof src !== "string";

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-auto w-full items-center justify-center lg:h-full",
          className
        )}
      >
        {isStatic ? (
          <div
            className={cn(
              "flex w-full items-center justify-center",
              zoom && "lg:scale-[1.2]"
            )}
            style={{ transformOrigin: "center center" }}
          >
            <Image
              src={src}
              alt={alt}
              width={src.width}
              height={src.height}
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full max-w-full object-contain object-center lg:max-h-[calc(100svh-var(--site-chrome)-0.5rem)]"
            />
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn(
              "object-contain object-center",
              zoom && "scale-110"
            )}
            style={{ transformOrigin: "center center" }}
          />
        )}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn("relative h-full w-full", className)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div
          className={cn(
            "absolute top-[15%] h-[70%] w-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,120,40,0.25)_0%,transparent_70%)] blur-3xl",
            align === "left" ? "left-[5%]" : "right-[5%]"
          )}
        />
        <div
          className={cn(
            "absolute top-[20%] h-[50%] w-[40%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,80,30,0.15)_0%,transparent_60%)] blur-2xl",
            align === "left" ? "left-[10%]" : "right-[10%]"
          )}
        />
      </div>

      <motion.div
        className="relative z-10 flex h-full w-full items-center justify-center"
        style={
          reducedMotion
            ? {}
            : {
                rotateY,
                rotateX,
                x: translateX,
                y: translateY,
                perspective: 1000,
              }
        }
      >
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn(
              fit === "contain"
                ? "object-contain object-center"
                : cn(
                    "object-cover object-[center_20%]",
                    align === "left" ? "mask-portrait-left" : "mask-portrait"
                  )
            )}
            style={{ filter: "contrast(1.05) brightness(1.02)" }}
          />
        </div>

        {fit === "contain" ? (
          <div
            className={cn(
              "pointer-events-none absolute inset-y-0 z-20 w-[12%]",
              align === "left"
                ? "right-0 bg-gradient-to-l from-bg/70 via-bg/20 to-transparent"
                : "left-0 bg-gradient-to-r from-bg/70 via-bg/20 to-transparent"
            )}
            aria-hidden="true"
          />
        ) : (
          <>
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-1/3 bg-gradient-to-t from-bg via-bg/80 to-transparent"
              aria-hidden="true"
            />
            <div
              className={cn(
                "pointer-events-none absolute inset-y-0 z-20 w-1/4",
                align === "left"
                  ? "right-0 bg-gradient-to-l from-bg to-transparent"
                  : "left-0 bg-gradient-to-r from-bg to-transparent"
              )}
              aria-hidden="true"
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
