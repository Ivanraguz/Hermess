# Hermess Classroom — Glass Studio v0.3

An offline, English instructor app for twin-azimuth-pod cruise-ship handling. The live Harbour Master v86 Queen Victoria model is surrounded by a full-screen glass presentation interface. The original Hermess website remains separate.

## Open in your browser

The GitHub Pages classroom address is https://ivanraguz.github.io/Hermess/academy/. Use a current Chrome browser on your Mac; no installation is needed for the online version.

For offline use, download https://ivanraguz.github.io/Hermess/academy/offline/Hermess-Classroom.zip, unzip it, and open **Hermess Classroom.html** in Chrome. The archive contains the self-contained app, its documentation and licences.

Hosting uses the repository's existing GitHub Pages site with `main` and the repository root as the publishing source. The root `.nojekyll` file keeps the classroom's static assets available without a Jekyll build.

## Why → What → How

The opening hook is **Why Azipods? — A large ship. Very little headway. You still need control.**

Each subject starts with its practical reason, explains the mechanism, then demonstrates its use. There are 12 subjects and 36 teaching steps, with substantial expandable text adapted from the supplied POD course notes:

1. Why Azipods? The handling problem, the unit, and the power-to-thrust chain.
2. Propeller thrust and RPM.
3. Steering the thrust: azimuth, ordered angle and delivered response.
4. Two pods, resultant force and turning moment.
5. Operational modes and response limits.
6. Angles before RPM.
7. Parallel turns.
8. Tandem and creeping astern.
9. Coasting and active stopping.
10. Wind, current and reference frames.
11. Prediction, instructor exploration and replay.
12. Debrief and understanding.

The course deliberately establishes the basics before manoeuvring. It is not the entire advanced syllabus: failures, redundancy, emergency procedures and BRM assessment remain future modules. It is not an ABB product or endorsement.

## On your Mac

When the generated file is available locally, open **Hermess Classroom.html** in a current Chrome browser with hardware acceleration enabled. The standalone file includes the engine, icons, ocean texture, scripts and styles. It needs no internet, login or Node.js.

Native Mac/Safari and direct file startup have not been tested here. The managed Chromium instance blocks file URLs by policy; local HTTP and a fully offline intercepted HTML document are used for verification. Workspace files are not automatically downloadable attachments in every chat client.

If your organisation blocks local HTML apps, run a local server in the extracted folder with Python 3:

```
python3 -m http.server 8000 --bind 127.0.0.1
```

Open that server locally in your Mac browser and select the HTML file. A server running in the cloud workspace is not your Mac's localhost.

## Teach and explore

- The ship view fills the browser viewport. The lesson floats on the left; the ship is framed to its right. Collapsing the lesson recentres the world.
- Right Arrow / Page Down advances the explanation or demonstration. Left Arrow / Page Up goes back. Page keys navigate even after editing a control. Native arrows still edit focused sliders and dials.
- Why, What and How headings are expandable and directly selectable. Opening a different reading section selects that teaching step and pauses motion. Collapsing/reopening the current section preserves vessel state.
- Space pauses/runs motion when a native input/button does not consume the key. F or the fullscreen button enters/exits presentation. A physical clicker has not been tested.
- The glass dock opens Lesson, Camera, Pods, Replay, Readings and Appearance. On narrow screens, additional tools remain accessible through Lessons.
- Opening/focusing a panel dims the rest of the scene. Click the sea or press Escape to clear focus. The dock and recovery control remain reachable.
- Appearance has separate **Panel opacity**, **Text opacity** and **Background dim** sliders. They change the overlays, not the 3D world. The recovery button stays visible at zero opacity and restores the defaults. H hides/shows overlays; O opens Appearance. Hidden overlays stay hidden during clicker navigation until restored.
- Drag the scene to orbit; scroll to zoom. Focus the scene and use Shift + arrows to orbit, +/− to zoom. Camera presets include 3D, Overhead, Underwater pods and Stern.
- Take control snapshots the guided vessel, orders, recording, environment and run state. Return to lesson restores that checkpoint. Clicking a pod in the underwater view opens its controls.
- Use the dial, exact numeric fields or sliders for each pod. Dashed needles show orders; solid needles show delivery. Link RPM when equal orders are useful. Wind and current are available in instructor control.
- A guided Reset restores the subject's starting conditions. A free-control Reset starts at rest with zero delivered RPM and ahead-facing units, preserving your orders.
- Replay scrubs through compact half-second checkpoints. Editing an order after scrubbing branches the run. Approximately ten simulated minutes are retained in memory; closing/reloading loses the recording.
- Compare uses identical starts for parallel/tandem turns and coasting/active stopping. Tracks and signed-speed charts are model predictions. Track length is not labelled as a stopping distance.

## Sources, model and visuals

Course explanations use the supplied 2023 CSMART advanced POD course notes, especially pages 3–8 and 17–20. The private PDF itself is not embedded. The first hook and explanatory prose are adapted teaching copy.

`harbour-engine.js` remains byte-for-byte unchanged from the previous studio. The original physics APIs are called at fixed 1/30-second steps. The legacy app's rendering loop is disabled when the engine is loaded in its hidden document. Hull displacement is not scripted.

The procedural 3D cruise ship is an illustration, not surveyed Queen Victoria CAD. Its main model dimensions and pod lever positions are retained. Delivered azimuth, heading, RPM-integrated propeller phase and motion drive the view and replay. Discharge particles show direction only; they are not CFD.

The generated ocean bump-detail asset is sampled with mirrored wrapping. It is an illustrative near-grayscale texture, not a measured or mathematically seamless height field. It improves surface appearance without adding wave-driven ship motion. No heeling or roll is modelled. Paused views are cached to avoid unnecessary GPU rendering; camera, layer, force and motion changes invalidate that cache.

Thrust arrows and force readouts show propeller force, excluding hull, housing and environmental contributions. Hull motion uses the complete original model. Forces use through-water flow; bow/stern station side speeds are over ground. Angles mean thrust direction: 000 ahead, 090 starboard, 180 astern, 270 port, with per-side IN/OUT translation. The bridge lever itself is not reproduced.

The QV model uses its 25 RPM minimum, finite machinery response, and high-angle limitations above 8 kn through water. These are not universal operating instructions. Stopping, interactions and environmental responses remain incompletely validated against ship trials.

## Development and checks

Runtime needs no packages. For development verification:

```
npm ci
npx playwright install chromium
npm run check
npm test
npm run package
npm run test:bundle
```

Tests launch their own loopback server. `CHROMIUM_PATH` selects Chromium; otherwise `/usr/bin/chromium` or Playwright's installed browser is used. `ACADEMY_RESULTS` chooses the report directory. `checks/package.py --out <folder>` chooses the output directory; the default in this cloud machine is `/workspace/artifacts`.

The ZIP is **Hermess-Academy-Glass-Classroom.zip**. It contains the standalone HTML, README, verification summary and licences. Icons are original Phosphor 2.1.1 SVGs, embedded for offline use; Three.js is vendored r160.1. Their licences are retained in `vendor/`.

## Known inherited engine test failure

The original `hm57Sources` test `cruise 100 reaches bounded RPM` expects 142 RPM after 180 seconds. The later v85 cruise load program intentionally ramps much more slowly: about 71.59 RPM after 180 seconds and 142 by 1,800 seconds. The original test is left unchanged and reported as a failure; the lessons use manoeuvring mode. This is documented separately from app checks.

Automated checks and screenshots do not establish hydrodynamic validation, full accessibility compliance, native Mac/Windows behavior, physical-clicker support or projector readability in the classroom. Very low user-selected opacity can reduce text contrast; recovery restores the tested defaults.
