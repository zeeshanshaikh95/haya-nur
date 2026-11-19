import mongoose, { Schema, model, type Model } from 'mongoose';

export interface IHeroSlide {
  imageUrl: string;
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  active: boolean;
}

export const HERO_SLIDES_DEFAULT: IHeroSlide[] = [
  {
    imageUrl: '/images/hero-rubaab.jpg',
    eyebrow: 'The Rubaab Edit',
    headline: 'A royal touch of elegance',
    subheadline:
      'Deep red, heavy embroidery and a printed farshi shalwar — a blend of tradition, luxury and timeless beauty.',
    ctaLabel: 'Shop the edit',
    ctaHref: '/shop',
    active: true,
  },
  {
    imageUrl: '/images/hero-elaf.jpg',
    eyebrow: 'Elaf',
    headline: 'Black, but never basic',
    subheadline:
      'A timeless silhouette with effortless elegance, cut for the woman who dresses quietly and is remembered anyway.',
    ctaLabel: 'Discover Elaf',
    ctaHref: '/shop',
    active: true,
  },
  {
    imageUrl: '/images/hero-pista.jpg',
    eyebrow: 'New in',
    headline: 'Softly, into the season',
    subheadline:
      'Pista green, fine lawn and organza that moves with you. Made to be loved, styled and lived in.',
    ctaLabel: 'See new arrivals',
    ctaHref: '/shop?sort=newest',
    active: true,
  },
];

export const WHATSAPP_TEMPLATE_DEFAULT =
  'Assalamu alaikum Haya Nur! 🩶\n' +
  'I would like to order the following:\n' +
  '{{ITEMS}}\n' +
  'Estimated total: {{TOTAL}}\n\n' +
  'Please share sizes, availability and delivery details.';

export const WHATSAPP_TEMPLATE_SINGLE_DEFAULT =
  'Assalamu alaikum Haya Nur! 🩶\n' +
  'I would like to enquire about:\n' +
  '• {{PRODUCT}}\n' +
  '{{VARIANT_LINE}}{{QTY_LINE}}Price: {{PRICE}}\n\n' +
  'Please share availability and delivery details.';

export interface ISiteSettings {
  businessName: string;
  tagline: string;
  whatsappNumber: string;
  instagramUrl: string;
  instagramHandle: string;
  email: string;
  city: string;
  mapsUrl: string;
  whatsappTemplate: string;
  whatsappSingleProductTemplate: string;
  heroSlides: IHeroSlide[];
  about: {
    intro: string;
    story: string;
    founderImageUrl: string;
  };
  announcements: {
    enabled: boolean;
    text: string;
  };
  policies: {
    shipping: string;
    returns: string;
  };
  updatedAt: Date;
}

const slideSchema = new Schema<IHeroSlide>(
  {
    imageUrl: { type: String, default: '' },
    eyebrow: { type: String, default: '' },
    headline: { type: String, default: '' },
    subheadline: { type: String, default: '' },
    ctaLabel: { type: String, default: 'Shop the edit' },
    ctaHref: { type: String, default: '/shop' },
    active: { type: Boolean, default: true },
  },
  { _id: false }
);

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: 'Haya Nur' },
    tagline: { type: String, default: 'Clothing · Elegance · Modesty' },
    whatsappNumber: { type: String, default: '' },
    instagramUrl: { type: String, default: 'https://www.instagram.com/hayanur.clothing/' },
    instagramHandle: { type: String, default: 'hayanur.clothing' },
    email: { type: String, default: '' },
    city: { type: String, default: 'Mumbai' },
    mapsUrl: { type: String, default: '' },
    whatsappTemplate: { type: String, default: WHATSAPP_TEMPLATE_DEFAULT },
    whatsappSingleProductTemplate: { type: String, default: WHATSAPP_TEMPLATE_SINGLE_DEFAULT },
    heroSlides: { type: [slideSchema], default: () => HERO_SLIDES_DEFAULT },
    about: {
      intro: { type: String, default: '' },
      story: { type: String, default: '' },
      founderImageUrl: { type: String, default: '/images/about-atelier.jpg' },
    },
    announcements: {
      enabled: { type: Boolean, default: true },
      text: {
        type: String,
        default: 'Complimentary delivery across India on orders above ₹4,999 · DM to order',
      },
    },
    policies: {
      shipping: { type: String, default: '' },
      returns: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ?? model<ISiteSettings>('SiteSettings', siteSettingsSchema);
