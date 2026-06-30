"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "ghost" | "pill3d";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit";
  showArrow?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-bg border border-accent hover:shadow-[0_0_40px_rgba(255,80,60,0.35)]",
  outline:
    "bg-transparent text-accent border border-accent/60 hover:border-accent hover:bg-accent/5 hover:shadow-[0_0_30px_rgba(255,80,60,0.15)]",
  ghost:
    "bg-transparent text-primary border border-transparent hover:text-accent",
  pill3d:
    "btn-pill-3d rounded-full border border-accent/42 bg-transparent text-accent hover:text-accent",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 text-[10px]",
  md: "px-7 py-3.5 text-[11px]",
  lg: "px-10 py-5 text-xs",
};

export function Button({
  children,
  href,
  onClick,
  variant = "outline",
  size = "md",
  className,
  type = "button",
  showArrow = true,
}: ButtonProps) {
  const classes = cn(
    "group relative inline-flex items-center gap-2 font-medium tracking-[0.2em] uppercase transition-colors duration-300",
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <span className="relative z-10 inline-block text-sm" aria-hidden="true">
          ↗
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} data-cursor="hover">
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} data-cursor="hover">
      {content}
    </button>
  );
}
