import type { ReactElement, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({ width: 20, height: 20, viewBox: "0 0 24 24", "aria-hidden": true, focusable: false, ...p }) as P;
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const PhoneIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
);
export const WhatsAppIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 21.8a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.9L.1 24l6.3-1.6A11.8 11.8 0 0 0 24 12.2c0-3.2-1.2-6.2-3.5-8.5z" /></svg>
);
export const CalendarIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" /></svg>
);
export const PinIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
export const ClockIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
);
export const CheckIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="M20 6 9 17l-5-5" /></svg>
);
export const CheckCircleIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-1.4 14.2-4-4 1.4-1.4 2.6 2.6 5.6-5.6 1.4 1.4-7 7z" /></svg>
);
export const AlertIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0zM12 9v4M12 17h.01" /></svg>
);
export const ArrowRightIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);
export const ChevronIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="m9 18 6-6-6-6" /></svg>
);
export const MenuIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="M3 6h18M3 12h18M3 18h18" /></svg>
);
export const CloseIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="M18 6 6 18M6 6l12 12" /></svg>
);
export const PlayIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor"><path d="M8 5.1v13.8a1 1 0 0 0 1.5.9l11-6.9a1 1 0 0 0 0-1.7l-11-6.9A1 1 0 0 0 8 5.1z" /></svg>
);
export const PlusIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="M12 5v14M5 12h14" /></svg>
);
export const StarIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
);
export const SearchIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);
export const ShieldIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const DirectionsIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="m3 11 19-9-9 19-2-8-8-2z" /></svg>
);
export const SunIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><circle cx="12" cy="12" r="4.2" /><path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" /></svg>
);
export const MoonIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1z" /></svg>
);
export const CardIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><rect x="2.5" y="5" width="19" height="14" rx="2.5" /><path d="M2.5 10h19M6.5 15h4" /></svg>
);
export const WalletIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><rect x="6" y="2.5" width="12" height="19" rx="2.5" /><path d="M10.5 18.5h3" /><path d="M9 8.5h6M9 11.5h4" /></svg>
);
export const CashIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.6" /><path d="M6 9.5v5M18 9.5v5" /></svg>
);
export const OnlinePayIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><circle cx="12" cy="12" r="9.5" /><path d="M2.5 12h19M12 2.5c2.6 2.8 3.9 6 3.9 9.5s-1.3 6.7-3.9 9.5c-2.6-2.8-3.9-6-3.9-9.5s1.3-6.7 3.9-9.5z" /></svg>
);
export const FacebookIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z" /></svg>
);
export const InstagramIcon = (p: P) => (
  <svg {...base(p)} {...stroke}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
);
export const TikTokIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor"><path d="M19.6 6.7a4.8 4.8 0 0 1-3.8-4.2V2h-3.4v13.7a2.9 2.9 0 1 1-2-2.8V9.4a6.3 6.3 0 1 0 5.4 6.3V8.7a8.2 8.2 0 0 0 4.8 1.5V6.8l-1-.1z" /></svg>
);
export const YouTubeIcon = (p: P) => (
  <svg {...base(p)} fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" /></svg>
);

export const socialIcon: Record<string, (p: P) => ReactElement> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  TikTok: TikTokIcon,
  YouTube: YouTubeIcon,
};
