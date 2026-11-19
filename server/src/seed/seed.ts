/**
 * Seeds the database.
 *
 *   npm run seed          → bootstrap admin + settings, then add the starter
 *                           catalogue only when no products exist yet
 *   npm run seed:reset    → wipe catalogue records and re-create them
 *
 * Product names and copy come from the brand's own Instagram posts where they
 * are public (Rubaab, Elaf, sizes and fabric descriptions). Pieces without a
 * public name use descriptive working titles so nothing is invented as fact —
 * rename or remove them in Admin → Products.
 */
import mongoose from 'mongoose';
import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Category } from '../models/category.model.js';
import { GalleryItem } from '../models/galleryItem.model.js';
import { Product } from '../models/product.model.js';
import { Review } from '../models/review.model.js';
import { bootstrap } from './bootstrap.js';

const reset = process.argv.includes('--reset');

const categories = [
  {
    name: 'Farshi Shalwar',
    slug: 'farshi-shalwar',
    description: 'Voluminous printed shalwars, cut long and finished by hand.',
    image: '/images/p-rubaab.jpg',
    displayOrder: 1,
  },
  {
    name: 'Embroidered Ensembles',
    slug: 'embroidered-ensembles',
    description: 'Heavily worked pieces for the evenings that matter.',
    image: '/images/p-net.jpg',
    displayOrder: 2,
  },
  {
    name: 'Lawn & Everyday',
    slug: 'lawn-everyday',
    description: 'Light, breathable suits for the ordinary days you still want to look lovely for.',
    image: '/images/p-lawn.jpg',
    displayOrder: 3,
  },
  {
    name: 'Hijabs & Dupattas',
    slug: 'hijabs-dupattas',
    description: 'Chiffon, organza and net finishes in the house palette.',
    image: '/images/p-shawl.jpg',
    displayOrder: 4,
  },
];

const sizesToVariants = (sizes: string[]) =>
  sizes.map((name) => ({ name, price: null as number | null, stockStatus: 'in_stock' as const }));

const products = [
  {
    name: 'Rubaab',
    slug: 'rubaab',
    description:
      'A royal touch of elegance. A deep-red ensemble with intricate heavy embroidery, paired with a beautifully printed farshi shalwar and a graceful dupatta — tradition, luxury and timeless beauty in one piece.',
    price: null,
    compareAtPrice: null,
    fabric: 'Embroidered chiffon shirt · printed farshi shalwar · sheer dupatta',
    care: 'Dry clean only. Store folded with the dupatta rolled separately to protect the embroidery.',
    colour: 'Deep red',
    categorySlug: 'farshi-shalwar',
    images: ['/images/hero-rubaab.jpg', '/images/p-rubaab.jpg'],
    variants: sizesToVariants(['L', 'XL', '2XL', '3XL']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 1,
  },
  {
    name: 'Elaf',
    slug: 'elaf',
    description:
      'Black, but never basic. A timeless silhouette with effortless elegance — a longline embroidered kurta, wide trousers and a soft dupatta that falls exactly where it should.',
    price: null,
    compareAtPrice: null,
    fabric: 'Embroidered kurta · wide-leg trouser · soft chiffon dupatta',
    care: 'Dry clean recommended. Cool iron on the reverse, never directly on the embroidery.',
    colour: 'Black',
    categorySlug: 'embroidered-ensembles',
    images: ['/images/hero-elaf.jpg', '/images/p-net.jpg'],
    variants: sizesToVariants(['M', 'L', 'XL', '2XL', '3XL']),
    bestseller: true,
    featured: true,
    newArrival: false,
    displayOrder: 2,
  },
  {
    name: 'Pista Green Lawn Suit',
    slug: 'pista-green-lawn-suit',
    description:
      'Softly, into the season. A pale pistachio three-piece in fine lawn with delicate lace edging and an organza dupatta that moves with you.',
    price: null,
    compareAtPrice: null,
    fabric: 'Printed lawn shirt · lawn trouser · organza dupatta',
    care: 'Gentle hand wash separately in cold water. Line dry in shade.',
    colour: 'Pista green',
    categorySlug: 'lawn-everyday',
    images: ['/images/hero-pista.jpg', '/images/p-lawn.jpg'],
    variants: sizesToVariants(['S', 'M', 'L', 'XL', '2XL']),
    bestseller: false,
    featured: true,
    newArrival: true,
    displayOrder: 3,
  },
  {
    name: 'Black Net Embroidered Set',
    slug: 'black-net-embroidered-set',
    description:
      'Sheer net worked with fine silver thread, finished with a scalloped dupatta. Made for the evenings when you want to be looked at twice.',
    price: null,
    compareAtPrice: null,
    fabric: 'Net with silver thread embroidery · lined inner · scalloped dupatta',
    care: 'Dry clean only. Handle the scalloped edge with care.',
    colour: 'Black · silver',
    categorySlug: 'embroidered-ensembles',
    images: ['/images/p-net.jpg'],
    variants: sizesToVariants(['M', 'L', 'XL', '2XL']),
    bestseller: false,
    featured: false,
    newArrival: true,
    displayOrder: 4,
  },
  {
    name: 'Chiffon Dupatta — House Palette',
    slug: 'chiffon-dupatta-house-palette',
    description:
      'A fine crinkle chiffon dupatta in the house palette — sage, ivory, taupe and charcoal. The easiest way to finish a look.',
    price: null,
    compareAtPrice: null,
    fabric: 'Crinkle chiffon · hand-finished edges',
    care: 'Hand wash cold, do not wring. Steam lightly.',
    colour: 'Sage · ivory · taupe · charcoal',
    categorySlug: 'hijabs-dupattas',
    images: ['/images/p-shawl.jpg'],
    variants: [
      { name: 'Sage', price: null as number | null, stockStatus: 'in_stock' as const },
      { name: 'Ivory', price: null as number | null, stockStatus: 'in_stock' as const },
      { name: 'Taupe', price: null as number | null, stockStatus: 'in_stock' as const },
      { name: 'Charcoal', price: null as number | null, stockStatus: 'in_stock' as const },
    ],
    bestseller: false,
    featured: false,
    newArrival: true,
    displayOrder: 5,
  },
];

const gallery = [
  { image: '/images/hero-rubaab.jpg', caption: 'Rubaab — the deep red edit', externalUrl: 'https://www.instagram.com/hayanur.clothing/', displayOrder: 1 },
  { image: '/images/hero-elaf.jpg', caption: 'Elaf — black, but never basic', externalUrl: 'https://www.instagram.com/hayanur.clothing/', displayOrder: 2 },
  { image: '/images/hero-pista.jpg', caption: 'Pista, softly', externalUrl: 'https://www.instagram.com/hayanur.clothing/', displayOrder: 3 },
  { image: '/images/p-shawl.jpg', caption: 'The dupatta shelf', externalUrl: 'https://www.instagram.com/hayanur.clothing/', displayOrder: 4 },
  { image: '/images/p-net.jpg', caption: 'Silver on net', externalUrl: 'https://www.instagram.com/hayanur.clothing/', displayOrder: 4 },
  { image: '/images/about-atelier.jpg', caption: 'Handwork in the atelier', externalUrl: 'https://www.instagram.com/hayanur.clothing/', displayOrder: 6 },
];

async function main(): Promise<void> {
  await connectDatabase();
  await bootstrap();

  const existingProducts = await Product.countDocuments();
  if (existingProducts > 0 && !reset) {
    console.log(`[seed] ${existingProducts} products already present — catalogue seed skipped`);
  } else {
    if (reset) {
      await Promise.all([
        Product.deleteMany({}),
        Category.deleteMany({}),
        Review.deleteMany({}),
        GalleryItem.deleteMany({}),
      ]);
      console.log('[seed] catalogue cleared');
    }

    const categoryIds = new Map<string, mongoose.Types.ObjectId>();
    for (const category of categories) {
      const created = await Category.create(category);
      categoryIds.set(category.slug, created._id as mongoose.Types.ObjectId);
    }
    console.log(`[seed] ${categories.length} categories created`);

    for (const product of products) {
      const { categorySlug, ...rest } = product;
      await Product.create({
        ...rest,
        category: categoryIds.get(categorySlug) ?? null,
      });
    }
    console.log(`[seed] ${products.length} products created`);

    await GalleryItem.create(gallery);
    console.log(`[seed] ${gallery.length} gallery images created`);

    console.log('[seed] reviews are left empty — add real customer words in Admin → Reviews');
  }

  await disconnectDatabase();
  console.log('[seed] done');
}

main().catch(async (err) => {
  console.error('[seed] failed', err);
  await disconnectDatabase().catch(() => undefined);
  process.exit(1);
});
