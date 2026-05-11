# Tegel Astro CMS Site

This is a separate Astro + Pages CMS version of the Tegel landing page concept. It does not modify the existing `exp site` React/Vite app.

## What is CMS-managed

- Page SEO
- Hero copy, buttons, and image
- Intro copy
- Principle cards
- Path cards
- Story cards
- Contact cards
- Media under `public/media`

The editable content lives in:

```txt
src/content/pages/home.json
```

Pages CMS reads its editor configuration from:

```txt
.pages.yml
```

## Run locally

Install dependencies, then start Astro:

```sh
npm install
npm run dev
```

Build for deployment:

```sh
npm run build
```

## CMS setup

1. Push this folder as its own GitHub repository, or move these files to the root of the repository you want Pages CMS to edit.
2. Connect the repository in Pages CMS.
3. Pages CMS will read `.pages.yml` from the repository root and expose the home page fields.

Astro's content collection schema is in `src/content.config.ts`, so invalid CMS data fails during build instead of silently shipping broken content.

## Pages CMS editing structure

The Pages CMS home editor is structured in numbered sections:

1. Image library - previews every page image in one place.
2. SEO and browser title.
3. Hero section.
4. Intro section.
5. Principle cards.
6. Path cards.
7. Story cards.
8. Contact section.

The image library is intended as a quick visual overview. The actual page content still uses the image fields inside Hero, Path cards, and Story cards.

