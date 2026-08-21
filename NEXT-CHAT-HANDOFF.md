# MLR Design Studio — Current Production Handoff

Updated: 2026-08-21 Central

## How to resume

Read this file completely, then read the authoritative master plan:

`C:\Users\harle\Projects\mlr-design-studio\mlr-design-studio-full-website-plan.txt`

Continue from "Exact next action" near the end of this file. Do not restart planning, redo approved work, or introduce unrelated side projects.

## Active repository

- Working directory: `C:\Users\harle\Projects\mlr-design-studio`
- GitHub: https://github.com/Mikedahlin/mlr-design-studio
- Branch: `main`
- Last pushed: `aefb02e` — Fix mojibake text and trim AI-gibberish UI segments from card previews
- Vercel is connected to GitHub/main. Push triggers auto-deploy (~40s builds).
- **Do not touch the wheel animation mechanics.** User is satisfied with current behavior.

## STOP POINT — state as of this handoff

Everything below this line reflects a clean, deployed, user-confirmed state:

- **Desktop wheel works**: cards spin by drag, click opens the full project site.
- **Mobile wheel works**: user called it "the best mobile has been." Touch swipe spins, tap opens.
- **All site text is correct**: mojibake eliminated, AI-gibberish video segments removed.
- All six project routes live and reachable from wheel cards: `/work/iron-north`, `/work/ember`, `/work/apex-motor`, `/work/white-pine-dental`, `/work/northshore-lodge`, `/work/velvet-room`.

Do not stack new experiments on top of this state without reading the session log below.

## Session log (2026-08-20/21) — what broke and how it was fixed

### 1. Project cards did not open their sites (multiple failed fix attempts before root cause)

**Root cause:** `setPointerCapture()` on the scene div retargets the browser's `click` event to the scene container. Click events NEVER reach card buttons/anchors while capture is active. This defeated every attempt that relied on button `onClick` or anchor default navigation, and also defeated `e.target.closest(card)` inside `pointerup` (pointerup target is retargeted too).

**Final working solution (do not regress):**
- Cards are real `<a href="/work/{slug}">` elements covering the full card (`position:absolute; inset:0; zIndex:10`).
- On tap (pointer moved <10px), `up()` resolves the element under the pointer with `document.elementFromPoint(e.clientX, e.clientY)` — geometric lookup, immune to capture retargeting — then follows that card link via `window.location.href`.
- Drags (>10px) fling the wheel exactly as before; keyboard Enter works natively on the focused anchor.

Related commits: `c2b1fde`, `045d9de`, `06fdf2b`, `f6d3a62`, `436fec0`, `ab6a1c7`, `ec11a17`.

### 2. Wheel stopped spinning after links were added

**Root cause:** native `<a>`/`<img>`/`<video>` elements are mouse-draggable; pressing one and moving starts a browser link-drag which fires `pointercancel` and kills the drag stream.

**Fix (commit `efe51d1`):** `onDragStart={e=>e.preventDefault()}` on the scene + `draggable={false}` on card anchors, videos, and images. No-op on touch; mobile unaffected.

### 3. "Alien language" text

Two separate sources:

- **Page mojibake** — `WhitePineExperience.tsx` contained UTF-8-read-as-Windows-1252 corruption (`â€™`, `â†’`, `Â©`…). Fixed with exact byte-level reversal (22 replacements). Commit `aefb02e`. Verified clean on production.
- **AI-gibberish inside card preview videos** — each 10s Gemini-rendered loop ended with a website-mockup reveal containing pseudo-text nav/headlines (`HOME GRAPHIT ELECTICY APLICATIONS ASENTARS`, `PALGUS CHENS ABCOIUS`, etc.). Fixed by trimming every video to its clean pre-UI segment (verified frame-by-frame with OCR):

| Video | New length | Gibberish started at |
|-------|-----------|---------------------|
| apex-motor.mp4 (+mobile) | 5.5s | ~6.0s |
| ember.mp4 (+mobile) | 7.5s | ~8.0s |
| iron-north.mp4 (+mobile) | 6.0s | ~6.5s |
| northshore-lodge.mp4 (+mobile) | 6.0s | ~6.5s |
| velvet-room.mp4 (+mobile) | 6.0s | ~6.3s |
| white-pine-dental.mp4 (+mobile) | 6.5s | ~7.0s |

Opening film (`mlr-opening-stable.*`) OCR-scanned clean — only genuine "MLR" branding. Posters in `card-previews/posters/` scanned clean, untouched.

If these videos are ever regenerated, the replacement renders must contain no readable pseudo-text, or the same trim-and-verify process must be repeated.

## Where we are in the plan

**Phase 1 — Approve the opening and wheel: IN PROGRESS, near completion**

Step 1 (Review wheel): effectively done — desktop confirmed good by user, mobile confirmed best-ever by user. Formal "Wheel approved" gate still belongs to the user.

Steps 2–6 remain: motion-engine hardening, expandable geometry, opening production workflow (opening film exists and is approved in stable form), living interactive sign, full validation pass.

## Locked approvals and decisions

### Homepage opening
- Approved stable opening: `public/media/mlr-opening/mlr-opening-stable.mp4` / `.webm` (desktop Press Play → 10s film → wheel; mobile enters wheel directly).
- Do not replace the opening or its preload strategy without testing drag performance.

### Six-card wheel
1. Iron North 2. Ember 3. Apex Motor Co. 4. White Pine Dental 5. Northshore Lodge 6. Velvet Room
- Do not remove Iron North. Do not change rotation direction, card positions, momentum feel, or `cursor:pointer` on cards.

### INDEX nav
Cinematic overlay nav approved (WORK / SERVICES / STUDIO / START A PROJECT).

### Living sign
Current neon mark is a font/SVG simulation; true tube-geometry sign remains a Phase 1 item (Step 5).

## Key technical notes

- **Wheel uses Framer Motion `useMotionValue` + `animate()`**, RAF reads `rawPos.get()` and writes card DOM directly at 60fps outside React. No React state inside the animation loop.
- **NeonMark is `React.memo`, zero props** — never re-renders. Do not add props.
- **`setPointerCapture` is called unconditionally** in `down()` — remember the click-retargeting consequence documented above before adding any click-based UI inside the scene.
- **Velocity/momentum values are tuned and approved.** Do not adjust without explicit user request.
- **Videos are H.264, silent (`-an`), `+faststart`, trimmed lengths per table above.** Mobile variants mirror desktop cuts.

## Status of previously listed bugs (from 2026-08-18 handoff)

- ~~BUG 2 card names too small~~ — fixed (`.cardName` clamp now `18px–32px` desktop).
- ~~BUG 4 mobile jank~~ — resolved per user ("best mobile has been").
- BUG 1 racing border visibility — unverified; ask user whether the edge spark is visible before touching containment CSS.
- BUG 3 spin speed/duration re-tune — user has not raised it since; do not touch unless asked.

## Remaining work

### Phase 1 completion
1. User validates racing border visibility (Bug 1) — fix only if they want it.
2. Step 2: motion-engine hardening checklist from master plan.
3. Step 3: expandable (data-driven) wheel geometry — keep six-card version intact.
4. Step 4: opening production workflow refinement.
5. Step 5: living interactive sign.
6. Step 6: full validation matrix (drag/flick/keyboard/SR/reduced-motion/policies).
7. User says "Wheel approved" → Phase 2.

### Exact next action
Ask the user: "Is the wheel approved?" If yes, begin Phase 2 (visual-production system) per the master plan. If no, work the Phase 1 steps above in order.

Do not start another unrelated concept, replace Iron North, add a Live Work drawer, change approved wheel mechanics, or touch momentum values without approval.

## Truthfulness rules

- Clearly distinguish client work and concept work.
- No fake testimonials, employees, patients, attorneys, doctors, awards, outcomes, rankings, performance gains, or engagement figures.
- Synthetic actors/footage must be presented as concept/illustrative material where needed.
- No SEO ranking guarantees.
