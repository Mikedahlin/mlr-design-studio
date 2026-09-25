# MLR Design Studio — Source of Truth

## Primary product plan

The authoritative website blueprint is:

[`mlr-design-studio-full-website-plan.txt`](./mlr-design-studio-full-website-plan.txt)

Use that plan to guide the architecture, page purpose, project differentiation, capability proofs, accessibility, performance, media system, and future expansion of MLR Design Studio.

## Current approved implementation decisions

When the plan contains an older approval gate or conflicts with a later explicit user decision, the later explicit user decision wins. Current decisions are:

- Keep the homepage wheel's approved motion, layout, card order, and interaction behavior intact.
- The six locked wheel projects are Iron North, Ember, Apex Motor Co., White Pine Dental, Northshore Lodge, and Velvet Room.
- Ted B. Law is not part of the current six-card wheel.
- The local wheel currently uses the final media paths centralized in `src/components/lockedWheelData.ts`.
- Good still-image source material is protected for building out the six project websites; do not delete it merely because it is not currently referenced.
- Do not delete, push, deploy, or replace active wheel media as part of generic cleanup.
- Before deleting duplicate or dead material, create an exact manifest and preserve a recoverable copy/quarantine.

## Reference material, not implementation authority

`media-generation-master-list.md` is a creative/reference inventory. Use it to locate or plan media, but do not treat it as permission to generate, replace, delete, or wire assets automatically.

## Working rule for future agents

Read this file, then read the full website plan, current Git status, and the current wheel data before changing the project. Do not invent a new product plan or revert the approved wheel while building the six project websites.
