import { Link } from 'react-router-dom';
import { publicApi } from '@/api/endpoints';
import { useApi } from '@/hooks/useApi';
import { useSettings } from '@/context/SettingsContext';
import { HeroSlider } from '@/components/HeroSlider';
import { ProductCard } from '@/components/ProductCard';
import { SectionIntro } from '@/components/SectionIntro';
import { Seo } from '@/components/seo/Seo';
import { EmptyState } from '@/components/EmptyState';
import { Stars } from '@/components/Stars';
import { assetUrl, FOUNDER_IMAGE } from '@/lib/brand';
import { buildOrderLink, buildSingleProductMessage } from '@/lib/whatsapp';

const PROMISES = [
  {
    title: 'Chosen in person',
    text: 'Every piece is selected by hand — for the fabric first, then the fall, then the finish.',
  },
  {
    title: 'Modest by design',
    text: 'Cuts and drapes that keep their composure, from a morning at work to a wedding at night.',
  },
  {
    title: 'Sent from Mumbai',
    text: 'Packed by us and delivered across India. Sizes and availability confirmed before you pay.',
  },
];

export function HomePage() {
  const { settings } = useSettings();
  const newIn = useApi(() => publicApi.listProducts({ sort: 'newest' }).then((r) => r.products), []);
  const bestsellers = useApi(() => publicApi.listProducts({ sort: 'bestseller' }).then((r) => r.products), []);
  const categories = useApi(() => publicApi.listCategories().then((r) => r.categories), []);
  const reviews = useApi(() => publicApi.listReviews().then((r) => r.reviews), []);
  const gallery = useApi(() => publicApi.listGallery().then((r) => r.items), []);

  const orderLink = buildOrderLink(
    settings,
    buildSingleProductMessage(settings, {
      productName: 'your collection',
      variantName: null,
      quantity: 1,
      price: null,
    })
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ClothingStore',
    name: settings.businessName,
    description: settings.about.intro || 'Modest ethnic wear from Mumbai.',
    address: { '@type': 'PostalAddress', addressLocality: settings.city || 'Mumbai', addressCountry: 'IN' },
    ...(settings.instagramUrl ? { sameAs: [settings.instagramUrl] } : {}),
  };

  return (
    <>
      <Seo
        title="Haya Nur — Clothing · Elegance · Modesty"
        description="Modest ethnic wear from Mumbai — embroidered ensembles, farshi shalwar sets and dupattas. Order on WhatsApp with delivery across India."
        canonicalPath="/"
        jsonLd={jsonLd}
      />

      <HeroSlider />

      {/* Values strip */}
      <section className="border-b border-ink/10">
        <div className="shell grid divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ['Clothing, chosen slowly', 'Small runs, no filler'],
            ['Made for modesty', 'Covered, never plain'],
            ['Mumbai atelier', 'Shipped across India'],
          ].map(([title, note], index) => (
            <div key={title} className="flex items-baseline gap-4 py-5 sm:justify-center sm:px-6">
              <span className="text-[10px] tracking-wide2 text-ink-faint">0{index + 1}</span>
              <div>
                <p className="font-display text-lg leading-none">{title}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wide2 text-ink-faint">{note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* New in */}
      <section className="shell py-16 sm:py-20">
        <SectionIntro
          eyebrow="Just arrived"
          title="New in the house"
          description="The latest edit — soft lawn, worked net and the dupattas that finish them."
          linkTo="/shop?sort=newest"
          linkLabel="All new arrivals"
        />

        {newIn.loading ? (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton aspect-[3/4]" />
            ))}
          </div>
        ) : newIn.error ? (
          <div className="mt-10">
            <EmptyState tone="error" title="We couldn't load the collection" description={newIn.error} action={
              <button type="button" className="btn-line" onClick={newIn.refetch}>Try again</button>
            } />
          </div>
        ) : !newIn.data?.length ? (
          <div className="mt-10">
            <EmptyState
              title="The collection is being photographed"
              description="New pieces will appear here as soon as they are ready. Follow along on Instagram in the meantime."
            />
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {newIn.data.slice(0, 4).map((product, index) => (
              <ProductCard key={product._id} product={product} priority={index < 2} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="border-y border-ink/10 bg-ivory py-16 sm:py-20">
        <div className="shell">
          <SectionIntro eyebrow="Shop by edit" title="Four ways to wear Haya Nur" linkTo="/shop" linkLabel="Everything" />

          {categories.loading ? (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="skeleton aspect-[3/4]" />
              ))}
            </div>
          ) : !categories.data?.length ? (
            <div className="mt-10">
              <EmptyState title="Edits are on their way" description="Collections appear here once the catalogue is published." />
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {categories.data.slice(0, 4).map((category, index) => (
                <Link
                  key={category._id}
                  to={`/category/${category.slug}`}
                  className={`group relative block overflow-hidden bg-sand/40 ${
                    index === 0 ? 'col-span-2 aspect-[16/11] lg:aspect-[3/4]' : 'aspect-[3/4]'
                  }`}
                >
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1100ms] ease-editorial group-hover:scale-105"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <p className="text-[9px] uppercase tracking-micro text-ivory/60">Edit {String(index + 1).padStart(2, '0')}</p>
                    <h3 className="mt-2 font-display text-2xl leading-tight text-ivory">{category.name}</h3>
                    <span className="mt-3 inline-flex items-center gap-2 text-[9px] uppercase tracking-wide2 text-ivory/80">
                      Explore
                      <span className="h-px w-5 bg-ivory/60 transition-all duration-300 group-hover:w-8" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* House story */}
      <section className="shell grid items-center gap-10 py-16 sm:py-24 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <div className="aspect-[4/3] overflow-hidden bg-sand/40">
            <img
              src={settings.about.founderImageUrl || assetUrl(FOUNDER_IMAGE)}
              alt="Hand embroidery in the Haya Nur atelier"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 right-4 hidden border border-ink/10 bg-bone px-5 py-4 sm:block">
            <p className="font-display text-3xl leading-none">01</p>
            <p className="mt-1 text-[9px] uppercase tracking-micro text-ink-faint">Atelier, Mumbai</p>
          </div>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <p className="eyebrow">The house</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] sm:text-5xl">
            For the woman who loves elegance
          </h2>
          <p className="mt-5 text-sm leading-[1.85] text-ink-soft">
            {settings.about.intro ||
              'Haya Nur is a Mumbai label for considered, modest dressing — pieces chosen for their fabric, their fall and the quiet confidence they give the woman wearing them.'}
          </p>
          <Link to="/about" className="mt-7 inline-flex items-center gap-3 text-[10px] uppercase tracking-wide2 text-ink">
            Read the house story
            <span className="h-px w-8 bg-ink" />
          </Link>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="shell pb-16 sm:pb-20">
        <SectionIntro
          eyebrow="Loved most"
          title="The pieces she keeps coming back to"
          linkTo="/shop?sort=bestseller"
          linkLabel="Shop bestsellers"
        />

        {bestsellers.loading ? (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="skeleton aspect-[3/4]" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
            {(bestsellers.data ?? []).slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Promise */}
      <section className="border-y border-ink/10 bg-ivory py-16 sm:py-20">
        <div className="shell">
          <div className="max-w-2xl">
            <p className="eyebrow">How we work</p>
            <h2 className="mt-3 font-display text-3xl leading-tight sm:text-[2.6rem]">
              Fewer pieces, chosen properly
            </h2>
          </div>
          <div className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-3">
            {PROMISES.map((promise, index) => (
              <div key={promise.title} className="bg-ivory p-6 sm:p-8">
                <p className="text-[10px] tracking-wide2 text-ink-faint">0{index + 1}</p>
                <h3 className="mt-4 font-display text-2xl">{promise.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{promise.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery.data?.length ? (
        <section className="shell py-16 sm:py-20">
          <SectionIntro
            eyebrow={`@${settings.instagramHandle.replace(/^@/, '')}`}
            title="From the feed"
            linkTo="/gallery"
            linkLabel="Open the journal"
          />
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {gallery.data.slice(0, 6).map((item) => (
              <a
                key={item._id}
                href={item.externalUrl || settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/5] overflow-hidden bg-sand/40"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.caption || 'Haya Nur on Instagram'}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                ) : null}
                <span className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/20" />
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {/* Reviews */}
      <section className="shell pb-16 sm:pb-20">
        {reviews.data?.length ? (
          <>
            <SectionIntro eyebrow="In their words" title="Worn and loved" linkTo="/reviews" linkLabel="All reviews" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {reviews.data.slice(0, 3).map((review) => (
                <figure key={review._id} className="panel flex flex-col p-6">
                  <Stars rating={review.rating} />
                  <blockquote className="mt-4 flex-1 font-display text-xl leading-snug">“{review.text}”</blockquote>
                  <figcaption className="mt-5 text-[10px] uppercase tracking-wide2 text-ink-faint">
                    {review.customerName}
                  </figcaption>
                </figure>
              ))}
            </div>
          </>
        ) : null}
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-ink py-20 sm:py-28">
        <div className="shell relative flex flex-col items-center text-center">
          <p className="text-[10px] uppercase tracking-micro text-ivory/50">Not sure about sizing?</p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl leading-[1.05] text-ivory text-balance sm:text-6xl">
            Tell us the occasion. We’ll find the piece.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/60">
            Send us a message and we’ll help with sizing, fabric and delivery — the way a shop assistant
            would, if the shop were a phone.
          </p>
          {orderLink ? (
            <a
              href={orderLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn mt-8 border-ivory bg-ivory text-ink hover:bg-transparent hover:text-ivory"
            >
              {orderLink.channel === 'whatsapp' ? 'Message us on WhatsApp' : 'Message us on Instagram'}
            </a>
          ) : null}
          <p className="mt-4 text-[10px] uppercase tracking-wide2 text-ivory/35">
            {settings.city ? `${settings.city} · ` : ''}Delivery across India
          </p>
        </div>
      </section>
    </>
  );
}
