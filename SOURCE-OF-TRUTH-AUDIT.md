# MLR Creative Studios — Source-of-Truth Audit

**Audit date:** August 14, 2026  
**Project inspected:** `C:\Users\harle\Downloads\mlrassets.com-master`  
**Phase:** 1 — audit only; no visual/source implementation changes made

## Safety and audit method

- This folder is **not a Git repository**, so a working branch could not be created.
- Before source edits, a timestamped in-project copy was made at `_backups/pre-phase1-20260814-021311`.
- No existing file was deleted or replaced.
- No deployment, publication, DNS operation, or GitHub operation was performed.
- The source was inspected directly, dependencies were installed from the existing lockfile, the production build was run, and all six requested routes were opened in Chromium at desktop and mobile viewport sizes.
- Desktop and mobile screenshots were captured for every route with names beginning `phase1-`.
- There is no project README or design brief in the inspected source. The only README-like text encountered during the initial broad search came from dependencies, not this project.

## Executive source-of-truth finding

There are **two materially different homepage directions in the archive**:

1. The currently routed homepage in `src/app/page.tsx`: a conventional dark marketing page with an emblem hero, industry scroller, featured Apex block, services cards, dashboard section, and contact block.
2. The disconnected cinematic implementation in `src/components/OpeningExperience.tsx`, supported by `AuroraCanvas.tsx`, `ServiceReel.tsx`, `ModelSitesStack.tsx`, and `HomeExperience.css`.

The files prove that the cinematic opening exists, but it is **not the current homepage and is not currently visible on any route**. The active JSX reel inside the disconnected opening is the two-row `foundation-reel`. The circular `.service-reel` implementation survives only as CSS; the current `ServiceReel.tsx` does not emit its class names. I do not know yet whether the circular CSS predates or was intended to supersede the foundation reel; file connectivity proves only that it is currently dead, not that it is the approved original.

---

## Required audit answers

### 1. Which page is currently the homepage?

`src/app/page.tsx` is the App Router homepage for `/`.

It is a client component exporting `Home`. It directly renders a normal marketing page. Browser verification at `http://127.0.0.1:3100/` showed the heading **“Built with purpose. Engineered to perform.”**, the emblem, and the conventional site header/footer.

### 2. Which component is actually rendered by the homepage?

The homepage renders its complete JSX directly inside the `Home` component. It does **not** import or render `OpeningExperience`, `ServiceReel`, or `ModelSitesStack`.

The root layout additionally wraps every route with:

- `Navbar` from `src/components/Navbar.tsx`
- `Footer` from `src/components/Footer.tsx`

### 3. Which wheel/reel implementation is currently connected?

There are two meanings of “connected”:

- **Connected to the live local homepage route:** none.
- **Connected inside the cinematic component tree:** `OpeningExperience.tsx` imports and renders `ServiceReel.tsx`; that component emits `.foundation-reel` markup.

The `foundation-reel` is the previously identified dark metallic shell with two horizontal card belts. Its source is `src/components/ServiceReel.tsx`, with its active style block beginning around line 545 of `src/components/HomeExperience.css`.

However, `HomeExperience.css` is not imported anywhere in `src`, so even rendering `OpeningExperience` as-is would not currently load these styles.

### 4. Which wheel/reel code is unused or dead code?

Currently unused:

- All of `OpeningExperience.tsx`, because no route imports it.
- `ServiceReel.tsx` and its `.foundation-reel` UI, because its only consumer is the unused opening.
- `ModelSitesStack.tsx`, for the same reason.
- `AuroraCanvas.tsx`, for the same reason.
- All of `HomeExperience.css`, because no source file imports it.
- The older circular `.service-reel`, `.service-reel__track`, `.service-reel__card`, orbit, halo, instruction, and focus CSS (approximately lines 260–477). No current JSX emits these class names.
- Older opening CSS selectors for elements no longer emitted by `OpeningExperience.tsx`, including portal/ring/core/start-mark rules, appear stale even within that disconnected implementation.

The current `ServiceReel.tsx` is not circular. It creates duplicated service arrays for seamless horizontal belt animation and uses inline SVG service drawings rather than project image files.

### 5. Where are the original images and videos stored?

Primary media is in `public/`:

- `public/marketing-video.mp4`
- `public/video-thumbnail.jpg`
- `public/mike-dahlin.jpg`
- `public/images/dashboard renderings.png`
- `public/images/Kinetic editorial homepage for MLR Creative Studios.png`
- `public/images/MLR Chrome Workshop Showroom.png`
- `public/images/MLR Emblem.png`
- `public/images/MLR's Shape-Shifting Creative Gallery.png`
- `public/images/MLR's Shape-Shifting Creative Gallery - panel 1.png`
- `public/images/MLR's Shape-Shifting Creative Gallery - panel 2.png`
- `public/images/MLR's Shape-Shifting Creative Gallery - panel 3.png`
- `public/images/Trans Am Dashboard.png`

Template assets are under:

- `public/templates/ted-blue/`
- `public/templates/ted-v1/`
- `public/templates/ted-v2/`

The only project image matching a real individual is `mike-dahlin.jpg`; the active homepage currently substitutes a gray circle containing the word “Mike” instead of using it.

No files named for **Iron North, Ember, White Pine Dental, Northshore Lodge, or Velvet Room** were found. “Apex Motor Co.” appears in homepage text and uses `Trans Am Dashboard.png`, but no dedicated Apex-named image exists. The requested six-brand card asset set is therefore missing from this archive as named files. It must not be fabricated or silently substituted.

### 6. Which routes/pages exist?

Verified application pages:

- `/` → `src/app/page.tsx`
- `/about` → `src/app/about/page.tsx`
- `/contact` → `src/app/contact/page.tsx`
- `/services` → `src/app/services/page.tsx`
- `/work` → `src/app/work/page.tsx`
- `/templates/atlaslume` → `src/app/templates/atlaslume/page.tsx`

Additional application endpoints/routes found:

- `/api/chat`
- `/api/contact`
- `/icon`
- `/robots.txt`
- `/sitemap.xml`

Static templates are also exposed from `public/templates/ted-blue`, `ted-v1`, and `ted-v2` by file paths, although these are not Next.js page components.

### 7. Which pages are complete, incomplete, broken, or duplicated?

#### `/` — incomplete / internally inconsistent

- Loads successfully at desktop and mobile sizes.
- Uses actual MLR images in several sections.
- It is not the cinematic opening implementation.
- “Press Play” is an inert button; it does not open or play anything.
- “View Project,” “Learn More,” and the home contact button have no connected action.
- Service cards visibly contain **“Placeholder for service description...”**.
- Mike’s real image is not used; a gray placeholder circle is rendered.
- The industry cards use empty gray artwork areas rather than real brand assets.
- No reel/wheel is rendered.

#### `/about` — structurally complete, visually separate from cinematic direction

- Loads with its own title, readable content, real `mike-dahlin.jpg` source, CTA links, header, and footer.
- No horizontal mobile overflow was measured.
- It uses the conventional shared visual system and “MLR Assets” branding rather than the disconnected cinematic treatment.
- It is not a duplicate route, but some generic CTA/footer structures are shared with other pages.

#### `/contact` — structurally complete but not fully verified end-to-end

- Loads and the form is accessible.
- Email and telephone links are present.
- The page inherits the global homepage metadata title instead of a contact-specific title.
- The form submit handler targets `/api/contact`; a real submission was intentionally not sent because it can trigger email/external side effects. Therefore email delivery is **not verified**.

#### `/services` — structurally complete but brand/content mismatch

- Loads with a page-specific title and responsive layout.
- Contains a full conventional AI/web-development services page.
- Its categories do not match the five requested reel categories; the page emphasizes AI Web Development, Custom Applications, E-Commerce, Performance & SEO, and AI Integration.
- Several controls are buttons rather than links; their behavior requires repair/verification in a later phase.

#### `/work` — structurally complete, with link risks and duplicated presentation

- Loads with a page-specific title and responsive layout.
- Lists real/live links and template/demo links.
- Two “Visit live site” links point to `https://www.mlrassets.com/templates/...`, making local inspection depend on the current live domain even though equivalent static files exist locally.
- The same Ted templates are presented once as project cards and again in a Templates & Demos group; this is duplicated presentation, not duplicated route source.
- External live-site destinations were inventoried but not opened, because the local archive—not the live site—is the source of truth for this task.

#### `/templates/atlaslume` — complete as a visual demo, intentionally not a real business page

- Loads with its own title and a clear concept disclaimer.
- Responsive with no measured horizontal overflow.
- “Dare Us,” “Choose Starter,” and “Choose Pro” are presentation buttons without implemented actions in this page source.
- It is intentionally a demo and should not be treated as approved MLR homepage content.

#### Duplication summary

- Shared Navbar/Footer wrapping occurs on all routes by design.
- `/work` repeats Ted template entries in two areas.
- The archive has two competing homepage directions: active conventional marketing JSX and disconnected cinematic source.
- `HomeExperience.css` contains both old circular reel styles and later “APPROVED FOUNDATION” horizontal reel overrides/implementation styles.

### 8. Which interactions currently work?

Personally verified in the browser/source-connected render:

- All six requested routes return and render successfully at the local port.
- Shared navigation links are present on every route.
- Mobile layouts did not produce document-level horizontal overflow at the tested viewport (CSS viewport reported 375 px width).
- Desktop and mobile pages render header/footer content.
- `mailto:` and `tel:` links are correctly formed.
- About, Services, Work, Contact, and AtlasLume CTA links that are actual anchors point to existing local routes where expected.
- Theme and mobile-menu controls are rendered by the Navbar; their full keyboard interaction sequence still needs dedicated Phase 3 testing.
- The contact form fields and submit control render.

The disconnected opening/reel interactions cannot count as working because they are not accessible from a route and their CSS is not loaded.

### 9. Which interactions currently fail?

Confirmed from source and browser rendering:

- Homepage **Press Play** does nothing.
- No opening flash or transition occurs on the active homepage.
- No wheel/reel is present on the active homepage.
- Homepage **View Project**, **Learn More**, and **Start The Conversation** are inert buttons.
- AtlasLume **Dare Us**, **Choose Starter**, and **Choose Pro** are inert.
- The `foundation-reel` currently has automatic CSS translation and card selection logic, but no desktop pointer dragging/manual rotation logic.
- Its mobile implementation is an overflow scroller, not a wheel with inertia/resume behavior.
- There is no playable-hover-only custom play cursor. `OpeningExperience` only updates CSS variables for a light field, and that implementation is disconnected.
- Some old circular reel CSS describes rotation, but there is no current component markup or pointer/touch controller connected to it.
- Contact email delivery is unknown and unverified because no external-effect submission was made.
- The dev browser logged an HMR WebSocket handshake error when accessed through `127.0.0.1`; rendered route requests themselves succeeded. This is a development transport issue, not a production-build failure.

### 10. What can safely be repaired without destroying the original design?

Safe next steps, in order:

1. Add a **local-only source preview route** for `OpeningExperience` before replacing `/`. This allows direct browser comparison while preserving the active homepage.
2. Import `HomeExperience.css` only for that preview boundary and identify which selectors are live versus stale.
3. Repair encoding-corrupted characters and missing metadata titles without changing layout.
4. Make the opening’s existing `PRESS PLAY` flow visible and verify its flash/timing/reduced-motion behavior.
5. Treat `foundation-reel` as the currently connected cinematic reel unless further source evidence proves otherwise; do not promote the dead circular CSS merely because it exists.
6. Remove debug labels such as `AUTOMATIC REEL` only after the source preview confirms their origin.
7. Add pointer/touch control to the existing reel geometry rather than replacing it with a generic carousel.
8. Use only existing media. Stop and request the six concept-brand assets if they are required; they are not present by those names.
9. Replace only proven placeholders (for example the active homepage’s gray Mike circle) with corresponding real local assets.
10. Preserve the active homepage in backup/source history until the cinematic preview is approved for `/`.

---

## Verification and build results

### Install

`npm install` completed against the existing package manifest and lockfile.

### Production build

`npm run build` **succeeded** with Next.js 16.2.12. TypeScript passed, 13 static pages were generated, and the six required page routes appeared in the build route table.

An informational warning stated that using edge runtime disables static generation for the affected page; it did not fail the build.

### Lint

`npm run lint` **failed**. The run reported 14 errors and 1,426 warnings after the backup was created, because ESLint also traversed the copied source under `_backups`; this approximately duplicates the underlying findings. One confirmed source error is `ThemeToggle.tsx` calling `setTheme` directly in an effect. Existing generated/static template bundles also contribute a large warning count. Lint must be scoped/fixed in a later phase; the build itself remains successful.

### Local browser preview

- Port 3000 was already occupied by unrelated listener(s), which returned 404 responses and could not be used reliably.
- The audited project was therefore started safely on **`http://127.0.0.1:3100`** / **`http://localhost:3100`**.
- All six required routes rendered there in Chromium at 1440×900 and 390×844 browser sizes.
- Screenshots were captured for every route at both sizes.

## Files changed during Phase 1

- Added `SOURCE-OF-TRUTH-AUDIT.md` (this audit).
- Added `_backups/pre-phase1-20260814-021311/` as the required pre-edit safety copy.
- Local install/build/dev tools generated or updated ignored/runtime material such as `.next` and log files; no application implementation was intentionally edited.

## Files intentionally left unchanged during Phase 1

All application source and public media, including:

- `src/app/page.tsx`
- `src/app/layout.tsx`
- every other route under `src/app/`
- every component under `src/components/`
- `src/components/HomeExperience.css`
- all files under `public/`
- `package.json` and project configuration

## Phase 1 conclusion

The known archive facts are verified: this is Next.js; all six named routes exist; the cinematic opening is in `OpeningExperience.tsx`; the service component is `ServiceReel.tsx`; and the active cinematic component’s reel is `foundation-reel`, a two-row horizontal reel in a metallic shell. The archive homepage currently renders a conventional marketing hero instead. Circular reel CSS exists but is disconnected and cannot yet be called the original approved wheel.

**Nothing was deployed.**
