# MLR Assets Website — Locked Build Handoff

**Updated:** August 14, 2026  
**Project root:** `C:\Users\harle\Downloads\mlrassets.com-master`  
**Purpose:** This is the detailed source of truth for continuing the website build in a new Goose chat.

---

## 1. Instructions for the next Goose chat

Read this entire file before changing anything.

The owner has completed the planning discussion and wants to begin building. Do not restart discovery, re-propose rejected ideas, or ask the owner to repeat earlier answers. Make reasonable implementation decisions within this specification. Ask only if a decision would materially conflict with a locked requirement.

The immediate job is to build and perfect the **homepage opening and six-site wheel/gallery**. Do not redesign the rest of the MLR site yet. Produce desktop and mobile renderings, explain what changed, and iterate until the owner explicitly says:

> **Wheel approved.**

Only after that approval may work move to the remaining MLR pages and case-study system.

Use backups before destructive edits. The working folder is not currently recognized as a Git repository, so preserve recoverability manually.

---

# 2. Non-negotiable rules

## 2.1 Absolutely no existing AtlasLume material

- Do not use the existing AtlasLume code.
- Do not use its existing layout.
- Do not use its copy.
- Do not use its styling.
- Do not use its components.
- Do not use its existing concept.
- Do not show it in Work, templates, the wheel, case studies, navigation, or recommendations.
- When implementation reaches route cleanup, remove the existing AtlasLume route and every public reference to it.
- Do not mention or propose it to the owner again.
- Its name could only be reused for a completely new site if the owner explicitly requests that in the future. No such reuse is currently approved.

## 2.2 No canned AI/agency language

Do not use:

- “AI-native”
- Generic “human” or “built by humans” slogans
- Empty AI/startup jargon
- Canned agency filler
- Claims that cannot be supported

Copy must be direct, concrete, and understandable to a small-business customer.

## 2.3 Homepage remains silent

- No homepage music.
- No wheel sound effects.
- No homepage haptic gimmicks.
- Audio is reserved only for a separate future car/dashboard experience.

## 2.4 Wheel-first approval gate

- The homepage wheel/gallery is the only active design phase.
- Do not continue redesigning About, Services, Work, Contact, or other public pages until the owner says **“Wheel approved.”**
- Desktop and mobile renderings are required before approval.

## 2.5 Privacy/name rule for the law project

The law project must be called:

> **Ted B. Law**

Do not publicly use Ted’s full last name anywhere going forward. Replace/remove the full name from future MLR portfolio labels, case-study copy, links, metadata, and version selectors. Existing archived source may still contain the old name internally, but public presentation must use **Ted B. Law**. Before public launch, audit the interactive law versions for visible full-name references and anonymize them appropriately.

---

# 3. Locked business and sales model

MLR sells custom websites through beautiful, complete visual presentations.

## 3.1 What the customer should understand

MLR’s advantage over Wix, GoDaddy, and similar cookie-cutter site builders is not just appearance. The website must communicate:

- A mass-market template platform often keeps a business dependent on that platform.
- The business may remain subject to platform pricing, restrictions, templates, and portability limits.
- An MLR site is custom-designed for the specific business.
- The customer owns and controls the finished site deliverables according to the contract.
- The customer is not paying monthly “rent” to MLR merely to keep ownership of the design/site.
- The customer may choose compatible hosting and should be able to move the delivered site.
- MLR can optionally provide ongoing paid services when the customer wants help editing products, content, or other site material.
- Optional maintenance/editing is a service—not a condition of ownership.

All ownership and transfer claims must match the actual client agreement, deliverables, credentials, licensing, source files, and hosting setup.

## 3.2 Optimization and Google visibility

Every site presentation should show and explain that MLR designs/builds for:

- Fast loading
- Responsive/mobile behavior
- Clear information architecture
- Semantic page structure
- Accessible navigation and content
- Search-friendly titles and descriptions
- Crawlable content
- Image optimization
- Technical SEO foundations
- Local-business search relevance where applicable
- Structured data where appropriate
- Good Core Web Vitals as a target
- Google ranking potential through strong technical foundations and useful content

Do **not** guarantee a specific Google position or promise “#1 ranking.” Explain that MLR builds the technical and content foundation that helps search engines understand and rank a site; actual rankings also depend on competition, content, authority, reviews, links, location, and ongoing activity.

## 3.3 Later comparison section

After the homepage wheel is approved, build a strong visual comparison between:

### Cookie-cutter platform site

- Reused template appearance
- Platform dependence
- Limited portability/control
- Recurring platform costs
- Restrictions set by someone else’s system
- Generic structure that may not fit the business

### MLR custom site

- Designed around the business
- Clear ownership/control of agreed deliverables
- Portable to compatible hosting
- Performance and search foundations
- Responsive custom presentation
- Direct relationship with the designer/builder
- Optional ongoing edits instead of mandatory MLR “rent”

Working About headline direction for later:

> **A Website You Own, Not One You Rent.**

Final wording still requires page-stage approval.

---

# 4. Homepage opening — locked direction

## 4.1 PRESS PLAY

- Keep **PRESS PLAY** on desktop.
- It launches a live cinematic webpage experience, not a conventional prerecorded intro embedded as the whole homepage.
- Replace/improve the current bright flash transition.
- The reveal should feel premium, deliberate, and related to the visual world of the wheel.
- Include a visible Skip option for the cinematic sequence.
- On mobile, skip the PRESS PLAY gate and enter the optimized homepage experience directly.

## 4.2 Silent black-and-white design montage

After PRESS PLAY and before the fully interactive wheel/gallery reveal, create a very cool, high-contrast black-and-white design montage.

Desired character:

- Approximately 8–12 seconds
- Silent
- Fast, editorial, and visually sophisticated
- Moves through strong website/design ideas
- Feels like a custom creative-agency showreel
- Not a generic slideshow
- Not a stock template montage
- May use sharp crops, fast scrolling pages, typography, grids, transitions, browser details, mobile/desktop contrasts, and architectural/project imagery
- Must transition naturally into the interactive wheel/gallery
- Include a Skip control

Available source videos are listed below. Use the strongest moments and create the treatment with web/CSS/video techniques as appropriate. Keep performance acceptable.

---

# 5. Homepage wheel/gallery — controlling specification

## 5.1 Glass House reference

Reference archive:

`C:\Users\harle\Downloads\_Archive\MLR-Glass-House-Homepage-Code`

Current integrated preview:

`/source-preview/glass-houses`

This code is only an unfinished example and starting reference. It is **not close to the final visual design**. Do not merely polish it around the edges or present it unchanged.

Useful reference qualities:

- Three-dimensional depth
- Visible surrounding projects
- Drag/flick movement
- Physical momentum
- Slow idle movement
- A project represented as an inhabitable glass structure

The houses must be visually perfected into custom agency-quality renderings.

## 5.2 Core concept

- The homepage uses a premium 3D wheel/orbit/gallery containing **six complete website concepts**.
- Each project is represented through a visually refined glass-house structure or an evolved architectural form derived from that idea.
- The glass houses should look intentional, beautiful, dimensional, and convincing—not like simple transparent CSS boxes.
- The wheel/gallery is the dominant homepage object.
- It should feel like a physical, weighted, premium interactive installation.
- Dark automotive/showroom atmosphere is approved.
- Subtle chrome/metal/mechanical framing is approved.
- Do not force the work into an ugly literal drum if that harms the architectural presentation.

## 5.3 Six projects that must be actual sites

The six projects currently represented by the wheel are:

1. Iron North — Commercial Construction
2. Ember — Upscale Supper Club
3. Apex Motor Co. — Performance Automotive
4. White Pine Dental — Modern Dentistry
5. Northshore Lodge — Minnesota Resort
6. Velvet Room — Salon & Beauty Studio

These six are different from later portfolio-board concepts:

- **All six wheel projects need actual functional website experiences built behind them.**
- A visitor must be able to select/open each one.
- Each needs a distinct design system, not a recolored duplicate.
- Each should demonstrate responsive design, optimization, and search foundations.
- Exact depth/page count should be chosen pragmatically, but each must feel sufficiently complete to support the sales promise and case study.

Do not add a seventh wheel project until the initial six are excellent unless the owner explicitly requests it. Earlier discussion mentioned more entries, but the owner’s latest instruction explicitly identifies **the six on the wheel** as the actual sites to build. Treat six as the locked implementation count for this phase.

## 5.4 Visual hierarchy

- The main/front project must be much larger than surrounding projects.
- It must be brighter, sharper, and unmistakably selected.
- Surrounding projects remain partially visible to communicate motion and depth.
- Distant projects may be darker, softer, and less readable.
- The selected structure can cast light or reflection into its environment if it improves the premium effect.
- Each project must have a genuinely different visual identity.
- Use real project imagery and purpose-built visual artwork where appropriate.
- Project names must remain legible in the selected state.
- No fixed selection needle/pointer is necessary if scale, brightness, depth, and focus make selection obvious.
- Avoid generic “Drag to explore” copy.
- Avoid conventional carousel dots and generic arrow UI unless usability testing proves a minimal control is necessary and the owner approves it.

## 5.5 Preview behavior

- Unselected/distant projects can use still images for performance.
- The selected project may use its existing project video or a richer live preview.
- The main selected house should expose clear actions such as:
  - **Open Site**
  - **View Project**
- Project details can appear as a carefully designed layer/panel associated with the selected house.
- Do not obscure the house with generic modal styling.

## 5.6 Motion

- Wheel/gallery rotates slowly while idle.
- Mouse drag is enabled.
- Touch flick is enabled.
- Mouse wheel/trackpad control is enabled while appropriately focused/in view.
- Keyboard arrow navigation is mandatory.
- Infinite travel in both directions is desired.
- A light movement should generally advance one project.
- A strong flick may pass several projects.
- Momentum should be faster and last longer than the current Glass House example.
- Motion should feel like a real weighted object with believable inertia and friction.
- While merely browsing, the wheel may return to slow idle movement rather than becoming permanently frozen.

## 5.7 Critical stop-on-selection behavior

When someone selects a project because they want to inspect or open it:

- **The wheel must stop.**
- It must not continue drifting behind the selected project.
- The selected project remains stable and readable.
- Clicking an off-center project should bring it forward first.
- Once centered/selected, the user can inspect it or open the website.
- Motion resumes only when the user closes the selected state or deliberately returns to browsing.

## 5.8 Sound

- No wheel sound.
- No montage sound.
- No homepage sound.
- No haptic/vibration effects.

## 5.9 Mobile

- Skip the PRESS PLAY gate on mobile.
- Keep an optimized 3D experience on phones.
- Preserve touch drag/flick.
- The selected project should nearly fill the useful width.
- Show portions of neighboring projects where practical to communicate continuity.
- Reduce effects, video usage, reflections, and complexity when necessary for smooth performance.
- The mobile design must not be a broken miniature of desktop.
- Test at common phone widths.

## 5.10 Accessibility and reduced motion

- Keyboard arrow navigation.
- Clear focus states.
- Semantic controls and project links.
- Screen-reader labels.
- Selected project announced appropriately.
- Reduced-motion users receive a stationary or greatly simplified project selector.
- Do not force continuous animation for reduced-motion users.

---

# 6. Case-study sales system — locked direction for after wheel approval

## 6.1 Visual format

The owner wants each project sold through a **custom-agency rendering on one large board**—a premium Behance-style case study.

A visitor should be able to see and understand the entire site through one long, art-directed project presentation.

Each case study should contain a composed mixture of:

- Dramatic project introduction
- Large full-page desktop homepage rendering
- Large renderings of internal pages
- Mobile views
- Desktop/mobile comparisons
- Enlarged hero details
- Navigation details
- Typography system
- Color system
- Buttons, cards, forms, and UI details
- Key content sections
- Interaction/motion moments
- Performance/optimization explanation
- Search/Google foundation explanation
- Responsive behavior
- Ownership/delivery explanation where appropriate
- Link to open the real interactive site when one exists
- Strong final call to action

The result should look like a professional presentation board, not a normal screenshot gallery. Screens may overlap, float, crop, or be arranged into a designed editorial composition.

## 6.2 What must actually be built

- The **six projects on the homepage wheel must have real website experiences**.
- They also receive case-study boards/pages.
- Future additional portfolio concepts do **not** all need complete coded websites.
- A future concept can be sold through a sufficiently detailed, beautiful, full-site case-study board/rendering.
- Those boards must still depict a coherent complete website—not random isolated mockups.
- If a customer chooses a concept, MLR can then build/adapt the actual site for that customer.

This is the ongoing sales model for MLR sites.

## 6.3 Optimization and Google story within case studies

Every case study should clearly demonstrate—not merely claim—how the design is prepared for:

- Mobile responsiveness
- Fast loading
- Clear page hierarchy
- Crawlable text/content
- Search-friendly metadata
- Local/business relevance
- Accessible interaction
- Optimized media
- Conversion paths
- Technical SEO fundamentals

Use concrete diagrams, callouts, or tasteful metrics where real measurements exist. Never invent Lighthouse scores or ranking results.

---

# 7. Ted B. Law — locked project treatment

## 7.1 Name

Use only:

> **Ted B. Law**

Do not use the full surname in public presentation going forward.

## 7.2 One project, multiple design directions

Ted B. Law is one project with multiple visual directions. It is not three unrelated templates.

Create one long premium case-study board/page that shows the design exploration. However, the owner answered **No** to making “all three together” the only sales presentation requirement as previously phrased. Interpret this carefully:

- The project should still acknowledge and provide access to the different design versions.
- Do not force all three complete versions into one cluttered presentation if that harms the one-board design.
- Create one coherent Ted B. Law case study and provide clear links to the alternate versions.
- Use the strongest direction as the hero presentation; show alternate directions in a clean comparison/selection section.
- Ask only if the exact lead version cannot be chosen from existing quality.

Existing versions must be preserved:

- `/public/templates/ted-v1/index.html`
- `/public/templates/ted-v2/index.html`
- `/public/templates/ted-blue/index.html`
- `/public/templates/ted-blue/about.html`
- `/public/templates/ted-blue/criminal-defense.html`
- `/public/templates/ted-blue/personal-injury.html`
- `/public/templates/ted-blue/contact.html`

Before these become publicly promoted, anonymize visible full-name references to **Ted B. Law** and provide a clear route back to the main case study/version selector.

---

# 8. Existing media inventory

Six matching project videos are available. Each is 1280×720, 24fps, and approximately 10 seconds:

- `/public/media/iron-north-construction.mp4`
- `/public/media/ember-supper-club.mp4`
- `/public/media/apex-motor-co.mp4`
- `/public/media/white-pine-dental.mp4`
- `/public/media/northshore-lodge.mp4`
- `/public/media/velvet-room-salon.mp4`

Matching still images:

- `/public/media/iron-north-construction.png`
- `/public/media/ember-supper-club.png`
- `/public/media/apex-motor-co.png`
- `/public/media/white-pine-dental.png`
- `/public/media/northshore-lodge.png`
- `/public/media/velvet-room-salon.png`

Additional existing video:

- `/public/marketing-video.mp4`

Review source media visually before deciding final montage cuts.

---

# 9. Relevant existing source

Current homepage:

- `src/app/page.tsx`
- `src/components/HomepageRebuild.tsx`
- `src/components/HomepageRebuild.module.css`
- `src/components/InteractiveReel.tsx`

Older/alternate opening source:

- `src/components/OpeningExperience.tsx`
- `src/components/HomeExperience.css`

Glass House reference integrated in current project:

- `src/app/source-preview/glass-houses/page.tsx`
- `src/components/GlassHouseGallery.tsx`
- `src/components/GlassHouseGallery.module.css`
- `src/components/lockedWheelData.ts`

Archive copy:

- `C:\Users\harle\Downloads\_Archive\MLR-Glass-House-Homepage-Code`

Do not assume the current homepage implementation is the desired final architecture. Preserve useful work but rebuild as needed to meet this specification.

---

# 10. Technical baseline and known issues

Before this handoff:

- `npm run build` passed.
- TypeScript passed.
- Static/dynamic routes generated successfully.
- ESLint had zero errors and two image-related warnings.
- No deployment, DNS, GitHub, or live-site changes were made.
- The working directory was not recognized as a Git repository.
- A backup exists at `_backups/pre-phase1-20260814-021311`.

Glass House preview issues observed:

- Current houses are not clickable/selectable.
- No stable selected state.
- No keyboard navigation.
- Reduced-motion behavior is incomplete.
- Current visual construction looks prototype-level.
- Mobile needs substantial refinement.
- Image quality 68 triggered Next.js configuration warnings.
- Development-origin warnings appeared while testing through `127.0.0.1`; this is not necessarily a production defect.

---

# 11. Build sequence for the new chat

The owner has authorized moving toward the build. Use this sequence:

## Phase A — safety and foundation

1. Read this handoff fully.
2. Create a new timestamped backup of every file that will be changed.
3. Inspect the six stills/videos and current homepage/reference implementations.
4. Make a concise implementation plan without reopening settled design questions.

## Phase B — homepage opening

1. Build/refine desktop PRESS PLAY gate.
2. Build the silent black-and-white montage.
3. Add Skip behavior.
4. Transition seamlessly into the wheel/gallery.
5. Bypass PRESS PLAY appropriately on mobile.

## Phase C — perfected wheel/gallery

1. Rebuild/evolve the Glass House visuals to custom-agency quality.
2. Implement six distinct projects.
3. Create the large, bright, stable main selection.
4. Implement believable idle rotation, dragging, flick momentum, friction, infinite travel, mouse wheel control, and keyboard navigation.
5. Stop completely on project selection.
6. Add project inspection/actions.
7. Add responsive mobile behavior and reduced-motion mode.
8. Optimize media/performance.

## Phase D — validation and approval renderings

1. Run lint and production build.
2. Browser-test desktop and mobile.
3. Test pointer, touch, keyboard, selection stop/resume, Skip, reduced motion, and project links.
4. Capture at minimum:
   - Desktop PRESS PLAY
   - Desktop montage frame(s)
   - Desktop wheel initial state
   - Desktop selected/stopped project
   - Desktop after drag/flick
   - Mobile initial experience
   - Mobile selected/stopped project
5. Present the renderings and explain each interaction.
6. Revise only the homepage/wheel until the owner says **“Wheel approved.”**

## Phase E — only after wheel approval

Then proceed to:

- Six actual project site experiences
- Premium case-study boards
- Ted B. Law project anonymization/presentation
- About/ownership/platform comparison
- Services
- Work
- Contact
- Route cleanup, including removal of the prohibited existing route/material
- Final SEO, performance, accessibility, deployment preparation

---

# 12. Final understanding

Yes, the requested model is feasible:

- Build a perfected interactive six-project homepage wheel.
- Build actual website experiences for those six wheel projects.
- Sell each through a beautiful full-site case-study board that lets customers understand the entire design on one long page.
- Demonstrate responsive design, optimization, technical SEO/search foundations, and ownership/control.
- Future portfolio concepts may be sold with complete, coherent case-study renderings without coding every concept into a functioning site first.
- Customers own the agreed finished deliverables and do not pay MLR monthly rent merely to retain their site; ongoing product/content editing can be an optional paid service.
- Never promise guaranteed Google rankings.
- Publicly refer to the law project only as **Ted B. Law**.
- No existing AtlasLume material under any circumstance.

The next chat should begin building from this handoff and should not make the owner repeat this planning conversation.
