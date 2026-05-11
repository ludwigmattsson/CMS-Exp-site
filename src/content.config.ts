
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const imageLinkSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  image: z.string(),
  href: z.string(),
  description: z.string().optional(),
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
    paths: z.array(imageLinkSchema),
    stories: z.array(imageLinkSchema),
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

export const collections = { pages };
