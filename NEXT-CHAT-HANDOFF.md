# MLR Design Studio — Current Production Handoff

Updated: 2026-08-15 22:04 Central

## How to resume

Read this file completely, then read the authoritative master plan:

`C:\Users\harle\Projects\mlr-design-studio\mlr-design-studio-full-website-plan.txt`

Continue from the exact next action near the end of this file. Do not restart planning, redo approved work, or introduce unrelated side projects.

## Active repository

- Working directory: `C:\Users\harle\Downloads\mlrassets.com-master`
- GitHub: https://github.com/Mikedahlin/mlr-design-studio
- Branch: `main`
- Last pushed milestone: `885ec92 Add cinematic opening and first three interactive project sites`
- Vercel is connected to GitHub/main.

## Governing rule

The master plan is the authoritative production backlog until complete. New user instructions override stale details in that file. Work phase-by-phase, validate each milestone, and stop getting sidetracked.

## Locked approvals and decisions

### Homepage opening

- Approved clean source video:
  `C:\Users\harle\Downloads\MLR_Design_Studio_Website _Video.mp4`
- Integrated web assets:
  - `public/media/mlr-opening/mlr-opening.mp4`
  - `public/media/mlr-opening/mlr-opening.webm`
  - `public/media/mlr-opening/mlr-opening-poster.jpg`
- Desktop shows Press Play, plays the silent ten-second film, then reveals the wheel.
- Mobile enters the wheel directly.
- This opening works and must not be replaced with rejected local recreations.

### Six-card wheel

The featured wheel remains six curated projects:

1. Iron North
2. Ember
3. Apex Motor Co.
4. White Pine Dental
5. Northshore Lodge
6. Velvet Room

Do not remove Iron North. Its construction video is one of the strongest carousel visuals, and Iron North must be built out as a complete construction concept.

The wheel's approved desktop appearance, direction, pace, black environment, card concept, and general behavior must not be casually redesigned.

Recent fixes:

- Mobile card bottoms no longer clip.
- Mobile depth, orbit, touch sensitivity, and flick response were improved; user explicitly said mobile is WAY better. Preserve this baseline.
- Desktop side-card pointer logic was updated so clicking a card beside center brings it into focus; clicking the centered card opens details.
- Original Apex cinematic wheel video was restored. Do not replace it with the UI-capture slideshow.

### Homepage folding navigation — approved

User approved small, thin, fast, smooth folding cards/drawers.

Desktop placement: upper-left, clear of the centered neon sign and wheel.

Collapsed labels:

- SERVICES
- WORK
- STUDIO

Constraints:

- Relatively small and thin
- Fast and smooth physical fold/unfold feel
- Only one open at a time
- Click outside and Escape close it
- Must not interfere with wheel drag
- Keyboard accessible
- Reduced-motion fallback
- Mobile uses a compact bottom dock/bottom sheet rather than shrinking desktop tabs
- Contact remains upper-right

Suggested content:

- Services: websites/development, brand identity, renderings/visual production, video/motion, graphic design, SEO/performance/accessibility
- Work: featured projects, full archive, client/concept distinction, case studies
- Studio: direct creative partnership, ownership/portability, process, About MLR

User does NOT want a special “Live Site” or “Live Work” homepage example/card.

### Majestic Pine Renovations

- Site: https://majesticpinerenovations.com
- This is the user's real work example and belongs in the complete Work archive/case studies.
- Do not replace Iron North with it.
- Do not create a special “live site example” homepage drawer.
- Present it naturally as client work where appropriate, with normal project/case-study presentation.

### Living MLR sign

The current wheel logo remains a font/SVG simulation and is not the desired final sign.

The desired sign is the living MLR STUDIO neon tubing from the approved clean film: fixed tube geometry, moving colored energy, pulsing/breathing/flicker, hot white core, colored bloom, and black surroundings. Do not produce another generic font approximation or crude threshold mask.

This remains a Phase 1 item, but do not derail the rest of production with another low-quality Blender/Wan recreation. Use the clean approved film as the visual source/reference and retain a robust reduced-motion fallback.

## Project sites completed as first passes

### White Pine Dental

- Route: `/work/white-pine-dental`
- Files: `src/app/work/white-pine-dental/`
- Gemini/Nano Banana imagery: `public/media/white-pine/`
- Has treatment explorer, booking demo, education, first-visit information, insurance/financing guidance, disclaimers, responsive behavior, and wheel preview.

### Velvet Room

- Route: `/work/velvet-room`
- Files: `src/app/work/velvet-room/`
- Imagery/media: `public/media/velvet-room/`
- Has service explorer, consultation, booking demo, editorial imagery, and wheel preview.

### Apex Motor Co.

- Route: `/work/apex-motor`
- Files: `src/app/work/apex-motor/`
- Imagery/media: `public/media/apex-motor/`
- User likes the basic site direction but wants better car images and much more realistic custom-build discussion.
- Expand platform/build logic: intended use, current modifications, fuel, powertrain, supporting systems, brakes, tires, suspension, cooling, fueling, drivetrain, thermal consistency, diagnostics, reliability, emissions/legal tradeoffs, and staged daily/street-track/closed-course paths.
- Never invent horsepower gains, awards, customers, or shop results.
- Wheel uses original `/media/apex-motor-co.mp4`, not the UI slideshow.

## Critical design correction

The user correctly observed that White Pine, Velvet Room, and Apex currently look structurally too similar. They are first passes, not final portfolio pieces.

They must be differentiated by information architecture, navigation, motion, interaction, and conversion—not just color and imagery.

Direction:

- White Pine: calm linear guided-care experience; concern-based treatment journey, education library, insurance/new-patient flow.
- Velvet Room: nonlinear editorial lookbook; horizontal/magazine layouts, draggable visual portfolio, moodboard-style consultation, compact booking drawer.
- Apex: technical build workstation; vehicle-platform entry, persistent build spec, dependency graph, staged builds, data/logging, exploded views/hotspots.
- Iron North: construction/jobsite system; project map/archive, capabilities, material explorer, bid/qualification workflow, timeline/documentation.
- Northshore Lodge: spatial property map, accommodations, itinerary, seasons/weather, availability concept.
- Ember: sensory menu/ingredient/heat experience, reservation, private events, sourcing, dietary/accessibility filters.

Shared code may cover invisible infrastructure, but visible composition must not feel templated.

## Nano Banana / visual-production decision

- Nano Banana MCP is repaired and uses stable `gemini-2.5-flash-image` with explicit 16:9 imageConfig.
- It successfully generates 1344×768 imagery.
- User wants a TON of excellent graphics, renderings, architectural/house imagery, campaign art, and video-source visuals.
- Generate at scale only after locking each project's brief and visual direction; do not waste quota on incoherent bulk output.
- Final logos must be rebuilt as clean SVG/vector artwork rather than shipping generated malformed text.
- Videos should combine real browser interaction captures, Nano Banana stills, parallax/camera movement, local atmospheric layers, Blender where useful, and FFmpeg. Do not rely on weak Wan 1.3B for whole branded films.

## Truthfulness rules

- Clearly distinguish client work and concept work.
- No fake testimonials, employees, patients, attorneys, doctors, awards, outcomes, rankings, performance gains, or engagement figures.
- Synthetic actors/footage must be presented as concept/illustrative material where needed.
- No SEO ranking guarantees.

## Remaining featured sites

- Iron North — build as construction concept; preserve its wheel video.
- Northshore Lodge — not built.
- Ember — not built; remove/avoid “Supper Club” framing and define it as premium hospitality/dining.

## Main MLR pages still required

- Work archive with client/concept distinction and Majestic Pine
- Full case studies
- Services
- Ownership and portability positioning
- About
- Contact refinement
- Accessibility, SEO, performance, media, metadata, sitemap/robots, cross-browser and mobile QA

Ownership must state:

- Clients own agreed finished deliverables.
- No monthly rent merely to retain ownership.
- Compatible hosting and portability are supported.
- Editing, hosting help, and maintenance are optional.

## Exact next action

1. Check `git status` and the latest deployment state.
2. Implement the approved compact folding SERVICES / WORK / STUDIO navigation on the homepage with the desktop and mobile behavior above.
3. Validate that it does not interfere with desktop mouse drag, mobile touch/flick, center-card inspection, or the improved mobile geometry.
4. Run ESLint and the production build.
5. Show the user for approval before starting another large site.
6. Then formalize the six locked project briefs and visual-production matrices so the existing first passes can be differentiated and completed systematically.

Do not start another unrelated concept, replace Iron North, add a special Live Work drawer, or change the approved wheel mechanics.
