# Hermess Classroom v0.3 — Verification

**51/51 app checks passed.** The self-contained HTML passed in an offline browser context, with no extra asset requests or runtime errors. The supplied engine's consistency suites passed **60/61**; the diagnosed inherited cruise test is retained below.

## Changes verified

- Full-viewport 3D world; expanded text on the left and the ship framed on the right.
- Why → What → How throughout 12 subjects / 36 steps. Each section has substantive explanatory paragraphs, not only a label.
- The opening hook is “Why Azipods? A large ship. Very little headway. You still need control.” Foundations precede manoeuvring.
- Independent panel and text opacity; adjustable focus dimming; sea interaction and Escape clear focus.
- Recovery remains usable at zero opacity; hidden overlays remain hidden while clicker navigation advances the lesson.
- Floating, expandable dock tools; pod dials, exact inputs, linked RPM and environmental controls.
- Machinery delay, force signs, complete guided checkpoint restoration, replay/branch/reset and bounded recordings.
- Matched turning/stopping comparisons, knowledge check, original engine suites, time-step comparison and neutral rest.
- Local ocean texture loading, camera framing/orbit/picking, alignment with machinery state, graphics failure handling, and caching paused views to avoid redundant GPU work.
- Default-state automated WCAG A/AA checks in guided, instructor, sources, comparison and quiz states reported no violations.
- Projector viewport fit at 1366×768; navigation remains inside the viewport at desktop and widths 960, 640, 390 and 320. Reflow was tested through CSS viewport size, not native browser zoom.

## Remaining inherited engine check

`hm49Physics`: 28/28; `hm56Accuracy`: 19/19; `hm57Sources`: 13/14.

The original `cruise 100 reaches bounded RPM` check expects 142 RPM after 180 seconds. The v85 load program intentionally ramps more slowly: diagnosis observes 71.59 RPM at 180 seconds and 142.00 RPM at 1,800 seconds. That stock check is left unchanged and is not counted as a passing engine check. The classroom uses manoeuvring mode.

The physics wrapper's SHA-256 remains `8a58ecc94360bf7dd7958149bf324553d9dcd4ba0b94fcb23d8af2adc1d2f77e`.

## Evidence and limits

The source-level checks ran in Linux Chromium. Native Mac/Safari or Windows/Edge, classroom lighting, actual projector readability and physical clicker hardware still need instructor acceptance. Managed Chromium blocks file URLs, so verification uses local HTTP and a fully offline routed standalone HTML document.

The ship is a live procedural 3D illustration, not surveyed CAD or the static photorealistic ship in the design concept. Generated bump detail and discharge particles are illustrative; exact texture periodicity is not established, mirrored wrapping is used, and no CFD, roll, heeling or wave-driven hull motion is added. The supplied engine's stopping and interaction response is not independently sea-trial validated. Advanced failure/redundancy and BRM modules are not complete. No ABB endorsement is claimed.

User-selected low opacity can reduce contrast. The recovery button restores tested defaults. Native modal reference/assessment dialogs retain their own readable surface rather than inheriting the world-overlay text fade.

App, browser-console and network results are in `glass-verification/report.json` and `bundle-verification.json` in the artifact folder. Visual evidence and comparison are described in project-root `design-qa.md`.

No deployment or environment publication was performed.
