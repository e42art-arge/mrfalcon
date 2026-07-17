import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const reviews = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/reviews" }),
  schema: z.object({
    name: z.string(),
    branch: z.string(),
    quote: z.string(),
    rating: z.number().min(1).max(5),
    source: z.string().default('Google'),
    category: z.string().optional(),
  }),
});

const faq = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional(),
    order: z.number().default(0),
  }),
});

const branches = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/branches" }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    district: z.string(),
    address: z.string(),
    phone: z.string(),
    whatsapp: z.string(),
    hours: z.string().optional(),
    mapEmbed: z.string().optional(),
    image: z.string().optional(),
  }),
});

const tech = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/tech" }),
  schema: z.object({
    name: z.string(),
    wavelength: z.string().optional(),
    description: z.string(),
    icon: z.string().optional(),
  }),
});

export const collections = { reviews, faq, branches, tech };
