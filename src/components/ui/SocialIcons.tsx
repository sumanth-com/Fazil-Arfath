"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

function useIconGrad() {
  const id = useId().replace(/:/g, "");
  return {
    grad: `social-grad-${id}`,
    glow: `social-glow-${id}`,
  };
}

const glyphClass = "h-[1.3rem] w-[1.3rem]";

export function WhatsAppIcon3D({ className }: { className?: string }) {
  const { grad, glow } = useIconGrad();

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(glyphClass, className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7a6f" />
          <stop offset="45%" stopColor="#ff3b30" />
          <stop offset="100%" stopColor="#9f1f17" />
        </linearGradient>
        <filter id={glow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#ff3b30" floodOpacity="0.55" />
        </filter>
      </defs>
      <path
        fill={`url(#${grad})`}
        filter={`url(#${glow})`}
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
      />
      <path
        fill={`url(#${grad})`}
        filter={`url(#${glow})`}
        d="M12.004 2C6.477 2 2 6.477 2 12.004c0 1.76.46 3.415 1.264 4.85L2 22l5.317-1.395A9.96 9.96 0 0012.004 22C17.523 22 22 17.523 22 12.004S17.523 2 12.004 2zm0 18.15a8.13 8.13 0 01-4.135-1.127l-.296-.176-3.153.826.84-3.073-.193-.31A8.14 8.14 0 014.85 12c0-4.487 3.667-8.15 8.154-8.15s8.15 3.663 8.15 8.15-3.663 8.15-8.15 8.15z"
      />
    </svg>
  );
}

export function MailIcon3D({ className }: { className?: string }) {
  const { grad, glow } = useIconGrad();

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(glyphClass, className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7a6f" />
          <stop offset="50%" stopColor="#ff3b30" />
          <stop offset="100%" stopColor="#9f1f17" />
        </linearGradient>
        <filter id={glow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#ff3b30" floodOpacity="0.55" />
        </filter>
      </defs>
      <path
        fill={`url(#${grad})`}
        filter={`url(#${glow})`}
        d="M4 6.5h16a1.5 1.5 0 011.5 1.5v9a1.5 1.5 0 01-1.5 1.5H4A1.5 1.5 0 012.5 17V8a1.5 1.5 0 011.5-1.5z"
      />
      <path
        fill="#ff6a5f"
        opacity="0.85"
        d="M5.2 8.4L12 13.2l6.8-4.8"
      />
      <path
        fill="#4a0d08"
        opacity="0.45"
        d="M5.2 15.2l6.3-4.5 6.3 4.5"
      />
    </svg>
  );
}

export function LinkedInIcon3D({ className }: { className?: string }) {
  const { grad, glow } = useIconGrad();

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn(glyphClass, className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={grad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff7a6f" />
          <stop offset="50%" stopColor="#ff3b30" />
          <stop offset="100%" stopColor="#9f1f17" />
        </linearGradient>
        <filter id={glow} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" floodColor="#ff3b30" floodOpacity="0.55" />
        </filter>
      </defs>
      <path
        fill={`url(#${grad})`}
        filter={`url(#${glow})`}
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 114.126 0 2.063 2.063 0 01-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}
