interface ProcessIconProps {
  name: "audit" | "strategy" | "optimize" | "scale";
  className?: string;
}

export function ProcessIcon({ name, className = "h-5 w-5" }: ProcessIconProps) {
  const icons = {
    audit: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <circle cx="10" cy="10" r="6" />
        <path d="M15 15l5 5" strokeLinecap="round" />
        <path d="M7 10h6M10 7v6" strokeLinecap="round" opacity="0.7" />
      </svg>
    ),
    strategy: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <path d="M4 5h16v14H4z" strokeLinejoin="round" />
        <path d="M8 9h8M8 13h5" strokeLinecap="round" />
        <circle cx="17" cy="7" r="2.5" />
        <path d="M17 5.5V4" strokeLinecap="round" />
      </svg>
    ),
    optimize: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <path d="M4 18l4-7 4 3 5-9 3 6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20h16" strokeLinecap="round" />
        <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    scale: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className} aria-hidden="true">
        <path d="M5 18V10M10 18V6M15 18v-4M20 18V8" strokeLinecap="round" />
        <path d="M4 18h17" strokeLinecap="round" />
        <path d="M16 5l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return icons[name];
}
