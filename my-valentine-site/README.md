# 💌 Valentine's Day — Virtual Mail Experience

An interactive, responsive React site that simulates a hand-delivered letter: tap to open an envelope, scroll a lovingly formatted message with photo reveals, and finish with a virtual bouquet animation.

This repository contains a lightweight, client-side web app built with Vite + React + TypeScript.

---

## 🚀 Highlights

- Tap-to-open mail interaction with particle and confetti effects
- Scroll-linked reveal animations for photos and text (Framer Motion)
- Background music and sound effects powered by Howler.js
- Lottie animations and responsive layout for mobile and desktop

---

## 🛠 Tech Stack

- React + TypeScript
- Vite (dev server + build)
- Tailwind CSS for styling
- Framer Motion for gestures and scroll animations
- Howler.js for audio playback
- Lottie for vector animations

See `package.json` for exact versions.

---

## Getting Started

Prerequisites:

- Node.js 18+ (or a recent LTS)
- npm or yarn

Quick setup:

```bash
# from repository root
cd my-valentine-site
npm install
npm run dev
```

- `npm run dev` — starts Vite dev server (hot reload)
- `npm run build` — creates an optimized production build in `dist/`
- `npm run preview` — locally preview the production build

If you prefer Yarn or pnpm, replace `npm` with your package manager of choice.

---

## Project Structure

The important files and folders:

- [public](public) — static assets (audio, Lottie manifests)
- [src/main.tsx](src/main.tsx) — app entry point
- [src/App.tsx](src/App.tsx) — main app composition and routes
- [src/components](src/components) — UI components (`Envelope`, `Letter`, `Bouquet`, etc.)
- [src/hooks/useOurSong.ts](src/hooks/useOurSong.ts) — audio playback hook
- [src/assets](src/assets) — images, Lottie JSON, and audio files
- `package.json`, `vite.config.ts`, `tsconfig.json` — build & config files

---

## Development Notes

- Audio is handled with `howler`. If audio fails to play in some browsers, ensure user interaction occurred before playback.
- Lottie files are stored under `src/assets/graphics/love-letter/animations/` and loaded via `manifest.json`.
- Tailwind styles are in `src/index.css` and component-level styles in `src/App.css`.

---

## Contributing

Small, local project — contributions welcome:

1. Fork the repo and create a branch for your change.
2. Run the dev server and add or adjust components.
3. Open a PR with a short description of the change.

Please keep changes focused and avoid unrelated refactors.

---

## License & Credits

This repository is personal/creative work. Add a license if you plan to share it publicly (for example, `MIT`).

Credits:

- Built with love using React, Framer Motion, Howler, and Lottie.

---

If you'd like, I can also:

- add a short demo GIF to `public/` and reference it here,
- add explicit npm scripts for linting/formatting,
- or create a simple GitHub Actions workflow to build and deploy the site.
