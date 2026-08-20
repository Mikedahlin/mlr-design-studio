# MLR Design Studio — Current Production Handoff

Updated: 2026-08-18 14:30 Central

## How to resume

Read this file completely, then read the authoritative master plan:

`C:\Users\harle\Projects\mlr-design-studio\mlr-design-studio-full-website-plan.txt`

Continue from the exact next action near the end of this file. Do not restart planning, redo approved work, or introduce unrelated side projects.

## Active repository

- Working directory: `C:\Users\harle\Projects\mlr-design-studio`
- GitHub: https://github.com/Mikedahlin/mlr-design-studio
- Branch: `main`
- Last pushed: `bbcb0e7` — Bigger cards, cursor release, close button, mobile INDEX nav
- Vercel is connected to GitHub/main. Push triggers auto-deploy.
- **Do not touch the wheel animation code.** User is satisfied with current behavior.

## Governing rule

The master plan is the authoritative production backlog until complete. New user instructions override stale details in that file. Work phase-by-phase, validate each milestone, and stop getting sidetracked.

## Where we are in the plan

**Phase 1 — Approve the opening and wheel: IN PROGRESS**

Step 1 (Review wheel) is largely complete. Desktop confirmed good. Mobile has had multiple fixes pushed and needs final validation on a real device.

### What was completed this session

1. **Card sizing increased** — Desktop 290×365 → 370×465px. Mobile 245×320 → 290×375px. Mobile JS scale 0.78× → 0.96× front card. Desktop scale unchanged (1.02×).
2. **Cursor stick fix** — Removed `if(e.pointerType!=="mouse")` guard on `setPointerCapture` (was skipping capture for mouse, causing pointerup to escape the scene). Added window-level `pointerup`/`pointercancel` safety net.
3. **Detail popup close button** — Changed from "A-" to "×". Added visible circular border/background styling (36×36px, border, hover state). Escape key handler already existed.
4. **INDEX nav mobile** — Route opacity 0.55 → 0.8, added 12px vertical padding for touch targets.
5. **Image sizes updated** — `sizes` attribute now `(max-width:720px) 80vw,380px`.

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
- `f125b7c` — Fix: remove duplicate const declarations breaking build
- `31940cb` — Fix(homepage): moderate card sizing and momentum tuning
- `93c1ee2` — Fix(homepage): mobile wheel centering, corner clipping, rAF jank, hydration mismatch
- `36aa3d6` — Revert scene contain change - was causing sign flicker and card clipping
- `6b22617` — Fix INDEX route opacity on mobile, relax scene contain to unclip card glow borders
- `bbcb0e7` — Bigger cards, cursor release, close button, mobile INDEX nav

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
- **`setPointerCapture` is now called unconditionally** for all pointer types (mouse, touch, pen). A window-level `pointerup` safety net also resets drag state.
- **Velocity/momentum values are tuned and approved.** Do not adjust unless user explicitly asks to re-tune.

## Known critical bugs to fix next

### BUG 1: Racing border is completely invisible (CRITICAL)

The `.projectCard:after` pseudo-element with the `edgeSpark` animation exists in CSS (line 13) but renders zero visible pixels.

**Root cause:** `.projectCard` has `contain: layout paint style` (set on CSS lines 4 and 10, never removed). Per CSS spec, `contain: paint` clips all visual content to the element's padding box. The `::after` has `inset: -8px`, placing it entirely outside the card. The `overflow: visible` on line 13 does NOT override `contain: paint`.

**Secondary cause:** `.scene` has `contain: strict` (line 10) which includes `contain: paint`, adding a second clipping boundary.

**Fix required:**
- Change `.projectCard` from `contain: layout paint style` to `contain: layout style` (remove paint containment) — on CSS lines 4 and 10
- Change `.scene` from `contain: strict` to `contain: layout style` (line 10)
- The handoff says "Do not re-add `contain:layout style`" to `.projectCard` — this rule was about preventing GPU compositing thrash from a previous version. The fix here is removing `paint` from the existing `contain` declaration, not re-adding it. The `layout style` containment does not cause the same thrash.

**After fixing containment, also consider:**
- The conic gradient arc is only ~34 degrees (9.4% of the circle) — the white-hot core is just 4 degrees / ~18px. This may be too subtle even when visible.
- The 4px ring width (from `padding: 4px` + mask-composite) is very thin.
- The triple `drop-shadow` glow extends beyond the `::after` but would be clipped by parent containment.
- Animation speed: 4.8s for full rotation. Stagger: only 3 distinct offsets for 6 cards.

### BUG 2: Card names too small

`.cardName` font: `900 clamp(16px, 1.6vw, 24px)/1 "Arial Rounded MT Bold"`. On a 1920px screen, `1.6vw = 30.7px` but clamped to max `24px`. On mobile, fixed at `14px`. These are tiny on the now-larger cards (370×465 desktop, 290×375 mobile).

**Fix:** Increase the clamp range. Suggested: `clamp(18px, 2.2vw, 32px)` desktop, `16px` mobile.

### BUG 3: Spin speed/duration needs re-tuning

User explicitly asked to fix "how long and how fast they spin." Current values:
- Max velocity cap: `0.032` (both platforms)
- Velocity multiplier: `3.0` mobile, `2.2` desktop
- Power factor: `6000` mobile, `5200` desktop
- Max duration: `1.3s` (both platforms)
- Duration factor: `65` mobile, `52` desktop
- Easing: `[0.25, 0.1, 0.25, 1]`

These were previously approved but user now wants them changed. The new conversation should re-tune and get re-approval. **Do not change rotation direction or card positions.**

### BUG 4: Jankiness on mobile

Likely related to `contain: strict` on `.scene` and `contain: layout paint style` on `.projectCard`. The `contain: strict` forces size containment which can cause layout thrash. Removing `paint` containment (Bug 1 fix) may also improve mobile jank.

## What the user sees on Vercel now

- Homepage with cinematic INDEX nav, neon sign, 6-card wheel
- All 6 project site routes functional
- Pure black background, accent-glow cards, bigger mobile sign
- Smooth Framer Motion wheel with boosted momentum
- Cards are now larger (370×465 desktop, 290×375 mobile)
- Detail popup has visible × close button
- INDEX nav routes are more visible on mobile (0.8 opacity)
- Racing border is INVISIBLE (contain:paint clips it)
- Card names are small (24px max desktop, 14px mobile)
- Spin feel may need re-tuning per user feedback

## Remaining work

### Phase 1 completion

1. **Fix the four critical bugs above** (racing border, card names, spin re-tune, jankiness)
2. Validate on real mobile device — all fixes, touch drag, sign flicker, INDEX nav
3. Steps 2-6 of Phase 1 from the master plan (motion engine validation, expandable geometry, opening production, living sign, full validation)
4. Then Phase 2+ per the master plan

### Exact next action

1. Fix `contain: paint` on `.projectCard` (change to `contain: layout style`)
2. Fix `contain: strict` on `.scene` (change to `contain: layout style`)
3. Increase `.cardName` font sizes
4. Re-tune spin speed/duration with user approval
5. Validate on real mobile device
6. Continue Phase 1 steps 2-6 per the master plan
7. Then Phase 2+

Do not start another unrelated concept, replace Iron North, add a special Live Work drawer, change the approved wheel mechanics, or touch the momentum/velocity values without user approval.

## Truthfulness rules

- Clearly distinguish client work and concept work.
- No fake testimonials, employees, patients, attorneys, doctors, awards, outcomes, rankings, performance gains, or engagement figures.
- Synthetic actors/footage must be presented as concept/illustrative material where needed.
- No SEO ranking guarantees.
