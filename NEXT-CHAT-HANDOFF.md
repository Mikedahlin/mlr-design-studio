# MLR Design Studio — Current Production Handoff

Updated: 2026-08-17 12:30 Central

## How to resume

Read this file completely, then read the authoritative master plan:

`C:\Users\harle\Projects\mlr-design-studio\mlr-design-studio-full-website-plan.txt`

Continue from the exact next action near the end of this file. Do not restart planning, redo approved work, or introduce unrelated side projects.

## Active repository

- Working directory: `C:\Users\harle\Projects\mlr-design-studio`
- GitHub: https://github.com/Mikedahlin/mlr-design-studio
- Branch: `main`
- Last pushed: `a6125da` — Boost wheel momentum
- Vercel is connected to GitHub/main. Push triggers auto-deploy.
- **Do not touch the wheel animation code.** User is satisfied with current behavior.

## Governing rule

The master plan is the authoritative production backlog until complete. New user instructions override stale details in that file. Work phase-by-phase, validate each milestone, and stop getting sidetracked.

## Where we are in the plan

**Phase 1 — Approve the opening and wheel: IN PROGRESS**

Step 1 (Review wheel) is largely complete. Desktop confirmed good. Mobile has had multiple fixes pushed and needs final validation on a real device.

### What was completed this session

1. **Framer Motion port** — Wheel animation engine rewritten from manual RAF+spring to Framer Motion `useMotionValue` + `animate()`. Same speed, rotation direction, and card positions. Smoother snap and card transitions.
2. **Sign flickering fix** — NeonMark extracted to `NeonMark.tsx` as separate component + wrapped in `React.memo` (no props = never re-renders). Added `translateZ(0)` compositor layer isolation on mobile. Removed `contain:layout style` from `.projectCard` in void-black pass to prevent GPU compositing thrash.
3. **Idle drift fix** — Cleared `animRef.current` in momentum `onComplete` callbacks (was never cleared, blocking the 2.6s quiet timer). Changed drift to use `rawPos.jump()` to bypass spring filtering of micro-movements.
4. **INDEX nav on mobile** — Gallery receives `navOpen` prop, bails out of pointer handling when nav is open. CSS: `.navOpenHost .gallery { pointer-events:none!important }`. `touch-action:manipulation` added to trigger button.
5. **Center card bigger on mobile** — 310×405 with proper centering margin (was 280×390).
6. **Mobile jank** — Removed `contain:layout style` from mobile `.scene` override.
7. **Card quality** — Accent glow borders, brighter front card, dimmer backs, bigger/brighter card names with neon glow.
8. **Momentum boosted** — Velocity tracking `.55/.45` → `.3/.7`, clamp `.022` → `.045`, power `5000` → `6000/7000`, duration `1.2s` → `1.6s`. User confirmed it works. **DO NOT CHANGE.**

### Git history (all on main)

- `d13dbac` — Clean slate: full wheel + 6 sites + INDEX nav
- `a0c0fac` — Updated handoff
- `76a5a10` — Fix INDEX nav on mobile
- `1d65438` — Bigger center card on mobile
- `6d8264a` — Remove drop-shadow from frontCard
- `0a52385` — Fix card borders + isolate sign GPU layer
- `5016f06` — Fix mobile jank: removed memo+contain, separated snap from spring
- `4541d47` — Extract NeonMark to separate component to prevent SVG re-render flash
- `b8c0374` — Fix mobile: nav guard in Gallery, bigger center card, touch-action on trigger
- `be6768c` — Memoize NeonMark with React.memo, disable gallery pointer-events when nav open, add focus-visible to routes
- `f6d7446` — Port wheel animation to Framer Motion springs
- `9aeb183` — Fix idle drift: clear animRef on complete, use rawPos.jump for micro-drift
- `bc33d67` — Remove useSpring wrapper to eliminate drag lag
- `ef955ca` — Fix mobile sign flicker: remove contain:layout on cards, force sign compositor layer
- `a6125da` — Boost wheel momentum: faster velocity tracking, higher power/velocity ceiling

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

Do not remove Iron North. Do not change the wheel speed, rotation direction, card positions, or momentum feel.

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

### Vercel domain

- User has GoDaddy domain `mlrassets.com`
- Vercel nameservers updated: `ns1.vercel-dns.com` / `ns2.vercel-dns.com`
- SSL should auto-provision

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

## Key technical notes

- **Wheel animation uses Framer Motion `useMotionValue` + `animate()`** — NOT `useSpring`, NOT manual RAF spring physics. The RAF loop reads `rawPos.get()` directly and updates card DOM. Framer Motion `animate()` handles snap/go/momentum transitions.
- **NeonMark is `React.memo` wrapped** with zero props — it never re-renders. Do not add props to it.
- **Cards update via direct DOM manipulation** in the RAF loop (60fps outside React). Do not add React state updates inside the animation loop.
- **The `contain:layout style` was intentionally removed** from `.projectCard` in the void-black pass to prevent GPU compositing thrash on mobile. Do not re-add it.
- **Velocity/momentum values are tuned and approved.** Do not adjust.

## What the user sees on Vercel now

- Homepage with cinematic INDEX nav, neon sign, 6-card wheel
- All 6 project site routes functional
- Pure black background, accent-glow cards, bigger mobile sign
- Smooth Framer Motion wheel with boosted momentum

## Remaining work

### Phase 1 completion

1. **Validate on real mobile device** — sign size, card quality, touch drag, sign flicker fix, INDEX nav all links working, center card size
2. Steps 2-6 of Phase 1 from the master plan (motion engine validation, expandable geometry, opening production, living sign, full validation)
3. Then Phase 2+ per the master plan

### Known issues to watch

- Sign may still flicker on some mobile devices — compositor isolation fix was pushed but not validated
- INDEX nav was reported as "only WORK link works" before the pointer-events fix was added — needs real-device validation
- Idle drift was fixed (animRef clearing + rawPos.jump) — needs validation that it starts creeping after ~2.6s

## Truthfulness rules

- Clearly distinguish client work and concept work.
- No fake testimonials, employees, patients, attorneys, doctors, awards, outcomes, rankings, performance gains, or engagement figures.
- Synthetic actors/footage must be presented as concept/illustrative material where needed.
- No SEO ranking guarantees.

## Exact next action

1. Wait for user to validate on real mobile device.
2. If any mobile issues, fix them — but do NOT touch wheel animation values.
3. Continue Phase 1 steps 2-6 per the master plan.
4. Then Phase 2+: renderings/mockups of remaining project site refinements, approve then build.

Do not start another unrelated concept, replace Iron North, add a special Live Work drawer, change the approved wheel mechanics, or touch the momentum/velocity values.
