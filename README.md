<p align="center">
  <img src="public/Isopod_logo.png" alt="Isopod logo" width="120">
</p>

<h1 align="center">Isopod Website</h1>

<p align="center">
  The landing page, install guide, and wiki for <a href="https://github.com/Isopod-Project/Isopod">Isopod</a>, the self-hosted Minecraft server manager.<br>
  Live at <a href="https://isopod-project.github.io/Isopod-Website/">isopod-project.github.io/Isopod-Website</a>.
</p>

> Looking for Isopod itself, or want to report a bug? Head to the [main repository](https://github.com/Isopod-Project/Isopod).

## What's here

- **Landing page** (`src/App.tsx`): features, dashboard screenshot, and how to contribute.
- **Install page** (`#/downloads`): Docker install commands for Linux, Windows, macOS, and CasaOS.
- **Wiki** (`src/WikiPage.tsx`): user documentation. The Isopod dashboard's help buttons deep-link into it, so article and section ids must never be renamed or removed. See [wiki.md](https://github.com/Isopod-Project/Isopod/blob/main/docs/agents/wiki.md) in the main repo for how articles are laid out.

## Development

```bash
npm install
npm run dev          # http://localhost:5173/Isopod-Website/
npm run build        # type-check and build to dist/
npm run check:links  # check every dashboard help link points at a real wiki section
```

Pushes to `main` deploy to GitHub Pages through `.github/workflows/deploy.yml`.

## Stack

React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide icons, and Vite. Design tokens and shared components are documented in [DESIGN.md](DESIGN.md).

## Contributing

Wiki changes usually go with a feature in the main repo: open a PR here with the same issue number and link it from the Isopod PR. See the main repo's [CONTRIBUTING.md](https://github.com/Isopod-Project/Isopod/blob/main/CONTRIBUTING.md).
