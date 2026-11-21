# CODEXA — Website Implementation Plan

## Scope and implementation

Build a responsive, single-page React + Vite website using JavaScript, Three.js via React Three Fiber and drei, GSAP/ScrollTrigger, and Framer Motion only where it adds useful interaction. The application is a static frontend; no server, database, email provider, or form service is configured. The contact form will validate locally and show a truthful demo confirmation without implying an inquiry was transmitted.

The supplied CODEXA logo image will be placed unchanged in the site navigation and footer. Project artwork will use original UI-style illustrations made from HTML/CSS/SVG and three-dimensional geometry rather than fabricated screenshots. A selected healthy-meal photo will be used only as the NIYA DZ concept card’s illustrative food image, with the project explicitly labeled in development.

The hero will render a custom real-time WebGL digital core, not a CSS simulation: optimized geometries and restrained particles, slow idle rotation, pointer/touch response, drag-to-explore, hover response and a scroll-linked camera transition. Include a loading treatment, reduced-motion behavior, mobile performance adaptation and a graceful WebGL fallback. Site sections will use restrained GSAP scroll reveals and tactile card interactions. Navigation and page content must remain useful when motion is reduced or WebGL is unavailable.

Organize all interface copy in `src/locales/en.json`, `src/locales/ar.json` and `src/locales/fr.json`. English is default; selection persists in localStorage and swaps content immediately. Arabic sets the document language and RTL direction and receives appropriate font fallbacks, alignment and direction-aware controls; English and French use LTR. Form prompts, errors, tooltips, 3D controls, and demo messages are translated too. Preserve the exact footer text `Developed by Oumaima Bezzelalam` in every language.

## Design

- **Design Movement:** Premium digital industrialism with the restraint of an editorial technology journal.
- **Core Principles:** (1) Precise, content-first hierarchy; (2) real technical depth without visual noise; (3) tactile material cues used sparingly; (4) responsive accessibility before decorative complexity.
- **Color Philosophy:** Midnight navy and near-black make the experience cinematic and protect readability. Electric blue and cyan signal active technology, with selective violet accents echoing the supplied logo; soft white and muted grey keep the long-form content calm. Do not modify the logo artwork.
- **Layout Paradigm:** An asymmetric, editorial one-page narrative: alternating split compositions, generous margins, oversized typography, compact section markers and a clear vertical reading path rather than repetitive centered cards.
- **Signature Elements:** The interactive digital-core sculpture; fine technical rules and coordinate-like section labels; limited cyan/violet status accents.
- **Interaction Philosophy:** Every gesture reveals structure or state. Use quiet hover depth, readable focus states, accessible touch targets and no essential information hidden behind hover.
- **Animation:** Slow, low-amplitude hero motion when idle; pointer/drag motion with damping; scroll-linked movement kept subtle; content reveals staggered sparingly. Respect `prefers-reduced-motion`, avoid forced smooth motion where reduced motion is requested, and disable/reduce particles on small or constrained devices.
- **Typography System:** Space Grotesk for display and navigation, Manrope for body/UI, with Noto Sans Arabic for Arabic content and suitable system fallbacks. Use a disciplined scale with large compact headings, readable body measure and strong contrast.
- **Brand Essence:** An independent digital studio turning ambitious business ideas into useful digital products; inventive, intelligent, dependable.
- **Brand Voice:** Direct, confident and human. Examples: “WE BUILD WHAT’S NEXT.” and “Have an idea? Let’s build it.”
- **Wordmark & Logo:** Use the supplied CODEXA logo file unchanged at its original proportions. Do not invent a replacement symbol or recolor the artwork.
- **Signature Brand Color:** Electric cyan, balanced by the logo’s violet rather than used as a full-page glow.

## Project structure

- `src/App.jsx` — page composition, persisted locale and direction, document metadata, and section reveals.
- `src/components/` — reusable navigation, language selector, hero, content sections, service/project cards, process timeline, validated demo form, logo and footer.
- `src/three/` — isolated React Three Fiber digital core, lighting, particles, drag controls and scroll-driven camera.
- `src/locales/` — English, Arabic and French dictionaries plus supported-language/direction helpers.
- `src/styles/site.css` — global theme, responsive layouts, RTL overrides, reduced-motion rules and interaction states.
- `public/assets/` — the supplied logo and the selected illustrative NIYA DZ food image.
- `public/manus-routes.json` — the single `/` route declaration.
- `README.md` — local setup, architecture, scene customization and form limitations.
- `README.md` — install/run instructions, architecture, form integration, and 3D replacement guidance.

## Build and delivery

Use Vite’s static output and the project’s configured preview port. Pin the package manager and lockfile while keeping the requested `npm install` / `npm run dev` workflow. Add only the libraries required for React, Three.js, R3F/drei, GSAP and motion. Verify the production build, route manifest and project source; check the live page at desktop and mobile sizes after the server is running. Do not publish unless explicitly requested or the project’s existing auto-publish setting already authorizes publication.

## Current asset note

The logo has now been supplied as `/home/ubuntu/upload/Gemini_Generated_Image_8cf6zh8cf6zh8cf6.jpeg` and will be used without alteration. The NIYA DZ illustrative photo candidate is a healthy-meal image selected from the image-search results (position 6); other previews will be coded illustrations, not claimed screenshots.
