# Inventive Studio Navigation, Services, and Contact — Design Deep Dive

Updated: 2026-08-16

## Research scope

Reviewed current portfolio/contact galleries from Awwwards, CSS Design Awards, FWA, and Recent/Godly, plus live experiences from Lusion, Active Theory, Resn, Dogstudio, makemepulse, Obys, Cuberto, Hello Monday, Build in Amsterdam, Locomotive, and Koto. The goal was not to copy decoration; it was to identify interaction structures that preserve an exceptional homepage while still making services and contact usable.

## What the strongest sites actually do

### 1. They keep the homepage CTA extremely small

Active Theory exposes only **Work** and **Contact** beside an audio control. Resn reduces the first interaction to **View all projects** and a hold gesture. Obys uses only **Work / About / Contact**. These sites do not explain every service in an overlay on top of the hero. They let one short control transfer visitors into a dedicated mode or page.

**Lesson for MLR:** the wheel is already the homepage’s primary discovery system. A second large information system competing with it is a mistake.

### 2. Contact is often treated as an intent decision, not immediately as a form

Makemepulse begins with **“What do you want to talk about?”** and three paths: work with us, join the team, or say hi. Each intent reveals a different form. Cuberto begins with selectable service chips, then name/email/message, budget bands, and an optional attachment. Build in Amsterdam offers three immediate channels: start a project, just say hi, or call/visit. Koto often avoids a form entirely and uses location-aware direct email/copy actions.

**Lesson for MLR:** ask why the person is here before showing fields. For MLR the useful intents are likely **Start a project / Ask a question / Existing project**—not careers or fake office choices.

### 3. Service discovery happens on its own stage

Cuberto’s homepage can describe services in scroll sections, but its contact page turns services into selection chips. Lusion reserves a full-screen menu for broad navigation while keeping “Let’s talk” separate and always obvious. Hello Monday makes work filtering part of the portfolio rather than stuffing categories into navigation.

**Lesson for MLR:** services should either be a dedicated page, a project-intake selector, or a temporary full-stage mode. They should not be five little cards floating over the wheel.

### 4. Inventive does not mean complex

The most memorable sites frequently use fewer controls: a single menu word, one direct contact CTA, a full-screen transition, or large type choices. The weaker award-gallery examples often pile on pseudo-desktop windows, command interfaces, excessive card stacks, or novelty cursors with poor clarity.

**Lesson for MLR:** because the opening/sign/wheel are already spectacular, the navigation should be the calm control surface—not another spectacle.

## Pattern inventory

| Pattern | Seen in / related precedent | Strength | Risk for MLR |
|---|---|---|---|
| Minimal text rail: Work / Services / Contact | Active Theory, Obys | Almost invisible; fast | Could feel ordinary unless typography/motion are excellent |
| One **Menu** control opening a full-screen editorial index | Lusion, Dogstudio, Koto | Clears the hero; highly legible | A generic fullscreen overlay could feel detached |
| Dedicated **Let’s talk** CTA separate from menu | Lusion, Build in Amsterdam | Contact never gets buried | Needs careful placement beside existing Contact |
| Intent-first contact gateway | Makemepulse | Human, reduces irrelevant fields | Too many paths can become gimmicky |
| Service chips inside project inquiry | Cuberto | Qualifies leads clearly and quickly | Budget bands must be appropriate; no coercive pricing |
| Direct email/copy instead of form | Koto, Obys | Low friction and transparent | Loses structured qualification and spam protection |
| Spatial/hold interaction | Resn | Memorable, minimal chrome | Poor primary navigation accessibility if used alone |
| Command palette/search | Common experimental portfolio pattern | Fast for repeat/power users | Wrong tone as sole navigation; requires keyboard knowledge |
| Radial/orbital menu | Experimental WebGL portfolios | Could echo the wheel | Would compete directly with the wheel and confuse project rotation |
| Desktop/window metaphor | Current award portfolios | Can organize many destinations | Visually noisy and trend-bound; wrong for MLR foundry world |
| Edge labels revealing drawers | Editorial/architecture sites | Quiet when closed | We already proved drawers collide with the wheel |
| Wheel recedes for a separate navigation mode | Derived hybrid | Preserves hero and offers room | Must be a deliberate scene transition, not a dark modal |

## Six viable concepts for MLR

### A. The Three Signals — recommended homepage control

Keep only three quiet text signals around the outer perimeter:

- **WORK** — not a drawer; focuses the wheel and exposes “View all work” after selection.
- **SERVICES** — transitions to a dedicated full-screen service constellation/field.
- **START** — opens the intent-first project gateway.

About/Studio lives inside the service/studio index or as a normal secondary page, not as another homepage panel. Contact becomes **START**, which is more useful than a generic noun.

Why it fits: almost nothing covers the homepage. Each control has a different job instead of opening three copies of the same container.

### B. The Blackout Index

One tiny **INDEX** control. On activation, wheel light and videos extinguish in sequence; the sign remains glowing. Large bare words appear directly in the black space: Work, Services, Studio, Start a Project. There are no cards, boxes, panels, or backdrop rectangle. Closing re-ignites the wheel.

Why it fits: the index feels native to the sign/foundry world and uses negative space rather than laying UI over it.

### C. The Sign Becomes Navigation

The living sign’s colored tube zones respond when navigation is invoked: cyan reveals Work, magenta Services, green Studio, ember Start. Labels sit around—not on—the fixed sign geometry, and keyboard users get an equivalent linear list.

Why it fits: unique and integrated.

Risk: the mark could become gimmicky or less legible; should be a later experiment, not first implementation.

### D. Project Terminal Without Computer Styling

A single **BEGIN** control opens one large sentence at a time in the center: “What are you building?” Choices lead to project type, priorities, timing, and contact. Services are explained contextually while the visitor answers. No little fields until the final step.

Why it fits: services and contact become one useful guided conversation.

Risk: requires a visible “See all services” escape route and back controls.

### E. Cinematic End-Credit Index

A narrow vertical typographic index slides through the black outer margin like film credits. Hovering/tapping a word moves it to the center and reveals one sentence. Selecting transitions to the page. No cards.

Why it fits: aligns with the cinematic opening and does not mimic app UI.

Risk: intermediate widths need careful collision handling.

### F. Pure Minimal Route

Keep only **WORK / SERVICES / ABOUT / START** as calm, large-enough type at the bottom edge; no reveal effect. Let the sign and wheel carry all spectacle.

Why it fits: strongest restraint and lowest interaction risk.

Risk: least novel in isolation, though the homepage itself remains highly novel.

## Recommended system

Use **A + B + D** as one coherent system:

1. Homepage shows three quiet signals: **WORK / SERVICES / START**.
2. **WORK** stays in the wheel: it highlights selection guidance and offers the archive link; no overlay.
3. **SERVICES** invokes the **Blackout Index**: wheel recedes, videos pause, sign remains, and six large unboxed service names occupy the freed stage. Hover/focus reveals one concise description. Selection opens the services page.
4. **START** invokes the guided project gateway: one question per stage, large intent choices, then a concise accessible form.
5. A small **STUDIO** link can live in the service index or site footer rather than permanently competing with the hero.
6. Contact remains available as direct email inside the project gateway; never trap users in the questionnaire.

This is substantially more original and appropriate than folding cards, while remaining comprehensible and accessible.

## Proposed MLR inquiry flow

### Stage 1 — intent

“What brings you to MLR?”

- Start a new project
- Improve an existing site or identity
- Ask a question

### Stage 2 — relevant capabilities

Large multi-select choices, not a dropdown:

- Website / digital experience
- Brand identity / graphic design
- Rendering / visual production
- Video / motion
- Performance / accessibility / SEO foundations
- Not sure yet

### Stage 3 — practical context

- Existing URL, if any
- Desired timing with “flexible / exploring” options
- Approximate scope or budget only if it helps qualification; do not force false precision
- Optional attachment or reference link

### Stage 4 — contact

- Name
- Email
- Organization, optional
- Short message
- Clear privacy statement

Always visible: **Email directly instead**.

## What not to copy

- No fake command line.
- No OS desktop/windows metaphor.
- No radial menu competing with the project orbit.
- No tiny text because an award site used it.
- No sound requirement.
- No hold gesture as the only route.
- No long form dumped over the homepage.
- No agency-office theater or invented staff.
- No budget shaming or forced high minimums.
- No dark glass cards simply because the background is black.

## Next prototype gate

Prototype only the **Blackout Index + three signals** in an isolated route or component state. The prototype must demonstrate collapsed homepage, services mode, start-project mode, Escape/back behavior, keyboard flow, mobile layout, and exact wheel pause/resume. It does not replace the stable homepage until reviewed in all states.
