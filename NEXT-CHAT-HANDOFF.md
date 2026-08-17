# MLR Design Studio — Exact Current Production Handoff

Updated: 2026-08-16 21:30 Central

## START HERE — do not restart or re-plan

1. Read this entire file.
2. Read the authoritative master plan at:
   `C:\Users\harle\Projects\mlr-design-studio\mlr-design-studio-full-website-plan.txt`
3. Continue from **EXACT NEXT ACTION** near the bottom.
4. Preserve every locked approval below. New user instructions override older details.
5. Do not ask the user to locate source frames or manually organize files that already exist locally. Inspect and move files yourself.

## AUTHORITATIVE APPROVAL BOUNDARY — DO NOT DRIFT

- The homepage is the only approved design direction, and it is still being finished.
- Every other existing page is rejected as a final design and must be rebuilt.
- White Pine, Velvet Room, and Apex routes are prototype/source material only; do not polish or treat them as approved portfolio pieces.
- Services, Work, Studio/About, Contact, and all project experiences will be rebuilt around the approved homepage quality and the locked differentiated project systems.
- Produce a project wheel film from its final rebuilt direction, not from a rejected prototype layout.
- Full authority: `production/AUTHORITATIVE-APPROVAL-BOUNDARY.md`.

## Active repository and production

- Working directory: `C:\Users\harle\Downloads\mlrassets.com-master`
- GitHub: https://github.com/Mikedahlin/mlr-design-studio
- Branch: `main`
- Current HEAD: `62774d4 fix: resolve pointer capture drag issue and implement video preload strategy`
- Correct Vercel production URL: https://mlr-creative-studios-experience.vercel.app/
- Correct Vercel project: `mlr-creative-studios-experience`
- The repository lacks a local `.vercel/project.json`, so bare `vercel ls` can incorrectly infer an old project named `route7`. Never deploy to `route7`.

## Current uncommitted working tree — preserve it

Expected `git status --short`:

```text
?? production/mlr-opening/audit/audit-data.json
?? production/mlr-opening/audit/frames/
?? production/mlr-opening/audit/mlr-opening-contact-sheet-4fps.jpg
?? production/mlr-opening/audit/parse_audit.py
?? qa-*.json
```

## What was just completed & pushed

1. **Homepage folding navigation**: Fully implemented, validated, and pushed to main.
2. **Cinematic wheel-video correction**: All six cards now use the 10-second cinematic MP4s. 
3. **Performance & Physics Fixes**: 
   - A video `preload` optimization was implemented in `HomepageRebuild.tsx` so the heavy videos don't lock the main thread while spinning.
   - The desktop pointer capture bug (where the cursor gets stuck holding the wheel) has been resolved.
   - Wheel drag friction and velocity coasting were restored to their optimal values.

## Locked homepage approvals

### Opening
- Integrated assets: `public/media/mlr-opening/mlr-opening.mp4` / `.webm` / `-poster.jpg`
- Desktop: Press Play, silent ten-second film, then wheel. Mobile: direct wheel entry.
- User wants the approved film cleaned up from AI/choppy inconsistencies. MP4 is H.264, 1280×720, 24 fps, exactly 10.0 seconds.

### Six-card wheel
Locked projects:
1. Iron North — construction concept; do not remove or replace.
2. Ember — premium hospitality/dining.
3. Apex Motor Co.
4. White Pine Dental
5. Northshore Lodge
6. Velvet Room

### Living sign
- Current homepage `NeonMark` is a generic SVG font simulation and is **not final**.
- User wants the physical MLR STUDIO glass tubing from the approved film: fixed geometry, hot-white core, moving cyan/magenta/violet/green/ember energy, localized flow around bends, glass shell, colored bloom, breathing, restrained flicker, pure black surroundings.
- Rebuild as actual vector paths/tube geometry. Reduced-motion/static fallback required.

## Production assets — current status

- `production/mlr-opening/references/`: Extracted original frames.
- `production/mlr-opening/chatgpt-masters/`: Contains user-generated masters (`mlr-sign-master.png`, `mlr-transition-master.png`, and the newly added `mlr-foundry-master.png`).
- `production/mlr-opening/audit/`: Contains initial files for the frame-by-frame motion audit.

## Tools now available

- Next DevTools MCP: installed and active for browser automation/QA.
- Brave Search, FFmpeg/ffprobe, Three.js, GitHub integration.
- Playwright is installed, but prefer Next DevTools MCP.
- Only ask the user to use ChatGPT/Gemini when generation is truly required (provide exact prompts). Conserve quotas.

## EXACT NEXT ACTION

Start your new session by doing these in order:

1. **Visually inspect** `production/mlr-opening/chatgpt-masters/mlr-foundry-master.png`. Compare it with `mlr-transition-master.png`, `mlr-sign-master.png`, and the extracted references.
2. **Execute the opening film audit**: Analyze the scripts/data inside `production/mlr-opening/audit/` to identify the exact timestamps/ranges with visible geometry morphing, jumps, or exposure shifts in the 10-second opening video. Decide on a cleanup plan (preserve strong segments, composite with master imagery).
3. **Reconstruct the live MLR sign**: Build it as fixed custom SVG paths/tube geometry in `HomepageRebuild.tsx` using `mlr-sign-master.png` as reference. 
4. Show the user the sign reconstruction test before moving on to heavy video generation or large project site rebuilds.

## Do not do next
- Do not install AWS/Nova Canvas or ask for more extensions.
- Do not restart planning or rewrite the gallery wheel physics.
- Do not ask the user to choose/extract frames already available.