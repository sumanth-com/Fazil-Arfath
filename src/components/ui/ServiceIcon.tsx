interface IconProps {
  name: string;
  className?: string;
}

export function ServiceIcon({ name, className = "w-5 h-5" }: IconProps) {
  const icons: Record<string, React.ReactNode> = {
    message: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M8 10h8M8 14h5M5 20l2-4H19a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    cube: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 3l9 5.25v7.5L12 21l-9-5.25v-7.5L12 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 12l9-3.75M12 12v9M12 12L3 8.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    send: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M22 3L11 14M22 3l-7 18-4-7-7-4 18-7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    screen: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <rect x="3" y="4" width="18" height="14" rx="1" />
        <path d="M8 21h8M12 18v3" strokeLinecap="round" />
        <path d="M7 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    hexagon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M12 2l8.66 5v10L12 22l-8.66-5V7L12 2z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3-3" strokeLinecap="round" />
      </svg>
    ),
    edit: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M4 20h4l10-10-4-4L4 16v4z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13 7l4 4" strokeLinecap="round" />
      </svg>
    ),
    pen: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M3 21l3-1 11-11-2-2L4 18l-1 3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 5l4 4" strokeLinecap="round" />
      </svg>
    ),
    briefcase: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" />
        <path d="M3 9h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinejoin="round" />
        <path d="M3 13h18" strokeLinecap="round" />
      </svg>
    ),
  };

  return <>{icons[name] ?? icons.code}</>;
}
