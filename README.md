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
