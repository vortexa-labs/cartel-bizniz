
import React from "react";
import { cn } from "@/lib/utils";

interface SocialIconsProps {
  className?: string;
}

// SVGs crafted for: Instagram, X (Twitter), Telegram, Dexscreener, Pump.fun
const ICON_SIZE = 40;
const ICON_BG =
  "absolute inset-0 bg-black/40 rounded-xl transition-transform duration-300 scale-95 group-hover:scale-100 group-hover:bg-black/60 -z-10 blur-sm";

const icons = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    svg: (
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
        <rect x="4" y="4" width="24" height="24" rx="8" stroke="#fff" strokeWidth="2" fill="url(#instaG)" />
        <circle cx="16" cy="16" r="7" stroke="#fff" strokeWidth="2" />
        <circle cx="23.5" cy="8.5" r="1.5" fill="#fff" />
        <defs>
          <linearGradient id="instaG" x1="6" y1="28" x2="26" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#e5deff"/>
            <stop offset="1" stopColor="#fff"/>
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    svg: (
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#222" fillOpacity=".22"/>
        <path d="M8 8L24 24" stroke="#fff" strokeWidth="2.3" strokeLinecap="round"/>
        <path d="M24 8L8 24" stroke="#fff" strokeWidth="2.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: "Telegram",
    href: "https://t.me",
    svg: (
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#222" fillOpacity=".22"/>
        <path d="M7 16L25 8L22.2 25C22.05 25.9 21.48 26.15 20.75 25.8L16.25 22.7L14.2 24.6C14.02 24.77 13.86 24.85 13.62 24.85L13.94 20.26L21.5 12.6C21.75 12.36 21.45 12.24 21.09 12.48L11.6 18.61L7.22 17.32C6.34 17.06 6.33 16.48 7.31 16.14L7 16Z" fill="#fff" />
      </svg>
    ),
  },
  {
    label: "Dexscreener",
    href: "https://dexscreener.com",
    svg: (
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#222" fillOpacity=".17"/>
        <path d="M12 26L16 10L20 26" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12.5 23.5H19.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="16" cy="7.5" r="2.5" fill="#fff" stroke="#000" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "Pump.fun",
    href: "https://pump.fun",
    svg: (
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#222" fillOpacity=".19"/>
        <rect x="9" y="12" width="14" height="8" rx="4" fill="#fff"/>
        <ellipse cx="18" cy="16" rx="2" ry="3" fill="#222"/>
        <ellipse cx="14" cy="16" rx="2" ry="3" fill="#222"/>
        <path d="M13 14.5L13.5 13M19 14.5L18.5 13" stroke="#999" strokeWidth="1.2"/>
      </svg>
    ),
  },
];

const SocialIcons: React.FC<SocialIconsProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center gap-6 md:gap-8 py-2", className)}>
      {icons.map(({ label, href, svg }, i) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit our ${label} page`}
          className="group relative flex items-center justify-center focus:outline-none"
          style={{ width: ICON_SIZE, height: ICON_SIZE }}
        >
          <div className={ICON_BG}></div>
          <span className="relative z-10 block">{svg}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
