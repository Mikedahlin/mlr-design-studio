# MLR Opening - Motion & Geometry Audit

## Source Analysis
- File: `public/media/mlr-opening/mlr-opening.mp4`
- Specs: H.264, 1280x720, 24 fps, 10.0 seconds (240 frames).
- Visual check against references: The opening animation has significant generative instability in its latter half, transitioning from a structurally solid machinery sequence into unstable, morphing text geometry.

## Frame-by-Frame Breakdown (24fps)

- **0.0s - 3.5s (Frames 0 - 84):** Strong, stable. The central reactor forms, energy flashes, and a chaotic but visually interesting explosion of materials (rock/wood) occurs. The 3D tracking and object permanence remain relatively coherent.
- **3.5s - 5.0s (Frames 84 - 120):** Transition phase. The dust settles and 8 radial glass tubes become prominent. Colors start glowing solid. Motion is acceptable, but background elements begin to melt slightly.
- **5.0s - 7.5s (Frames 120 - 180):** **Critical Failure Zone.** The radial tubes warp heavily and attempt to form the "MLR STUDIO" text. The AI generation loses geometric constraint here. The text is wobbly, uneven, and looks like melting plastic rather than rigid glass. The background machinery loses definition and turns into noise.
- **7.5s - 9.0s (Frames 180 - 216):** The text solidifies into the final neon state, but frame-to-frame consistency still jitters (flickering geometry, edges of tubes vibrating).
- **9.0s - 10.0s (Frames 216 - 240):** The background transitions to pure black. The text is relatively stable, leading into the handoff to the interactive wheel, but the final text doesn't perfectly match the precise SVG logo geometry we want.

## Cleanup Plan (Least Destructive)
1. **Preserve the Strong Start (0.0s - ~4.5s):** Keep the initial reactor explosion, material shatter, and the illumination of the radial tubes.
2. **Reconstruct the Transition (~4.5s - 6.0s):** Instead of letting the AI morph the tubes into text, we will fade/flash out the reactor machinery at the height of its energy, or crossfade cleanly using custom SVG motion, avoiding the "melting" AI look.
3. **Replace the Final Sign (6.0s - 10.0s):** Abandon the baked AI text completely. The live web environment will render the exact, perfect SVG geometry of the `mlr-sign-master.png` reference (as vector paths). We will composite this clean SVG over the black background, so the handoff to the web UI is seamless.

## Next Steps
- Rebuild the `NeonMark` component using explicit SVG paths tracing the tubes from `mlr-sign-master.png`.
- Replace the current font-based fallback.