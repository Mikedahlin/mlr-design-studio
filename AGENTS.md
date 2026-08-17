# MLR Design Studio — Project Guide

## What this is

MLR Creative Studio is Mike Dahlin's web design portfolio and business site. It showcases six featured projects in an interactive 3D wheel on the homepage.

## Key facts

- **Live site**: https://mlr-creative-studios-experience.vercel.app/
- **GitHub**: https://github.com/Mikedahlin/mlr-design-studio
- **Vercel auto-deploys from GitHub/main**
- **Local dev**: `npm run dev` from the project root (port 3001)

## Project layout

- `src/components/HomepageRebuild.tsx` — the main wheel component (neon sign + 6-card carousel + cinematic opening)
- `src/components/HomepageRebuild.module.css` — all wheel styles
- `src/components/lockedWheelData.ts` — the six project definitions (name, accent, video, image)
- `src/app/work/` — individual project sites (Apex, Velvet Room, White Pine Dental)
- `public/media/` — all video and image assets

## The six featured projects

1. Iron North (construction)
2. Ember (hospitality/dining)
3. Apex Motor Co. (automotive)
4. White Pine Dental (dentistry)
5. Northshore Lodge (resort)
6. Velvet Room (salon/beauty)

## Commands (from project root)

```text
npm run dev
npm run build
npm run lint
```

## Deploy

- Push to GitHub main → Vercel auto-deploys
- OR: `vercel --prod` from project root

## What's been built

- Homepage wheel with neon MLR STUDIO sign, cinematic opening film, 6-card carousel
- Three interactive project sites: White Pine Dental, Velvet Room, Apex Motor Co.
- The remaining three (Iron North, Ember, Northshore Lodge) are not built yet

## Current work (August 2026)

- Phase 1: wheel approval, motion stabilization, opening production
- Phase 2+: build remaining project sites, differentiate all six by architecture/interaction
- See `mlr-design-studio-full-website-plan.txt` for the full production plan
- See `NEXT-CHAT-HANDOFF.md` in the GitHub repo for the latest state

## Rules

- The wheel code is highly optimized — DOM updates run at 60fps outside React. Do not add React state updates inside the animation loop.
- Do not change video preload strategy without testing drag performance.
- The wheel uses `cursor:pointer` on card buttons intentionally — do not change to `cursor:inherit`.
- Do not replace Iron North, add a "Live Work" drawer, or redesign the approved wheel mechanics.
- Never fabricate testimonials, awards, or fake client results.

## Other projects on this machine

- **Route7** (`C:\Users\harle\Projects\Route7`) — portable-toilet ops MVP (Next.js, Clerk, Prisma, PostgreSQL). See its own AGENTS.md.
