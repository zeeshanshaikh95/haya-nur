import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { assetUrl } from '@/lib/brand';
import type { HeroSlide } from '@/types';

const FALLBACK_SLIDE: HeroSlide = {
  imageUrl: '/images/hero-rubaab.jpg',
  eyebrow: 'Haya Nur',
  headline: 'For the woman who loves elegance',
  subheadline:
    'Considered ethnic wear from Mumbai — chosen for its fabric, its fall and the way it makes you feel.',
  ctaLabel: 'Explore the collection',
  ctaHref: '/shop',
  active: true,
};

const AUTOPLAY_MS = 7000;

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HeroSlider() {
  const { settings } = useSettings();

  const slides = useMemo(() => {
    const configured = (settings.heroSlides ?? []).filter(
      (slide) => slide.active && (slide.imageUrl || slide.headline)
    );
    return configured.length ? configured : [FALLBACK_SLIDE];
  }, [settings.heroSlides]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef<number | null>(null);
  const regionRef = useRef<HTMLDivElement>(null);

  const total = slides.length;
  const slide = slides[Math.min(index, total - 1)] ?? FALLBACK_SLIDE;

  const go = useCallback(
    (next: number) => setIndex(((next % total) + total) % total),
    [total]
  );

  useEffect(() => {
    if (index > total - 1) setIndex(0);
  }, [index, total]);

  useEffect(() => {
    if (total < 2 || paused || prefersReducedMotion()) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [total, paused]);

  return (
    <section
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Featured collections"
      className="relative overflow-hidden bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') go(index + 1);
        if (event.key === 'ArrowLeft') go(index - 1);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return;
        const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStart.current;
        if (Math.abs(delta) > 45) go(index + (delta < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      <div className="relative h-[78vh] min-h-[520px] w-full sm:h-[86vh]">
        {slides.map((item, itemIndex) => {
          const isActive = itemIndex === index % total;
          return (
            <div
              key={`${item.imageUrl}-${itemIndex}`}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-editorial ${
                isActive ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              {item.imageUrl ? (
                <img
                  src={item.imageUrl.startsWith('http') ? item.imageUrl : assetUrl(item.imageUrl)}
                  alt={item.headline || 'Haya Nur collection'}
                  className={`h-full w-full object-cover object-[center_28%] ${
                    isActive ? 'animate-ken-burns' : ''
                  }`}
                  loading={itemIndex === 0 ? 'eager' : 'lazy'}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
            </div>
          );
        })}

        {/* Copy */}
        <div className="absolute inset-0 flex items-end">
          <div className="shell w-full pb-14 sm:pb-20">
            <div key={index} className="max-w-2xl animate-fade-up">
              <p className="text-[10px] uppercase tracking-micro text-ivory/70">
                {slide.eyebrow || 'Haya Nur'}
              </p>
              <h1 className="mt-4 font-display text-[2.6rem] leading-[1.02] text-ivory text-balance sm:text-6xl lg:text-7xl">
                {slide.headline || 'For the woman who loves elegance'}
              </h1>
              {slide.subheadline ? (
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-ivory/75 sm:text-base">
                  {slide.subheadline}
                </p>
              ) : null}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to={slide.ctaHref || '/shop'}
                  className="btn border-ivory bg-ivory text-ink hover:bg-transparent hover:text-ivory"
                >
                  {slide.ctaLabel || 'Shop the edit'}
                </Link>
                <Link
                  to="/shop?sort=newest"
                  className="btn border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory/10"
                >
                  New in
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        {total > 1 ? (
          <div className="absolute inset-x-0 bottom-0 border-t border-ivory/15">
            <div className="shell flex items-center justify-between gap-6 py-4">
              <div className="flex items-center gap-4">
                <span className="font-display text-lg text-ivory">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="h-px w-10 bg-ivory/30" />
                <span className="text-[10px] tracking-wide2 text-ivory/50">
                  {String(total).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 sm:flex" role="tablist" aria-label="Slides">
                  {slides.map((_item, itemIndex) => (
                    <button
                      key={`dot-${itemIndex}`}
                      type="button"
                      role="tab"
                      aria-selected={itemIndex === index}
                      aria-label={`Go to slide ${itemIndex + 1}`}
                      onClick={() => go(itemIndex)}
                      className={`h-px w-8 transition-all duration-500 ${
                        itemIndex === index ? 'bg-ivory' : 'bg-ivory/30 hover:bg-ivory/60'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous slide"
                    onClick={() => go(index - 1)}
                    className="flex h-10 w-10 items-center justify-center border border-ivory/30 text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-ink"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Next slide"
                    onClick={() => go(index + 1)}
                    className="flex h-10 w-10 items-center justify-center border border-ivory/30 text-ivory transition-colors hover:border-ivory hover:bg-ivory hover:text-ink"
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
