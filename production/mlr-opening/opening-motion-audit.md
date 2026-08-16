# MLR Opening — Frame-by-Frame Motion Audit and Cleanup Plan

Updated: 2026-08-16

## Sources and method

- Source: `public/media/mlr-opening/mlr-opening.mp4`
- Technical baseline: 1280×720, H.264, 24 fps, 10.000 seconds, 240 frames, constant frame rate.
- Review material: the seven extracted reference frames, the 8 fps / 80-frame audit sheet in `audit-frames/`, the original film, and all three ChatGPT masters.
- Because cadence is constant, the visible choppiness is generated subject/camera inconsistency—not a variable-frame-rate encoding defect.

## Master-image assessment

### Foundry master

The foundry master is a strong environment reference: convincing black industrial chamber, central aperture, bilateral machinery, colored feeds, and usable depth. It is more symmetrical and mechanically coherent than many early-film frames. It should guide a controlled replacement foundry shot, not be dropped in as a static frame. Its central white aperture is a good transition target.

### Transition master

The transition master has the strongest machinery-to-energy composition and useful cyan/magenta/green conduit lighting. Its generated horizontal lettering is incorrect for the approved stacked MLR/STUDIO sign. Use only the machinery, energy, atmosphere, and framing. Never interpolate or inherit its letters.

### Sign master

The sign master is the authoritative fixed-geometry lighting reference: stacked MLR/STUDIO, hot-white core, multicolor glass, pure black. It is suitable for tracing tube centerlines but not for shipping as the live raster sign.

## Timestamp audit

| Range | Observation | Severity | Action |
|---|---|---:|---|
| 0.000–0.500 | Opening machinery establishes well, but small hard-surface details appear/disappear between frames and the center aperture changes shape faster than physical camera motion explains. | Medium | Preserve the broad composition. Stabilize/re-time; do not interpolate fine machinery blindly. |
| 0.500–1.375 | Left/right assemblies and colored feed paths visibly remodel while the camera advances. Highlights pulse independently of plausible sources. | High | Candidate replacement range using a shallow 2.5D move from the foundry master, with particles/energy composited separately. |
| 1.375–2.250 | Forward motion is readable but lateral geometry swims; repeated circular elements change count/diameter. Several successive frames feel like micro-jumps rather than continuous dolly motion. | High | Use controlled transform stabilization or replace from foundry master. Optical-flow only background haze/particles, not mechanisms. |
| 2.250–3.125 | Central energy forms successfully, but the aperture and emerging mark change silhouette. Exposure rises in uneven steps. | High | Rebuild this as the planned handoff: stable aperture, animated energy, then reveal fixed vector sign geometry. |
| 3.125–4.250 | Letter-like forms begin resolving. Tube topology and spacing mutate frame to frame; this is the most dangerous area for generic interpolation because it can invent malformed lettering. | Critical | Replace lettering completely with fixed MLR/STUDIO paths. Preserve selected sparks, haze, and machine plates as keyed overlays only. |
| 4.250–5.375 | MLR becomes readable but proportions, bends, and subtitle relationship continue to drift. Brightness pumps as the white core ignites. | Critical | Composite the fixed-path sign over a stabilized plate. Animate illumination along paths; do not retime the generated letters. |
| 5.375–6.500 | Strong cinematic color and the sign is mostly established, but edges still crawl and tube colors jump positions. Camera movement eases inconsistently. | High | Preserve atmosphere. Track/stabilize background; replace sign pixels with the fixed-path render. Smooth exposure over the range. |
| 6.500–7.500 | This is among the strongest source material. The stacked sign reads clearly and the surrounding machinery is visually rich, though small fittings still morph. | Medium | Preserve as much as possible. Restrict repair to sign replacement, exposure smoothing, and localized masks. |
| 7.500–8.500 | Sign remains readable, but scale/position and tube bend geometry drift during the pullback. Colored bloom occasionally detaches from the physical tube. | Medium–High | Track a fixed sign into the plate; rebuild bloom from the same paths so core and color cannot separate. |
| 8.500–9.250 | Final hero composition is strong. The frame is suitable as a visual bridge, but background and sign continue subtle generated crawling. | Medium | Freeze/stabilize selectively while preserving particles; use fixed sign at the exact final pose. |
| 9.250–10.000 | The film ends on the cinematic sign, then the site reveals a differently proportioned font-based sign. This geometry/scale mismatch is the weakest handoff into the live wheel. | Critical | Match the rendered final fixed-path sign and live SVG exactly. Crossfade only bloom/atmosphere while geometry remains stationary. |

## Least-destructive cleanup decision

1. **Keep the original timing, grade, soundless format, and strong atmosphere.** Do not replace the whole film.
2. **Preserve 6.5–9.25 seconds as the primary source plate**, with localized stabilization and exposure smoothing.
3. **Replace every generated-letter frame from first readable emergence onward** with one fixed centerline-path MLR/STUDIO system. Letter geometry must never pass through optical flow.
4. **Repair 0.5–3.125 seconds selectively.** First test stabilization/re-timing. Where machinery still swims, use the foundry master for a shallow 2.5D camera move and retain original particles, sparks, haze, and colored energy as overlays.
5. **Construct 2.25–4.25 seconds as the controlled transition shot** using machinery/energy language from the transition master but the exact fixed stacked sign geometry.
6. **Smooth exposure by tracked regions**, not one global correction: aperture, machinery, colored feeds, and sign bloom need independent curves.
7. **Lock the final 0.75 seconds to the live sign pose.** Final video geometry, viewBox placement, scale, and color stops must equal the homepage SVG. Fade machinery and atmospheric bloom away while the SVG underneath takes over.
8. Export a short cleanup test before a full replacement render: transition segment plus final handoff. Compare side-by-side at full speed and frame stepping.

## Safe and unsafe interpolation

Safe: black background, diffuse haze, isolated particles, broad bloom, and simple camera transforms after masks are stabilized.

Unsafe: lettering, tube bends, machinery edges, conduit junctions, circular apertures, or any region where generated topology changes. Those require fixed geometry, replacement plates, or short masked holds—not blind frame interpolation.

## Acceptance criteria

- MLR and STUDIO centerlines never change topology, spacing, or proportions.
- No visible camera jump at normal speed or while stepping frames.
- White core and colored bloom remain registered to the same tubes.
- Exposure changes feel motivated by ignition, not random pumping.
- The final video frame and live SVG align without a visible geometry cut.
- Reduced-motion/mobile users retain the direct-wheel/static fallback.

## Approved cleanup test â€” 2026-08-16 02:32 Central

User approved the visual direction of `/source-preview/opening-cleanup`: clean foundry imagery transitioning to the exact fixed-path MLR/STUDIO sign, with no malformed/generated lettering. Expand this direction into the full 10-second opening. Do not replace production until the full version is clearly better and its final pose matches the live homepage sign.

## Rejected test â€” v3

The 10-second v3 timing test was rejected because it merely extended the approved four-second transition with nearly static holds. Duration alone is not progress. Do not use or present v3 as a production candidate. Version 4 must be judged on distinct motion phases rather than runtime.

## Approved smoothing method â€” 2026-08-16 02:43 Central

User approved the synchronized A/B conservative smoothing test. Lock this method: smooth and deflicker only the early machinery range (0.000â€“3.125 seconds), preserve original lettering/sign frames from 3.125 seconds onward, retain the original creative content, and do not substitute generated imagery. Normalize the final delivery to exactly 10.000 seconds and validate the handoff into the live fixed-path sign before replacing production media.
