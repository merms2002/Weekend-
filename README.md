# SaaS LMS Dashboard

This repository is organized for deployment from the **repo root** while keeping the actual frontend app in `app/`.

## Repository layout

- `app/` → Vite + React + TypeScript LMS dashboard source code.
- `package.json` (root) → proxy scripts that run commands inside `app/`.
- `vercel.json` and `netlify.toml` → deployment-ready defaults.

## Local development

```bash
npm run install:app
npm run dev
```

## Build and test

```bash
npm run build
npm run preview
```

This now works from the repository root and produces the deployable bundle in `app/dist`.

## Deployment

### Vercel
- Framework preset: Vite (already defined in `vercel.json`)
- Build command: `npm run build`
- Output directory: `app/dist`

### Netlify
- Build command: `npm run build`
- Publish directory: `app/dist`
- Config is already provided in `netlify.toml`
