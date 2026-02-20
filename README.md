# SaaS LMS Dashboard

This repository contains a Vite + React + TypeScript SaaS LMS dashboard.

## Run locally

```bash
cd app
npm install
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).

## How to test it

From `app/`, run these checks:

```bash
npm run build
npm run preview
```

- `npm run build` verifies TypeScript compilation and production bundling.
- `npm run preview` serves the production build so you can do a final UI smoke test.

### Optional static check

```bash
npm run lint
```

Lint is enabled and can be used during development, but the current codebase includes pre-existing lint issues from generated files.
