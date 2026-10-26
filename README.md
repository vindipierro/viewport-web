# Viewport Works Website

Website for **Viewport Works**, a New York technical production company supporting live events, video, audio, playback, broadcast, streaming, engineering, equipment sourcing, and show execution.

Production site: **https://www.viewportworks.com**

## Stack

- React
- Vite
- Plain CSS
- Static deployment on Vercel
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
├── public/
│   ├── 404.html
│   ├── branding/
│   │   ├── square-dark.png
│   │   ├── square-light.png
│   │   ├── text-dark.png
│   │   ├── text-light.png
│   │   └── thumbnail-1.png
│   └── client-logos/
├── src/
│   ├── main.jsx
│   ├── positioning.css
│   ├── siteContent.js
│   └── styles.css
├── .gitignore
├── package.json
└── vite.config.js
```

`src/siteContent.js` is the main content inventory. Client and venue names, services, selected work, contact information, and primary site copy should live there rather than being scattered through the layout.

## Branding assets

The current website uses raster PNG brand assets in `public/branding/` as the source of truth for the Viewport Works identity.

- `text-light.png` — horizontal lockup for dark backgrounds, used in the site header/footer and custom 404 page
- `text-dark.png` — horizontal lockup for light backgrounds
- `square-light.png` — standalone mark for dark backgrounds
- `square-dark.png` — standalone mark for light backgrounds and browser/app icon usage
- `thumbnail-1.png` — social-sharing/Open Graph image

Avoid rebuilding the logo geometry as SVG unless a final approved vector source becomes available. The PNG assets preserve the approved logo proportions and typography.

## Social sharing and metadata

`index.html` contains the canonical URL, site description, Open Graph tags, Twitter card metadata, favicon, and Apple touch icon.

The canonical URL is:

```text
https://www.viewportworks.com/
```

Social previews use:

```text
/branding/thumbnail-1.png
```

This image is referenced by both Open Graph and Twitter metadata so platforms such as iMessage can render a branded link preview.

## Custom 404 page

`public/404.html` provides a simple branded not-found page instead of the default Vercel error page. It uses the current horizontal light logo and links users back to the homepage.

## Mobile Safari

The site explicitly sets the root `html` background and hides horizontal overflow so iOS Safari does not expose white gutters during overscroll. The viewport meta tag also uses `viewport-fit=cover` for modern iPhones.

## Deployment

The site is deployed on Vercel from the `main` branch.

Primary domain:

```text
www.viewportworks.com
```

The root domain should redirect to the `www` hostname so canonical URLs, social metadata, and the public site remain consistent.

## Design direction

The site uses a premium technical-production direction: deep navy backgrounds, cool white typography, restrained cobalt-blue accents, large imagery, minimal UI chrome, and subtle motion.

The brand should feel established, cinematic, and technical without leaning into generic AV clichés.

## Content approach

The homepage is intentionally not an exhaustive case-study archive. It communicates capability through selected production experience, service categories, recognizable client and venue references, photography, and concise positioning.

Where work was completed as part of a larger production team or subcontracted engagement, site language should describe Viewport Works' production experience without implying ownership of the full event.

## Remaining content work

The main remaining content task is replacing placeholder production imagery with final Viewport Works photography and confirming any final labels or selected-work descriptions before treating the site as fully complete.
