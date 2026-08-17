# MLR Design Studio — Current Production Handoff

Updated: 2026-08-17 02:00 Central

## How to resume

Read this file completely, then read the authoritative master plan:

`C:\Users\harle\Projects\mlr-design-studio\mlr-design-studio-full-website-plan.txt`

Continue from the exact next action near the end of this file. Do not restart planning, redo approved work, or introduce unrelated side projects.

## Active repository

- Working directory: `C:\Users\harle\Projects\mlr-design-studio`
- GitHub: https://github.com/Mikedahlin/mlr-design-studio
- Branch: `master`
- Last pushed: Clean slate commit `d13dbac` — full wheel + 6 differentiated sites + INDEX nav
- Vercel is connected to GitHub/main. Push triggers auto-deploy.

## Governing rule

The master plan is the authoritative production backlog until complete. New user instructions override stale details in that file. Work phase-by-phase, validate each milestone, and stop getting sidetracked.

## Where we are in the plan

**Phase 1 — Approve the opening and wheel: IN PROGRESS**

Step 1 (Review wheel) is partially complete. The user reviewed the wheel and identified 5 issues. All 5 have been fixed and the user confirmed they look good on desktop. Mobile has not been fully validated yet.

### What was fixed this session

1. **Flick strength** — Max velocity increased from 0.016 to 0.022, multipliers from 1.7/2.25 to 2.0/2.8. User confirmed: harder flicks spin faster/longer.
2. **Jank + cursor sticky** — Removed `setDragging` React state, now uses direct DOM class manipulation. User confirmed: cursor releases cleanly, no jank.
3. **Background blacker** — Replaced dark blue gradient with pure `#000`. User confirmed: black looks better.
4. **Mobile sign bigger** — Width increased to `min(92vw, 420px)`, height to `120px`. User confirmed: sign is good on mobile.
5. **Card quality** — Accent-colored glass borders, stronger glow halos, brighter front card, dimmer background cards, viewport inner shadow. User confirmed: cards look better.
6. **Back card click** — Replaced instant jump with smooth spring animation (cubic ease-out, 280-600ms). **NOT YET VALIDATED** — user reported it "flashes to the center" before the fix was applied.
7. **First-spin jank** — Fixed timing bug (skip first animation frame). **NOT YET VALIDATED** — user reported jank on first spin before fix was applied.
8. **Card names** — Bigger, brighter, stronger neon glow. User confirmed: looks good.

### What still needs validation

- Back card click smooth spring animation
- First-spin jank fix
- Mobile sign size (user saw via Chrome DevTools but hasn't confirmed on real phone)
- Idle drift (user wanted it, confirmed it stays)

## Locked approvals and decisions

### Homepage opening

- Approved clean source video: `public/media/mlr-opening/mlr-opening.mp4` / `.webm`
- Desktop shows Press Play, plays the silent ten-second film, then reveals the wheel.
- Mobile enters the wheel directly.
- This opening works and must not be replaced.

### Six-card wheel

The featured wheel remains six curated projects:

1. Iron North
2. Ember
3. Apex Motor Co.
4. White Pine Dental
5. Northshore Lodge
6. Velvet Room

Do not remove Iron North.

### Homepage navigation — INDEX overlay approved

User approved the cinematic INDEX nav (ported from old project `HomepageFoldingNav.tsx`):

- Pill button top-left: glowing dot + "INDEX" + "01—04"
- Opens full-screen overlay with 4 routes in film-credit style
- Routes: WORK, SERVICES, STUDIO, START A PROJECT
- Focused route white and full-size, others blurred and smaller
- Escape or click to close
- Replaced the CompactNav (SERVICES/WORK/STUDIO tabs)

### Living MLR sign

The current wheel logo remains a font/SVG simulation and is not the desired final sign. This is a Phase 1 item.

## Six differentiated project sites — all ported

All six rebuild versions from the old project (`mlrassets.com-master`) have been ported into the new project:

| Project | Route | Layout | Status |
|---------|-------|--------|--------|
| Iron North | `/work/iron-north` | Three-panel: project map, ledger, qualify sidebar | Ported, needs validation |
| Ember | `/work/ember` | Fixed-viewport sensory menu, concentric rings | Ported, needs validation |
| Apex Motor Co. | `/work/apex-motor` | Technical dashboard, build configurator | Kept existing |
| White Pine Dental | `/work/white-pine-dental` | Calm guided-care, treatment explorer | Kept existing |
| Northshore Lodge | `/work/northshore-lodge` | SVG property map, stay planner | Ported, needs validation |
| Velvet Room | `/work/velvet-room` | Editorial fashion magazine spread, drag/swipe | Replaced with editorial version |

Rebuild-stills images copied to `public/media/rebuild-stills/`.

## What the user sees on Vercel now

After the push, Vercel will deploy:
- Homepage with cinematic INDEX nav, neon sign, 6-card wheel
- All 6 project site routes functional
- Pure black background, accent-glow cards, bigger mobile sign

## Remaining work (Phase 1 completion)

1. Validate back-card click spring animation
2. Validate first-spin jank fix
3. Validate on real mobile device
4. Steps 2-6 of Phase 1 from the master plan (motion engine validation, expandable geometry, opening production, living sign, full validation)
5. Then Phase 2+ per the master plan

## Truthfulness rules

- Clearly distinguish client work and concept work.
- No fake testimonials, employees, patients, attorneys, doctors, awards, outcomes, rankings, performance gains, or engagement figures.
- Synthetic actors/footage must be presented as concept/illustrative material where needed.
- No SEO ranking guarantees.

## Exact next action

1. Wait for Vercel deploy to complete.
2. User validates on desktop: back-card click spring animation, first-spin jank.
3. User validates on real mobile device: sign size, card quality, touch drag.
4. Continue Phase 1 steps 2-6 per the master plan.

Do not start another unrelated concept, replace Iron North, add a special Live Work drawer, or change the approved wheel mechanics.
