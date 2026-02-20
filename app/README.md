# SaaS LMS Dashboard (App)

This is the runnable frontend app for the SaaS LMS dashboard.

## Prerequisites

- Node.js 20+
- npm 10+

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the Vite URL in your terminal (typically `http://localhost:5173`).

## How to test it

### 1) Production build test

```bash
npm run build
```

This confirms TypeScript + Vite can produce a deployable bundle.

### 2) Production smoke test

```bash
npm run preview
```

After starting preview, open the shown URL and quickly verify:

- Dashboard loads
- Courses page filters/sorting work
- Course details page opens
- Navigation between pages works

### 3) Optional lint check

```bash
npm run lint
```

Note: the imported/generated project currently has some existing lint violations unrelated to startup/build.
