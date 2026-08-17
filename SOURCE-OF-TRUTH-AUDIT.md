# MLR Creative Studio — Source-of-Truth Audit

**Audit date:** August 14, 2026  
**Target project (empty, to be built):** `C:\Users\harle\Projects\mlr-design-studio` (git repo `Mikedahlin/mlr-design-studio`, branch `main`, zero commits)  
**Source of truth (read-only):** `C:\Users\harle\Downloads\mlrassets.com-master`  
**Phase:** 1 — audit only; no visual/source implementation changes made

## Safety and audit method

- The source-of-truth archive was inspected read-only. It was **not** modified, and no file was deleted or replaced anywhere.
- The target project folder contained only git metadata (no working files), so a pre-rebuild safety marker was created at `_backups/pre-rebuild-20260814-023108`.
- No deployment, publication, DNS, or GitHub operation was performed.
- The archive's own prior Phase 1 session (in the archive folder) already ran `npm install` and `npm run build` successfully against its own copy; its results are summarized below and cross-checked here.

## Executive source-of-truth finding

The archive (`mlrassets.com-master`) is **not a git repository** — it is a working snapshot of the Next.js "MLR Creative Studio" build. It contains **two materially different homepage directions**:

1. The currently routed homepage `src/app/page.tsx`: a conventional dark marketing page ("Built with purpose. Engineered to perform.") with an emblem hero, industry scroller, featured Apex block, services cards, dashboard section, and contact block.
2. The **disconnected cinematic implementation** in `src/components/OpeningExperience.tsx`, supported by `AuroraCanvas.tsx`, `ServiceReel.tsx`, `ModelSitesStack.tsx`, and `HomeExperience.css`.

The files prove the cinematic opening exists, but it is **not the current homepage and is not visible on any route**. The approved direction is explicitly labeled in `HomeExperience.css`:

```
/* APPROVED FOUNDATION: PRESS PLAY / WHITE REEL / EXPANDING MODEL CARDS */
```

The active JSX reel inside the disconnected opening is the two-row `foundation-reel` (dark metallic shell, two horizontal card belts). The older circular `.service-reel` survives only as CSS and is not emitted by any current component.

## Required audit answers

### 1. Which page is currently the homepage (in the archive)?

`src/app/page.tsx` is the App Router homepage for `/`. It is a client component rendering a conventional marketing page; it does **not** import or render `OpeningExperience`, `ServiceReel`, or `ModelSitesStack`. The root layout (`src/app/layout.tsx`) wraps every route with `Navbar` and `Footer`.

### 2. Which component is actually rendered by the homepage?

The homepage renders its JSX directly inside `Home`. No cinematic component is connected. The layout adds `Navbar` + `Footer` on every route.

### 3. Which wheel/reel implementation is currently connected?

- Connected to any route: **none**.
- Connected inside the cinematic component tree: `OpeningExperience.tsx` imports and renders `ServiceReel.tsx`, which emits `.foundation-reel` markup.
- **Critical:** `HomeExperience.css` is not imported anywhere in `src`, so even rendering `OpeningExperience` as-is would not load its styles.

### 4. Which wheel/reel code is unused or dead?

All of the following are unused (no route imports them):

- `OpeningExperience.tsx`
- `ServiceReel.tsx` (and its `.foundation-reel` UI)
- `ModelSitesStack.tsx`
- `AuroraCanvas.tsx`
- `HomeExperience.css` (entire file — never imported)
- The old circular `.service-reel` CSS (approximately lines 260–477 of `HomeExperience.css`); no JSX emits those class names
- `src/components/Dashboard/` (`RaceDashboard.tsx`, `Dash*Overlay.tsx`, `PaddleShifters.tsx`) — not imported by any page, and their referenced images `/images/dashboards/dash_*.png` are absent from `public/`

### 5. Where are the original images and videos stored?

Primary media is in `public/`:

- `public/marketing-video.mp4`
- `public/video-thumbnail.jpg`
- `public/mike-dahlin.jpg`
- `public/images/dashboard renderings.png`
- `public/images/Kinetic editorial homepage for MLR Creative Studios.png`
- `public/images/MLR Chrome Workshop Showroom.png`
- `public/images/MLR Emblem.png`
- `public/images/MLR's Shape-Shifting Creative Gallery.png` (plus `- panel 1/2/3`)
- `public/images/Trans Am Dashboard.png`

Template assets: `public/templates/ted-blue/`, `ted-v1/`, `ted-v2/`.

**Absent:** No files named for Iron North, Ember, White Pine Dental, Northshore Lodge, or Velvet Room. "Apex Motor Co." appears in homepage text and reuses `Trans Am Dashboard.png`. The requested six-brand card asset set is not present by name and must not be fabricated or silently substituted.

### 6. Which routes/pages exist (in the archive)?

- `/` → `src/app/page.tsx`
- `/about` → `src/app/about/page.tsx`
- `/contact` → `src/app/contact/page.tsx`
- `/services` → `src/app/services/page.tsx`
- `/work` → `src/app/work/page.tsx`
- `/templates/atlaslume` → `src/app/templates/atlaslume/page.tsx`
- `/api/chat` → `src/app/api/chat/route.ts`
- `/api/contact` → `src/app/api/contact/route.ts`
- `/icon` → `src/app/icon.tsx`, `/favicon.ico` → `src/app/favicon.ico/route.tsx`

### 7. Which pages are complete/incomplete/broken/duplicated (archive)?

- **`/` — incomplete / internally inconsistent.** Press Play, View Project, Learn More, and Start The Conversation are inert buttons. Service cards show "Placeholder for service description...". Mike's real image is replaced by a gray circle. Industry cards use empty gray artwork. No reel is rendered.
- **`/about` — structurally complete**, uses `mike-dahlin.jpg`, conventional visual system.
- **`/contact` — complete but form not end-to-end verified** (avoided triggering external email side effects).
- **`/services` — complete but content mismatched** to the five reel categories (AI/Dev-centric).
- **`/work` — complete, with duplicated Ted-template presentation** and two links to live `mlrassets.com/templates/...`.
- **`/templates/atlaslume` — complete as a demo**, with inert presentation buttons.

### 8. Which interactions currently work (archive)?

- All six routes render (verified in the archive's prior Phase 1 session at port 3100; the marketing repo in this session's working directory renders all routes at port 3001).
- Nav links, `mailto:`/`tel:` links, theme toggle, mobile menu, and the contact form controls render.
- The cinematic opening/reel interactions **cannot count as working** — they are not reachable and their CSS is not loaded.

### 9. Which interactions currently fail?

- Homepage Press Play does nothing; no opening flash/transition; no reel/wheel on the active homepage.
- Foundation reel has automatic CSS translation + card selection, but no desktop pointer-drag rotation and no inertia/resume on mobile (mobile is a plain overflow scroller).
- Contact email delivery unverified.
- In this session's working directory browser run, the HMR WebSocket handshake failed only when accessed through the Docker `host.docker.internal` relay (test-environment artifact); page loads succeeded.

### 10. What can safely be repaired / reconstructed?

Safe Phase 2 steps, in order:

1. Scaffold a Next.js app in the target with the same dependency set as the archive (`next 16.2.12`, `react 19.2.4`, `framer-motion ^12.42.2`, Tailwind v4, TS).
2. Bring over the archive's shared framework files (configs, `globals.css`, `layout.tsx`, Navbar/Footer/theme system) as the base.
3. Bring over the approved cinematic components exactly as they are: `OpeningExperience.tsx`, `ServiceReel.tsx`, `ModelSitesStack.tsx`, `AuroraCanvas.tsx`, and `HomeExperience.css`.
4. Wire the homepage to render `OpeningExperience` and import `HomeExperience.css`, so PRESS PLAY → white flash → `foundation-reel` → `model-stack` is reachable and styled.
5. Add a local-only preview route for the experience before (optionally) replacing the conventional homepage, so nothing is destroyed without comparison.
6. Bring over all `public/` media (mp4, jpg, images).
7. Do **not** bring over the orphaned `Dashboard/` components or the dead circular `.service-reel` CSS unless approved.
8. Do not fabricate the missing six-brand assets; stop and request them if required.
9. Run `npm run build` and scoped `npm run lint` to verify; do not deploy.

## Verification results (from the archive's own Phase 1 run, cross-checked)

- `npm install` completed against the archive lockfile.
- `npm run build` **succeeded** (Next.js 16.2.12; 13 static pages).
- `npm run lint` failed with 14 errors / 1,426 warnings, inflated because ESLint also traversed the `_backups/` copy. Scoped lint must be fixed in a later phase.
- The archive contains prior Phase 1 artifacts: `SOURCE-OF-TRUTH-AUDIT.md`, `_backups/pre-phase1-20260814-021311/`, route screenshots `phase1-*.png`, and dev logs.

## Phase 1 conclusion

The source-of-truth archive is intact and was not modified. The approved cinematic experience exists in full in the archive but is disconnected and un-styled. The target project `mlr-design-studio` is empty and ready to be built from the archive, with the homepage wired to `OpeningExperience` (foundation-reel + model-stack) per the approved "PRESS PLAY / white reel / expanding model cards" foundation.

**Nothing was deployed.**
