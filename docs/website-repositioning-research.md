# Website repositioning research

Reviewed 26 October 2026. Strategy: premium technical production for event planners, agencies, producers, venues and corporate teams. Scope first, equipment second. This is an evolution of the approved Viewport identity.

## Sources and observations

| Reference | What was reviewed | Implication for Viewport |
| --- | --- | --- |
| [AVP.Live](https://avp.live), [partnerships](https://avp.live/partnership), [inquiries](https://avp.live/contact), [standards](https://avp.live/why-avp-live) | Homepage, actual browser layout and contact form, buyer routes, engineering/redundancy positioning. Responsibilities and a written plan make the offer tangible. | Lead with technical ownership, make the production method concrete, give planners a direct landing page and a quote form. Do not adopt claims about owned inventory, employed crew, guaranteed uptime or response times. |
| [AV Planet NYC](https://www.avplanetrentals.com/) | Homepage services/rentals split, quote CTA, meeting formats and equipment navigation. The unrelated avplanet.com home-theater site was excluded. | Keep event context and clear conversion language. Avoid leading with rental packages or inventory. |
| [EventStarts](https://eventstarts.com/) | Catalog taxonomy, packages, technical product categories and navigation. | Show capability breadth in six disciplines; keep SKU/specification navigation out of the planner journey. |
| [Vidal Productions](https://vidalproductions.com/) | Homepage and full production service positioning alongside LED, rentals and streaming. | Make the broad offer understandable immediately, with full production as the organizing idea. |
| [Illuzion Digital](https://www.illuziondigital.com/) | Homepage, services, NYC positioning and consultation CTA. | Retain clear audio/video/lighting coverage; use concrete operational language in place of superlatives and repeated local keywords. |
| [Blue Line Productions](https://www.blue-line-productions.com/) | Corporate AV and celebrations architecture, broad production/entertainment offering. | Describe relevant event types without diluting Viewport into entertainment booking or party packages. |
| [Milestone Media](https://milestonenj.com/corporate/) and [about](https://milestonenj.com/corporate/about-us/) | Buyer/event segmentation, proposal CTA, approach, case studies and event-specific navigation. The similarly named Riverside video business was excluded. | Add compact audience descriptions, a clear next-step explanation and experience cards that can later carry verified project detail. |
| [Reflekt Experiences](https://reflektexperiences.com/) | Explicit white-label agency positioning, service categories, work examples and event inquiry fields. | Present white-label production as a normal partnership option and explain client communication and team integration. Do not add activations or app-development services unrelated to Viewport. |
| [PRG corporate events](https://cms9.prg.com/en/markets/corporate-events) | Brands/agencies as buyers, multi-discipline technical delivery and project-role descriptions. | Connect disciplines around the show and describe the role in experience cards. Do not mimic PRG's scale or claim its project history. |
| [TAIT](https://www.taittowers.com/) | Experience-led homepage, specialist capability breadth, technical direction and engineering language. | Treat engineering as part of production delivery. Avoid an elaborate animated entrance or an oversized global capabilities menu. |
| [Nextech Event Solutions / Nextech3D](https://www.nextech3d.ai/) | Attempted current event-solutions lookup and reviewed search evidence about Map D/event software. Current event-specific primary page was not retrievable reliably. | Adjacent event software is not a direct model for Viewport's service offer. No product, platform or AI features were inferred or adopted from this reference. |

The supplied [Expo exhibitor page](https://www.theeventplannerexpo.com/2026-exhibitors/) timed out during retrieval. The named companies were researched independently. The list was context, not treated as a newly verified exhibitor roster. Source availability and observations are time-specific.

## Implementation decisions

1. Make technical ownership the commercial proposition. Place planner/agency partnership modes directly after the experience logo strip.
2. Retain navy, cream, white, blue, Manrope/DM Sans and the exact approved raster lockup. Add restrained rules, numbering and operational labels. No visual borrowing from competitor identities.
3. Give capabilities a compact two-column editorial grid, with disciplines and responsibilities rather than rental products.
4. Make the four-step process explain both the work and the outcome at each stage. Backup planning is scoped to the event, without an absolute reliability guarantee.
5. Keep one deliberate brand/venue sequence and the direct/collaborative experience disclaimer. Add pause, focus pause and reduced-motion behavior to the marquee.
6. Keep experience areas distinct from verified individual case studies. Retain existing illustrative photography, show roles/disciplines already supported by the site's content and leave locations unset until verified.
7. Give agencies a directly linkable, statically rendered page explaining integration, decision boundaries, white-label representation and onsite delivery.
8. Make the inquiry start with the information a planner has. Only contact name, email and a short brief are required. Do not promise a response SLA or collect unnecessary phone/marketing consent data.
9. Pre-render both routes for search and non-JavaScript readability; provide individual titles, canonical URLs, Open Graph metadata and a sitemap. Avoid a proliferation of thin SEO pages.
10. Keep motion decorative and restrained. No scroll hijacking, loading intro, rental cart, invented project metrics, testimonials, client claims or warehouse ownership claims.

## Form implementation and remaining configuration

The repository had no form backend and Vercel had no configured project environment variables at inspection. A Vercel Node function uses the Resend HTTP API directly, without another SDK, CRM or paid form service. See the README for server-only variables and activation steps. The endpoint returns a useful 503 while delivery is unconfigured and never reports a fake successful submission. Provider acceptance is unit-tested using a mock, without sending mail.

Technical sources: [Vercel Node Functions](https://vercel.com/docs/functions/runtimes/node-js), [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email).
