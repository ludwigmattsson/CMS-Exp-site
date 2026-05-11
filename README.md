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

1. Upload the new image in Pages CMS Media, or GitHub `Add file -> Upload files`, under `public/media`.
2. In Pages CMS, open `Media library`.
3. Add or update a media item:
   - `Image name`: a human-readable name, for example `New hero image`.
   - `Used for`: where the image is intended to be used.
   - `Image path or URL`: `/media/your-file-name.jpg`.
4. Open `Home page`.
5. In `Hero`, `Story strip images`, or `Path card images and links`, choose the media item in the image reference field.

The public site renders the selected `/media/...` path directly.
