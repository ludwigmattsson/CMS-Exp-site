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

1. Open `Home page` in Pages CMS to edit the hero image and page text.
2. Open `Home story images` to edit the three story-strip images.
3. Open `Home path cards` to edit the four path-card images.
4. Use each image field to select an existing image from `public/media`, or upload a new one.
5. Save the edited entry.

The public site renders the selected `/media/...` path directly, so the visual design stays unchanged.
