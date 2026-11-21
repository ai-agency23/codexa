# CODEXA — Digital Studio

A responsive, multilingual landing page for CODEXA. It combines a custom Three.js digital-core scene with studio content, four explicitly in-development concept previews, an interactive process timeline and a client-side-only inquiry form.

The hero scene supports pointer/touch dragging and includes translated, keyboard-focusable left/right rotation buttons. Motion and particle density adapt to reduced-motion preferences and compact devices.

## Run locally

Use Node.js and npm compatible with the locked Vite toolchain. From the project root:

```sh
npm install
npm run dev
```

Open `http://localhost:3000`. For a production build, run `npm run build`; preview the built files with `npm run preview`.

## Project structure

- `src/main.jsx` — React entry point and bundled font imports.
- `src/App.jsx` — Page composition, language persistence, document `lang`/`dir`/title updates, and reduced-motion-aware section reveals.
- `src/components/` — Reusable navigation, hero, sections, portfolio cards, localized form, footer, logo, and small UI elements.
- `src/three/` — Isolated WebGL scene: `InteractiveScene.jsx` composes the scene and controls; `DigitalCore.jsx` owns the core geometry and interaction; `ParticleField.jsx` owns the restrained particles; `SceneLighting.jsx` owns the lights.
- `src/locales/en.json`, `src/locales/fr.json`, `src/locales/ar.json` — Complete locale dictionaries. `src/locales/index.js` selects supported languages and text direction. The current selection is saved as `codexa-language` in local storage.
- `src/styles/site.css` — Responsive visual system, RTL treatment, reduced-motion rules, and interaction states.
- `public/assets/codexa-logo.jpeg` — The supplied CODEXA logo, preserved as provided.
- `public/assets/niya-meal.jpg` — A food image used only as an illustrative NIYA DZ concept preview, not as a real product or completed-project screenshot.
- `public/manus-routes.json` — Static route manifest for the one-page `/` site.

## 3D scene customization

Start with `src/three/DigitalCore.jsx` to replace or refine the core's geometry, materials, glow, hover response and idle motion. Keep animation inside React Three Fiber's frame loop (`useFrame`) rather than adding a per-frame React state update. Adjust lighting in `SceneLighting.jsx`, particle count and motion in `ParticleField.jsx`, and camera/drag behavior or the compact-device performance profile in `InteractiveScene.jsx`. Keep fallback behavior in `Hero.jsx`/`SceneBoundary.jsx`; the page content must remain usable when WebGL is unavailable. If adding external GLTF/texture files, put them under `public/assets/`, document their source and optimize their size before loading them.

## Inquiry form limitation

The contact form validates name, email, project type and message in the browser and then displays an explicit demo-only confirmation. **It does not send or store an inquiry; no form provider, email integration or backend is connected.** To receive submissions, choose and configure a real form service or a protected server endpoint, send the validated values to it, handle loading/success/failure responses, keep provider credentials server-side, and update the translated confirmation and error messages. Do not claim that a message has been sent until that service confirms success.

## Content and asset notes

All four project cards are concept previews and remain labeled as in development; they are not assertions of completed client work. `niya-meal.jpg` appears only inside the NIYA DZ illustrative preview. Replace it only with a licensed or supplied asset intended for that concept. The footer intentionally identifies contact and social details as unavailable placeholders until real channels are provided.

The web page is not published by the local development commands. The project's managed preview and checkpoint workflow are separate from deployment/publication.
