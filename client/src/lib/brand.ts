const BASE = import.meta.env.BASE_URL;

/** Fallback hero image when no slide is configured. */
export const HERO_IMAGE = `${BASE}images/hero-rubaab.jpg`;

/** Atelier / founder visual used when settings hold no custom image. */
export const FOUNDER_IMAGE = `${BASE}images/about-atelier.jpg`;

export const OG_IMAGE = `${BASE}images/hero-rubaab.jpg`;

export const SITE_URL =
  (import.meta.env.VITE_PUBLIC_SITE_URL ?? '').trim() || 'http://localhost:5173';

/** Absolute asset URL that respects Vite's BASE_URL. */
export function assetUrl(path: string): string {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  if (path.startsWith('/')) return `${BASE.replace(/\/$/, '')}${path}`;
  return `${BASE}${path}`;
}
