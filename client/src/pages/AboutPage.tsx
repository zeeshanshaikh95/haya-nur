import { Link } from 'react-router-dom';
import { useSettings } from '@/context/SettingsContext';
import { Seo } from '@/components/seo/Seo';
import { assetUrl, FOUNDER_IMAGE } from '@/lib/brand';

export function AboutPage() {
  const { settings } = useSettings();
  const story =
    settings.about.story ||
    'Haya Nur began with a simple frustration: modest clothing that felt considered was hard to find in Mumbai, and what was available rarely felt like it had been chosen by someone who cared.\n\nSo we choose slowly. A handful of pieces at a time, each one selected in person for its fabric, its fall and the way it behaves when worn rather than photographed. We keep the runs small, because a piece you love should not be everywhere.\n\nEverything you see here is packed by us and sent across India, and every order is confirmed personally before payment. If you are unsure about a size, a colour or a fabric, ask — that conversation is the part of this we enjoy most.';
  const paragraphs = story.split('\n').filter((paragraph) => paragraph.trim());

  return (
    <>
      <Seo
        title="The house — Haya Nur"
        description="Haya Nur is a Mumbai label for considered, modest dressing — clothing, elegance and modesty, delivered across India."
        canonicalPath="/about"
      />

      <section className="border-b border-ink/10">
        <div className="shell py-14 sm:py-20">
          <p className="eyebrow">The house</p>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[0.98] text-balance sm:text-7xl">
            Clothing, chosen with intention.
          </h1>
          <div className="mt-8 flex flex-wrap gap-6 text-[10px] uppercase tracking-wide2 text-ink-faint">
            <span>{settings.city || 'Mumbai'}, India</span>
            <span>Est. in the studio</span>
            <span>Delivery across India</span>
          </div>
        </div>
      </section>

      <section className="shell grid gap-10 py-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="aspect-[4/5] overflow-hidden bg-sand/40">
            <img
              src={settings.about.founderImageUrl || assetUrl(FOUNDER_IMAGE)}
              alt="Hand embroidery in the Haya Nur atelier"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mt-3 text-[10px] uppercase tracking-wide2 text-ink-faint">
            Zari work, in progress — the studio
          </p>
        </div>

        <div className="prose-editorial lg:col-span-6 lg:col-start-7">
          <p className="eyebrow">Our story</p>
          <h2 className="mb-6 mt-3 font-display text-4xl leading-tight">
            {settings.about.intro || 'For the woman who loves elegance.'}
          </h2>
          {paragraphs.slice(0, 1).map((paragraph) => (
            <p key="first" className="text-base">{paragraph}</p>
          ))}
          {paragraphs.slice(1).map((paragraph, index) => (
            <p key={`rest-${index}`}>{paragraph}</p>
          ))}

          <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="text-[10px] uppercase tracking-micro text-ink-faint">Clothing · Elegance · Modesty</p>
            <Link to="/shop" className="btn-line mt-4">
              Explore the collection
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-ivory py-14 sm:py-20">
        <div className="shell grid gap-px bg-ink/10 sm:grid-cols-3">
          {[
            ['Fabric first', 'We buy with our hands before our eyes — weight, drape and finish decide what stays.'],
            ['Small runs', 'A few pieces per style, so nothing becomes the uniform of a season.'],
            ['One conversation', 'Sizing, styling and delivery answered by a person, before you pay a rupee.'],
          ].map(([title, text], index) => (
            <div key={title} className="bg-ivory p-7 sm:p-8">
              <p className="text-[10px] tracking-wide2 text-ink-faint">0{index + 1}</p>
              <h3 className="mt-4 font-display text-2xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell py-16 text-center">
        <p className="font-display text-3xl italic leading-snug text-balance sm:text-4xl">
          “Elegance is not about being noticed. It is about being remembered.”
        </p>
        <p className="mt-4 text-[10px] uppercase tracking-micro text-ink-faint">The house note</p>
      </section>
    </>
  );
}
