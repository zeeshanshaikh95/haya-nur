import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Wordmark } from '@/components/Wordmark';
import { normaliseNumber } from '@/lib/whatsapp';

export function Footer() {
  const { settings } = useSettings();
  const whatsapp = normaliseNumber(settings.whatsappNumber);
  const instagram = settings.instagramUrl || 'https://www.instagram.com/hayanur.clothing/';

  return (
    <footer className="mt-24 border-t border-ink/10 bg-bone">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:py-16">
        <div>
          <Wordmark size="md" asLink={false} className="items-start" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-soft">
            {settings.about.intro ||
              'Modest ethnic wear from Mumbai — chosen for its fabric, its fall and the way it makes you feel.'}
          </p>
        </div>

        <div>
          <p className="eyebrow">Shop</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            <li><Link to="/shop" className="hover:text-ink">All pieces</Link></li>
            <li><Link to="/shop?sort=newest" className="hover:text-ink">New in</Link></li>
            <li><Link to="/category/embroidered-ensembles" className="hover:text-ink">Occasion wear</Link></li>
            <li><Link to="/category/hijabs-dupattas" className="hover:text-ink">Hijabs & dupattas</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">House</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            <li><Link to="/about" className="hover:text-ink">The house</Link></li>
            <li><Link to="/gallery" className="hover:text-ink">Journal</Link></li>
            <li><Link to="/reviews" className="hover:text-ink">Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-ink">Shipping & contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Reach us</p>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {whatsapp ? (
              <li>
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                  WhatsApp
                </a>
              </li>
            ) : null}
            <li>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                Instagram · @{settings.instagramHandle.replace(/^@/, '')}
              </a>
            </li>
            {settings.email ? (
              <li><a href={`mailto:${settings.email}`} className="hover:text-ink">{settings.email}</a></li>
            ) : null}
            <li>{settings.city}{settings.city ? ', India' : ''}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="shell flex flex-col items-start justify-between gap-3 py-5 text-[10px] uppercase tracking-wide2 text-ink-faint sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {settings.businessName}. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link to="/contact" className="hover:text-ink">Policies</Link>
            <Link to="/admin" className="hover:text-ink">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
