# Lumisa — Luxury Boutique (Opening Soon)

Official coming-soon web application for **Lumisa** — an exclusive boutique for handcrafted handbags, fine jewellery, and bespoke accessories, opening in Kathmandu, Nepal.

Built with **Next.js 15 (App Router)**, **Tailwind CSS**, and **TypeScript**, powered by **OpenNext** on **Cloudflare Workers** with **Cloudflare KV** and **Cloudflare D1** waitlist storage.

## Features

- **Interactive Spotlight Physics**: Cursor-following dynamic spotlight reveal with smooth interpolation (and organic idle drift on touch devices).
- **Kathmandu Launch Countdown**: Precision countdown timer synchronized to Nepal Standard Time (`+05:45`).
- **VIP Waitlist Reservation Engine**: Real-time validation, animated states, and persistent edge storage in Cloudflare KV and APAC D1 database.
- **Curated Collections Showcase**: Interactive modal previews for Handbags, Fine Jewellery, and Accessories detailing materials and craftsmanship.
- **Audio Sensory Feedback**: Pure Web Audio API harmonic chime on VIP reservation.
- **Edge Performance & Security**: Deployed across Cloudflare's global edge network on `lumisanepal.com`.

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4 & Cormorant Garamond / Jost typography
- **Edge Runtime**: Cloudflare Workers via `@opennextjs/cloudflare`
- **Database & Storage**: Cloudflare D1 + Cloudflare KV
- **Deployment & CI/CD**: Cloudflare Git Integration

## Development

```bash
# Install dependencies
npm install

# Start local Next.js dev server
npm run dev

# Build for Cloudflare Workers
npm run build:worker

# Preview Worker locally with Wrangler
npm run preview

# Deploy to Cloudflare
npm run deploy
```
