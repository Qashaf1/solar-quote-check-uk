# Solar Quote Check UK

A premium, conversion-focused landing page for a UK solar lead-generation
brand, built with Next.js 15 (App Router), TypeScript, Tailwind CSS and
Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Design system

- **Colours** — Primary `#16a34a`, Secondary `#22c55e`, Dark `#1f2937`, plus
  a soft grey card surface and a single amber signal colour reserved for the
  star rating.
- **Type** — Manrope (display/headlines), Inter (body copy), IBM Plex Mono
  (numbers, stats, the eligibility percentage) — a small nod to the
  instrument-panel feel of a solar meter.
- **Signature element** — `components/SunGauge.tsx`, a radial dial styled
  after a solar irradiance/energy meter. It appears once as an illustrative
  reading in the hero, and again — live — as the multi-step form's progress
  indicator, so the same visual language ties the "checking your roof" idea
  to the literal progress through the form.

## Structure

```
app/                Routes (home, legal pages, sitemap, robots)
components/         Page sections + reusable UI (Button, Card, SunGauge)
lib/                cn() helper, UK postcode/email/phone validation
types/               Shared TypeScript types for the quote form
```

## Notes for production

- The form's `handleSubmit` in `components/QuoteForm.tsx` simulates a network
  request. Wire it up to a real API route (e.g. `app/api/lead/route.ts`) that
  validates and forwards submissions to your CRM/installer network.
- Replace the placeholder legal page copy in `app/privacy-policy`,
  `app/terms`, `app/cookie-policy` and `app/contact` with reviewed copy.
- Add a real `public/og-image.png` (1200×630) for social sharing previews.
- All copy, layout and styling here are original — nothing is copied from
  any existing solar comparison site.
