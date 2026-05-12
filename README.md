# CMS Exp Site

Astro + Pages CMS wrapper for the original `exp site` React/Tegel package.

The public design is intentionally preserved from `exp site`. Pages CMS only edits the data used by that design:

- Hero title, lead, poster image, and buttons
- Intro title and body
- Principle cards
- Path card text, links, and images
- Story card text, links, and images
- Contact section text and links

CMS content:

```txt
src/content/pages/home.json 
```

Pages CMS configuration:

```txt
.pages.yml
```

Astro renders the original React app through:

```txt
src/pages/index.astro
src/App.tsx
```

Run locally after installing dependencies:

```sh
npm install
npm run dev
```

Build:

```sh
npm run build
```

## Change images in Pages CMS

Do not edit `.jpg` or `.png` files in GitHub. They are binary files, so GitHub cannot edit their contents.

Use this flow instead:

1. Open `Home page` in Pages CMS.
2. Open `01. Text and hero`, `02. Story images`, or `03. Path cards`.
3. To replace an existing image, click the trash icon on the current preview first. This only clears the field; it does not delete the image file.
4. Use `Select` to choose an existing image from `public/media`, or `Upload` to add a new one.
5. Save the edited entry.

The public site renders the selected `/media/...` path directly, so the visual design stays unchanged.

## Link domains in Pages CMS

The CMS follows the useful part of the Pages CMS blog template: collection rows show the most important editing context directly in the list.

For `02. Story images` and `03. Path cards`, Pages shows the image, title, link domain, URL, and order in the collection list. Hero and contact links show `Link domain` next to each URL inside `01. Text and hero`.
