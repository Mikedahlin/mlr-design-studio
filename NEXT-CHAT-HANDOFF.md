# MLR Design Studio — Exact Current Production Handoff

Updated: 2026-08-16 01:12 Central

## START HERE — do not restart or re-plan

1. Read this entire file.
2. Read the authoritative master plan at:
   `C:\Users\harle\Projects\mlr-design-studio\mlr-design-studio-full-website-plan.txt`
3. Continue from **EXACT NEXT ACTION** near the bottom.
4. Preserve every locked approval below. New user instructions override older details.
5. Do not ask the user to locate source frames or manually organize files that already exist locally. Inspect and move files yourself.

## Active repository and production

- Working directory: `C:\Users\harle\Downloads\mlrassets.com-master`
- GitHub: https://github.com/Mikedahlin/mlr-design-studio
- Branch: `main`
- Current HEAD: `6124fa1 Update handoff with approved production roadmap`
- Git remote: `origin https://github.com/Mikedahlin/mlr-design-studio.git`
- Correct Vercel production URL: https://mlr-creative-studios-experience.vercel.app/
- Correct Vercel project: `mlr-creative-studios-experience`
- Last inspected production deployment: ready, created 2026-08-15 22:05 Central.
- The repository lacks a local `.vercel/project.json`, so bare `vercel ls` can incorrectly infer an old project named `route7`. Never deploy to `route7`.

## Current uncommitted working tree — preserve it

Expected `git status --short`:

```text
 M src/components/HomepageRebuild.tsx
 M src/components/lockedWheelData.ts
?? production/
?? src/components/HomepageFoldingNav.module.css
?? src/components/HomepageFoldingNav.tsx
```

These are intentional local changes and have not been committed or pushed.

### Homepage folding navigation implemented locally

Files:

- `src/components/HomepageFoldingNav.tsx`
- `src/components/HomepageFoldingNav.module.css`
- Imported/rendered by `src/components/HomepageRebuild.tsx`

Behavior implemented:

- Desktop: small upper-left SERVICES / WORK / STUDIO tabs and folding drawer.
- Mobile: compact bottom dock and bottom sheet.
- One open at a time.
- Click outside and Escape close.
- Keyboard accessible.
- Reduced-motion fallback.
- Contact remains upper-right.
- Includes Majestic Pine naturally under Work; no special Live Site/Live Work drawer.

Validation already completed after implementation:

- `npm run lint`: passed with zero errors and two pre-existing unrelated `<img>` warnings.
- `npm run build`: passed.
- Production browser visual QA was not completed because the old Playwright profile was locked. Next DevTools MCP has since been installed and should be used for browser/runtime QA.

### Cinematic wheel-video correction implemented locally

- `src/components/lockedWheelData.ts` now points White Pine back to `/media/white-pine-dental.mp4` and Velvet Room back to `/media/velvet-room-salon.mp4` instead of their short UI/site capture videos.
- Apex remains the approved original `/media/apex-motor-co.mp4`.
- All six cards now use the existing cinematic 10-second, 1280×720 H.264 films.
- `HomepageRebuild.tsx` currently starts all card videos, loops them muted, and preloads them so side cards do not appear static.
- Lint and build passed after this correction.
- This all-video playback approach still requires real-browser performance QA, especially mobile. If six simultaneous videos cause memory/performance problems, preserve cinematic motion but implement a smart nearby-card playback strategy rather than reverting White Pine/Velvet to UI captures.

## Locked homepage approvals

### Opening

- Approved clean source video originally supplied by user:
  `C:\Users\harle\Downloads\MLR_Design_Studio_Website _Video.mp4`
- Integrated assets:
  - `public/media/mlr-opening/mlr-opening.mp4`
  - `public/media/mlr-opening/mlr-opening.webm`
  - `public/media/mlr-opening/mlr-opening-poster.jpg`
- Desktop: Press Play, silent ten-second film, then wheel.
- Mobile: direct wheel entry.
- User now sees potentially choppy/AI-inconsistent spots and wants the approved film cleaned up, not casually replaced by another poor recreation.
- Current technical source analysis: MP4 is H.264, 1280×720, 24 fps, exactly 10.0 seconds, 240 frames. Choppiness is likely generated motion/geometry inconsistency rather than variable frame rate.

### Six-card wheel

Locked projects:

1. Iron North — construction concept; do not remove or replace.
2. Ember — premium hospitality/dining; stop using “Supper Club” framing in future copy.
3. Apex Motor Co.
4. White Pine Dental
5. Northshore Lodge
6. Velvet Room

Preserve approved wheel direction, pace, pure-black environment, card concept, desktop geometry, improved mobile depth/orbit/touch/flick baseline, side-card focus behavior, and center-card inspection behavior.

### Living sign

- Current homepage `NeonMark` is still a generic SVG `<text>`/font simulation and is explicitly not final.
- User wants the physical MLR STUDIO glass tubing from the approved film: fixed geometry, hot-white core, moving cyan/magenta/violet/green/ember energy, localized flow around bends, glass shell, colored bloom, breathing, restrained flicker, black surroundings.
- Rebuild as actual vector paths/tube geometry, not another font approximation or crude threshold mask.
- Reduced-motion/static fallback required.

## New MLR opening production assets — completed and organized

The assistant extracted reference frames from the approved opening. They are in:

`production/mlr-opening/references/`

Files:

- `frame-00-75.png`
- `frame-02-50.png`
- `frame-04-50.png`
- `frame-06-50.png`
- `frame-08-25.png`
- `frame-09-50.png`
- `mlr-opening-contact-sheet.jpg`

The user then generated all three requested ChatGPT master images. They are now copied into:

`production/mlr-opening/chatgpt-masters/`

Files:

- `mlr-foundry-master.png` — newly located at Downloads and copied into production at this save point.
- `mlr-transition-master.png`
- `mlr-sign-master.png`

Original downloaded masters also exist in `C:\Users\harle\Downloads\`.

### Visual assessment already made

- `mlr-sign-master.png`: strong and suitable as the primary geometry/lighting reference. Correct MLR/STUDIO wording, clean multicolor tubes, white cores, pure black. It should guide manual fixed-path reconstruction; do not ship the raster image as the live sign.
- `mlr-transition-master.png`: visually strong machinery/energy reference, but it changed the sign into a flat horizontal composition. Use its machinery and energy, not its generated lettering. Composite/animate correct stacked MLR/STUDIO geometry.
- `mlr-foundry-master.png`: completed by user at 01:09 Central and copied into production, but has not yet been visually inspected. Inspect it first next chat.

Do not ask the user to regenerate these images or hunt for them.

## Tools now available

- Nano Banana: active, stable `gemini-2.5-flash-image`, 16:9 generation.
- Brave Search MCP: secret saved and server activated; web, image, video, news, and context tools available.
- Next DevTools MCP: directly added and activated; includes Next.js runtime diagnostics, docs, and browser automation.
- Playwright: installed, but its prior Chrome profile was locked; prefer newly installed Next DevTools browser automation or clean up stale Playwright process if necessary.
- FFmpeg/ffprobe: installed and working locally.
- Three.js: dependency installed.
- GitHub integration: active.
- Glif: account showed four repeated Goose OAuth connections after timed-out attempts, but Glif tools were not exposed locally. User has only 50 free credits/day. Do not waste time or credits; user should not be asked for another token unless the extension explicitly requires it.
- ChatGPT Images: user can generate excellent stills manually and has substantial allowance.
- Gemini/Veo: user can generate better videos manually from copy/paste prompts. Use only after exact shot/keyframe planning.
- Amazon Nova Canvas: explicitly abandoned. User does not want an AWS account. Do not revisit unless asked.

## User workflow preference — important

The user is frustrated because they have spent days providing extensions and manually doing production work. Going forward:

- Stop installing tools unless there is a proven blocker.
- Do all local extraction, inspection, file discovery, organization, compositing, code, QA, and deployment yourself.
- Only ask the user to use ChatGPT/Gemini when their account is truly required for generation.
- When asking for generation, provide one exact copy/paste prompt, exact input file paths already selected by you, exact output filename, and wait for inspection before requesting more.
- Never tell the user to “find strong frames”; extract/select them yourself.
- Conserve Glif and Brave quotas.

## Project-site state and design differentiation

First-pass sites already exist:

- `/work/white-pine-dental`
- `/work/velvet-room`
- `/work/apex-motor`

They currently look too structurally similar and are not final portfolio pieces.

Locked differentiation:

- White Pine: calm linear guided-care journey, education, insurance/new-patient flow.
- Velvet Room: nonlinear editorial lookbook, horizontal/magazine layouts, draggable portfolio, moodboard consultation, compact booking drawer.
- Apex: technical build workstation, platform entry, persistent spec, dependency graph, staged builds, data/logging, exploded views/hotspots.
- Iron North: construction/jobsite system, map/archive, capabilities, materials, bid/qualification, timeline/documentation.
- Northshore: spatial property map, accommodations, itinerary, seasons/weather, availability.
- Ember: sensory menu/ingredient/heat, reservation, private events, sourcing, dietary/accessibility filters.

Apex also needs better vehicle imagery and realistic build logic covering intended use, existing modifications, fuel, powertrain, supporting systems, brakes, tires, suspension, cooling, fueling, drivetrain, thermal consistency, diagnostics, reliability, emissions/legal tradeoffs, and staged daily/street-track/closed-course paths. Never invent horsepower or outcomes.

## Truthfulness and ownership rules

- Clearly distinguish client and concept work.
- Majestic Pine Renovations (https://majesticpinerenovations.com) is real client work and belongs naturally in Work/case studies; do not replace Iron North with it.
- No fake testimonials, staff, patients, doctors, attorneys, customers, awards, results, rankings, performance gains, or engagement figures.
- Synthetic actors/footage are concept/illustrative where needed.
- No SEO guarantees.
- Ownership copy must state clients own agreed finished deliverables; no monthly rent merely to retain ownership; compatible hosting and portability supported; editing, hosting help, and maintenance optional.

## EXACT NEXT ACTION

Do these in order without asking the user to generate anything else first:

1. Open and visually inspect `production/mlr-opening/chatgpt-masters/mlr-foundry-master.png`. Compare it with `mlr-transition-master.png`, `mlr-sign-master.png`, and the extracted references/contact sheet.
2. Perform a more useful frame-by-frame/motion audit of the existing 10-second opening. Identify exact timestamps/ranges with visible geometry morphing, jumps, camera stutter, exposure shifts, or weak handoff into the wheel. Create an audit document under `production/mlr-opening/`.
3. Decide and document the least-destructive cleanup plan: preserve strong original segments; repair/re-time/interpolate only safe ranges; use master imagery for replacement/composite shots where necessary; do not blindly interpolate lettering.
4. Begin reconstructing the live MLR sign as fixed custom SVG paths/tube geometry using `mlr-sign-master.png` and clean source frames as references. Replace the current font-based `NeonMark` only when the new sign is demonstrably better. Keep reduced-motion fallback.
5. Use Next DevTools runtime/browser automation to visually QA the existing folding nav and six cinematic wheel videos at desktop and mobile. Verify nav does not interfere with drag/flick/selection and measure whether six simultaneous videos are acceptable.
6. Run lint/build after any changes.
7. Create a local git save-point commit only after the current homepage nav/video changes and organized production assets are checked and intentional. Push to `main` only after validating the correct Vercel project/production URL. Never deploy to route7.
8. Show the user the opening/sign cleanup test and homepage milestone before requesting Gemini video generations or starting another large project site.

## Do not do next

- Do not install AWS/Nova Canvas.
- Do not restart planning.
- Do not ask for more extensions.
- Do not ask the user to choose/extract frames already available.
- Do not replace Iron North.
- Do not add a Live Work drawer.
- Do not revert to static UI recordings on homepage cards.
- Do not casually alter approved wheel mechanics.
- Do not generate all six replacement films before the opening/sign workflow and one benchmark are approved.
