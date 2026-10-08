# Viewport Works Website

Website for **Viewport Works**, a New York-based technical production company supporting live events, broadcast, streaming, video, audio, and technical direction.

The site is currently in active development. The first visual pass uses placeholder production imagery and placeholder client names while the final Viewport Works brand assets, photography, client list, and selected work are assembled.

## Stack

- React
- Vite
- Plain CSS
- No backend required for the current site

## Run locally

Use a current Node.js LTS release.

```bash
npm install
npm run dev
```

Vite will print the local development URL, usually `http://localhost:5173`.

For a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
viewport-web/
├── index.html
├── src/
│   ├── main.jsx
│   ├── siteContent.js
│   └── styles.css
├── .gitignore
├── package.json
└── vite.config.js
```

`src/siteContent.js` is the main editable content inventory. Client names, services, selected work, contact information, and placeholder image URLs should live there rather than being scattered through the layout.

## Current content placeholders

The following items still need final content:

- Client / organization names and eventual logo assets
- Viewport Works logo / wordmark
- Hero production image
- Selected work photography and final labels
- About / founder photography
- Final contact email
- Any featured testimonials
- Final SEO/social-sharing imagery and metadata

The current stock photography is for composition and layout only. It should be replaced with real Viewport Works production photography before launch.

## Design direction

The working direction is dark, cinematic, professional, and understated, with deep navy tones, cool white typography, restrained blue-violet accents, large production imagery, and subtle motion. The company remains the primary brand while still presenting Viewport Works as founder-led.

## Content approach

The site is intentionally not structured as an exhaustive case-study archive. The homepage should communicate capability quickly through selected experience, service categories, strong photography, and a small number of highlighted productions where useful.
