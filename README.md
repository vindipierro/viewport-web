# Viewport Works Website

A New York technical production partner for event planners, agencies, producers, venues and corporate teams. Production: https://www.viewportworks.com

## Stack and local work

React, Vite, plain CSS and one Vercel Node function. No router, UI library, form SDK or database dependency. Node 24 matches the existing Vercel project.

```bash
npm ci
npm run dev
npm test
npm run build
npm run preview
```

`npm run dev` serves both pages for frontend development. Local email-function testing requires `vercel dev` with server-only development variables. Vite's dev/preview commands do not execute `api/inquiry.js`.

The build makes separate HTML entries for `/` and `/event-planners`, then uses Vite's SSR build and React's existing server renderer to pre-render both routes. The temporary `.prerender` output is removed. Content and metadata are readable in the first HTML response, with interactive components hydrated in the browser.

## Structure

- `src/siteContent.js`: content, ordered brands/venues, capabilities, process, partnership modes, experience areas and form choices.
- `src/App.jsx`: shared layout, homepage and event planner page.
- `src/InquiryForm.jsx`: accessible production quote form and asynchronous feedback.
- `src/styles.css`, `src/positioning.css`: approved base visual language and positioning refinements.
- `src/main.jsx`, `src/entry-server.jsx`, `scripts/prerender.mjs`: browser hydration and build-time rendering.
- `index.html`, `event-planners/index.html`: route-specific metadata, canonical and social tags.
- `api/inquiry.js`: validated, server-side email delivery.
- `tests/inquiry.test.mjs`: input, transport, spam trap, configuration and provider-result tests.
- `vercel.json`: clean URLs and security headers; unmatched pages keep the existing branded 404.
- `docs/website-repositioning-research.md`: research, source limitations and implementation rationale.

## Enable inquiry delivery

The frontend POSTs JSON to `/api/inquiry`. Delivery is intentionally unavailable until these server-only variables are configured in Vercel:

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | A sending-only Resend key scoped to the verified sender domain. Store as a secret. |
| `INQUIRY_FROM_EMAIL` | A verified sender, for example `Viewport Works <inquiries@viewportworks.com>`. |
| `INQUIRY_TO_EMAIL` | Optional destination override. Defaults to `hello@viewportworks.com`. |

Use the existing Resend account/domain if available. Authenticate the sending domain with Resend before selecting the sender. Put values directly in the Vercel dashboard, not in Git or chat. Never prefix these variables with `VITE_`. `.env.example` contains empty placeholders for local setup; `.env.local` and Vercel local files are ignored.

For preview testing, scope variables to Preview and the `website-repositioning` branch, using a test inbox if desired. Configuration changes require a new preview deployment. Production variables should be configured by the owner only when the production release is approved. This branch must not be merged or promoted as part of preview review.

After configuring, submit an explicitly labeled test inquiry and confirm receipt in the destination mailbox. The success message means the email provider accepted the message; it does not guarantee inbox delivery. Check Resend delivery/bounce logs for delivery issues. No automatic message is sent to the person making the inquiry.

Without configuration, the endpoint returns HTTP 503. The form keeps the entered data, announces the problem and offers `hello@viewportworks.com` as a direct alternative. It does not open an email client automatically, store an unsubmitted lead or claim the inquiry was received.

The function validates lengths, email, dates, attendance and allowlisted choices, bounds payload size, rejects cross-origin browser submissions, uses a honeypot and sends plain text with a fixed sender/recipient. The visitor's email is `reply_to`, never the sender. The request UUID becomes the provider idempotency key so retries of an unchanged brief do not send duplicate mail. Provider errors and secrets are never returned to the browser. There is no persistence or attachment upload. Enable an appropriate Vercel WAF rate-limit rule for `/api/inquiry` before enabling public delivery if abuse protection beyond the honeypot and provider limits is needed; no unreliable in-memory global limiter is claimed.

## Preview workflow

All repositioning changes belong on `website-repositioning`. Vercel should build non-production Git branches as Preview. If Git deployment does not run, create a Preview for the same repository branch and exact commit in the existing `viewport-web` project. Never use `--prod`, promote, change production domains or merge while reviewing.

The existing Vercel deployment-protection settings are retained. A reviewer may need to sign into the authorized Vercel team to see a preview.

## Brand and content rules

The PNG lockups in `public/branding` remain the approved source of truth. Do not reconstruct the logo geometry. `/branding/thumbnail-1.png` remains the social image. Fonts, navy/cream palette, editorial sections and restrained blue accents are retained.

Brand/venue references are experience, including direct and collaborative engagements. Preserve the disclaimer. Do not imply sole ownership or a direct relationship from a logo alone. Logos have a deliberate order beginning BlackRock, Macy's, FIFA, United Nations, Javits, Cipriani, Anthropic and One World Trade Center.

The work cards remain experience areas with illustrative imagery, not fabricated individual case studies. Their data supports event type, role, disciplines and an optional location. Add a location, client, production date, result or project photograph only after verification. The pending real-photo/content work is unchanged.

## SEO

Both pages have their own static title, description, canonical URL, Open Graph and Twitter tags. Shared Organization JSON-LD contains only known organization details, with no invented address, ratings or statistics. `public/sitemap.xml` lists the two routes. Vercel preview indexing protection is retained.
