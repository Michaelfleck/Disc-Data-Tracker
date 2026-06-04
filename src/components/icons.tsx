import type { CSSProperties } from "react";

export interface IconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

export function IconBasket({ size = 22, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M12 2v3" />
      <path d="M5 6h14l-1.4 5H6.4L5 6Z" />
      <path d="M7 6c.6 3 1.4 4.5 5 4.5S16.4 9 17 6" opacity=".55" />
      <path d="M6.4 11h11.2l-1 2.4H7.4L6.4 11Z" />
      <path d="M9 13.4V20m6-6.6V20M7.5 20h9" />
    </svg>
  );
}

export function IconFlame({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M12 2.5c.6 2.4-.8 3.9-2.1 5.2C8.4 9.2 7 10.7 7 13.3a5 5 0 0 0 10 .2c0-1.7-.7-3-1.4-4-.3.7-.8 1.2-1.5 1.4.6-2.2-.2-4.6-2.1-6.4-.1 1.3-.6 2-1.4 2.7.4-1.6.2-3.2-.1-4.7Z" />
    </svg>
  );
}

export function IconGhost({ size = 20, className, style, lit }: IconProps & { lit?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={lit ? "currentColor" : "none"}
      stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" className={className} style={style}>
      <path d="M5 11a7 7 0 0 1 14 0v9l-2.2-1.6L14.6 20l-2.6-1.7L9.4 20l-2.2-1.6L5 20Z" />
      <circle cx="9.3" cy="10.5" r="1" fill={lit ? "var(--bg)" : "currentColor"} stroke="none" />
      <circle cx="14.7" cy="10.5" r="1" fill={lit ? "var(--bg)" : "currentColor"} stroke="none" />
    </svg>
  );
}

export function IconTrophy({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M7 4h10v4a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 17h6M10 13.5V17m4-3.5V17M8.5 20h7" />
    </svg>
  );
}

export function IconBolt({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  );
}

export function IconTarget({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className={className} style={style}>
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function IconArrowUp({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 19V6M6 11l6-5 6 5" /></svg>
  );
}
export function IconArrowDown({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M12 5v13M6 13l6 5 6-5" /></svg>
  );
}

export function IconSun({ size = 22, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
    </svg>
  );
}
export function IconCloud({ size = 22, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M7 18a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 9.5a3.5 3.5 0 0 1 .5 8.5H7Z" />
    </svg>
  );
}
export function IconRain({ size = 22, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M7 15a4 4 0 0 1-.5-7.97A5 5 0 0 1 16 6.5a3.5 3.5 0 0 1 .5 8.5H7Z" />
      <path d="M8 19l-1 2M12 19l-1 2M16 19l-1 2" />
    </svg>
  );
}
export function IconWind({ size = 16, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M3 8h11a2.5 2.5 0 1 0-2.5-2.5M3 12h15a2.5 2.5 0 1 1-2.5 2.5M3 16h9" />
    </svg>
  );
}

export function IconClock({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
    </svg>
  );
}
export function IconMoon({ size = 20, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
    </svg>
  );
}

export function IconChevR({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M9 5l7 7-7 7" /></svg>
  );
}
export function IconSearch({ size = 18, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" className={className} style={style}><circle cx="11" cy="11" r="7" /><path d="m20 20-3.2-3.2" /></svg>
  );
}
export function IconBell({ size = 19, className, style }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
      <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5 2 6H4c.5-1 2-2 2-6Z" /><path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}
