# Design QA — Hermess Glass Classroom

final result: passed

## Source and implementation

- Selected direction: first displayed ideation image (Glass Dock), revised for the user's left-hand expanded text and right-hand ship framing.
- Source visual truth: `/workspace/generated_images/exec-f595cdc1-06c4-4371-a161-9951f17e125d.png`.
- Latest explicit content override: the user asked to start with Why as the hook. The implementation deliberately uses Why → What → How instead of the image's What-first copy.
- Implementation: `/workspace/artifacts/glass-review/final-desktop.png`.
- Full-view comparison: `/workspace/artifacts/glass-review/comparison-full.png`.
- Focused reading comparison: `/workspace/artifacts/glass-review/comparison-reading.png`.
- Responsive evidence: `final-mobile.png`, `final-projector.png` in the same folder; regression captures in `/workspace/artifacts/glass-verification/`.
- Source and implementation are both 1586×992 pixels at a 1586×992 CSS desktop viewport, deviceScaleFactor 1. No density normalization or image warping. The combined full view adds a labelled 40px strip above each unmodified image; the focused comparison uses equal-size browser-clipped regions.
- State: first subject, first explanatory section expanded, Appearance open, lesson reading focus, panel opacity 65%, text 100%, background dim 25%, vessel paused. Source What-first wording versus final Why-first wording is an intentional user change, not a mismatched content bug.

## Comparison and findings

The two artifacts were displayed together in a browser-rendered comparison, then inspected at full-frame and in the focused reading region. The first formal comparison after implementation refinements found no remaining actionable P0/P1/P2 issues in the requested interface and curriculum scope.

Pre-comparison implementation refinements: the original prototype's control tray overlapped the left reading surface; it now uses the available right-side width. The Appearance sheet was too tall; its inactive state was compacted and help is revealed while focused. Gold action fills were strengthened. The course was changed to Why-first following the user's correction. Focus tests wait for CSS transition endpoints rather than assuming a fixed timeout.

### Fonts and typography

System UI stack uses the native Apple system face where available, Segoe UI/Arial fallbacks elsewhere. Headline, introductory copy, section headings, body paragraphs and small metadata retain a clear hierarchy. Body text is 16px on the target desktop, with 1.65 line height and a comfortable left-panel line length. More extensive user-requested content is contained in a scrollable reading surface rather than shrinking the whole interface. The Linux fallback differs optically from the concept's generated lettering; native Mac typography is not verified.

### Spacing and layout rhythm

The world fills the viewport. Header controls and the bottom dock float; no solid sidebar or inset canvas remains. The left reading surface is approximately 580px at the target size; the live ship centre is around 68% of viewport width. The accordion, source footer, telemetry and dock remain separated. Expanded tools have close/collapse controls and usable overflow. Projector and narrow viewport tests passed. The new copy makes the reading panel taller than the image; that is intentional under the user's request for more explanation.

### Colours and visual tokens

Deep blue glass, white text, champagne/gold active actions, amber/teal pod semantics and restrained borders follow the chosen direction. Panel background alpha and text alpha are independent. Active reading focus dims the world/other panels without fading the active reader. The dock and recovery control remain reachable. Default-state automated contrast checks passed. Arbitrary opacity choices are user preferences, not a promise of maintained contrast.

### Image quality, assets and icons

The actual interactive Three.js ship and original machinery/physics are preserved. They are intentionally not replaced by the static, photorealistic concept rendering. Consequently the build is an operational 3D illustration, not a claim of a 1:1 ship/CAD or photographic asset match. A generated near-grayscale ocean bump-detail texture is used by the live water shader; it is local/offline and mirrored rather than claimed mathematically seamless. Icons come from the original Phosphor 2.1.1 SVG library, not handcrafted icon art. The existing text wordmark is retained. Physics-driven arrows are absent at zero delivered thrust even where the generated concept showed decorative arrows.

### Copy and content

The opening Why gives the handling problem before the hardware description. Every subject has Why, What and How explanations of at least 60 words per section, with source references and clear limits on model/vessel-specific values. Azipod fundamentals precede manoeuvring. Model conventions distinguish thrust direction from bridge lever orientation, orders from delivery, and force from motion. No version, design prompt or implementation instructions leak into the teaching copy.

## Primary interactions and checks

All 51 app checks passed. Coverage includes section navigation, collapsing/reopening text without resetting motion, dimming and release, independent opacity, recovery at zero opacity, hidden-mode clicker navigation, pod controls, camera actions, replay and checkpoint restoration, comparisons and assessment dialogs. Console and runtime errors were checked; none were recorded in the passing app run. Five automated accessibility states reported no violations. The offline standalone bundle also passed with no additional network requests.

## Follow-up polish / acceptance limits

- P3: further optical refraction/highlight polish could bring the glass closer to the static concept.
- P3: an approved detailed vessel/propulsor 3D asset could improve geometric fidelity. The current asset remains a labelled teaching illustration.
- Native Mac browser rendering, physical clickers, assistive-technology use and classroom projection remain unverified.
- The previously documented stock cruise-load-program test remains a separate inherited engine issue; it is not a UI mismatch.

## Implementation checklist

- [x] Why-first hook and 36-step sequence.
- [x] Full-screen world, left text and right framing.
- [x] Real expandable dock controls and source/assessment dialogs.
- [x] Independent opacity, focus dimming and reliable recovery.
- [x] Original model preserved; local assets embedded in the standalone file.
- [x] App, accessibility, viewport, failure and offline checks complete.
- [x] Source and implementation inspected together, including focused reading comparison.
