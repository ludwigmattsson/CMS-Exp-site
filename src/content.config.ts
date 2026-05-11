
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const storyCardSchema = z.object({
  order: z.number(),
  title: z.string(),
  image: z.string(),
  href: z.string(),
});

const pathCardSchema = z.object({
  order: z.number(),
  title: z.string(),
  subtitle: z.string(),
  image: z.string(),
  href: z.string(),
  description: z.string(),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pages' }),
  schema: z.object({
    language: z.string().default('en'),
    seo: z.object({
      title: z.string(),
      description: z.string(),
    }),
    hero: z.object({
      eyebrow: z.string(),
      title: z.string(),
      lead: z.string(),
      image: z.string(),
      primaryAction: linkSchema,
      secondaryAction: linkSchema,
    }),
    intro: z.object({
      title: z.string(),
      body: z.string(),
    }),
    principles: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
      }),
    ),
    contact: z.object({
      title: z.string(),
      body: z.string(),
      links: z.array(
        z.object({
          title: z.string(),
          label: z.string(),
          href: z.string(),
          description: z.string(),
        }),
      ),
    }),
  }),
});

const storyCards = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/story-cards' }),
  schema: storyCardSchema,
});

const pathCards = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/path-cards' }),
  schema: pathCardSchema,
});

export const collections = { pages, storyCards, pathCards };
