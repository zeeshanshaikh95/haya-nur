import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useSettings } from '@/context/SettingsContext';
import { Wordmark } from '@/components/Wordmark';

const NAV_ITEMS = [
  { to: '/shop', label: 'Shop' },
  { to: '/category/farshi-shalwar', label: 'Farshi' },
  { to: '/about', label: 'The House' },
  { to: '/gallery', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();
  const { settings } = useSettings();
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-bone/95 backdrop-blur-sm">
      {settings.announcements.enabled && settings.announcements.text ? (
        <div className="bg-ink px-4 py-2 text-center text-[10px] uppercase tracking-wide2 text-ivory/85">
          {settings.announcements.text}
        </div>
      ) : null}

      <div className="shell flex h-[74px] items-center justify-between gap-4 border-b border-ink/10 sm:h-20">
        <nav className="hidden flex-1 items-center gap-7 lg:flex" aria-label="Primary">
          {NAV_ITEMS.slice(0, 3).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-[10px] uppercase tracking-wide2 transition-colors ${
                  isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-1 justify-start lg:justify-center">
          <Wordmark size="sm" withTagline={false} />
        </div>

        <div className="flex flex-1 items-center justify-end gap-1 sm:gap-3">
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Secondary">
            {NAV_ITEMS.slice(3).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `text-[10px] uppercase tracking-wide2 transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-soft hover:text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <a
            href={settings.instagramUrl || 'https://www.instagram.com/hayanur.clothing/'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hidden p-2 text-ink-soft transition-colors hover:text-ink sm:block"
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.3">
              <rect x="3.5" y="3.5" width="17" height="17" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
          </a>

          <button
            type="button"
            onClick={openCart}
            className="relative p-2 text-ink transition-opacity hover:opacity-60"
            aria-label={`Open bag (${count} items)`}
          >
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M5 8h14l-1 12H6L5 8z" />
              <path d="M9 8a3 3 0 016 0" />
            </svg>
            {count > 0 ? (
              <span className="absolute -right-0.5 -top-1 flex h-4 min-w-[1rem] items-center justify-center bg-ink px-1 text-[9px] font-medium text-ivory">
                {count}
              </span>
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="p-2 text-ink lg:hidden"
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M4 8h16M4 16h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-b border-ink/10 bg-bone px-5 pb-6 pt-2 lg:hidden" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block border-b border-ink/5 py-3.5 font-display text-xl ${
                  isActive ? 'text-ink' : 'text-ink-soft'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/reviews" className="mt-4 inline-block text-[10px] uppercase tracking-wide2 text-ink-soft">
            Reviews
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
