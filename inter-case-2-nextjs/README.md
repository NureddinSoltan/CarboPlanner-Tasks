## CarboPlanner Tasks

A simple Next.js app that lists meals and training items with filtering, sorting, status cards, and a detail modal. Supports light/dark theme.

### Live demo
- [carboplanner-tasks.netlify.app](https://carboplanner-tasks.netlify.app)

### Features
- **Theme toggle**: switch light/dark
- **Filter & sort table**
- **Item detail modal**
- **Status cards**: totals and calories

### Requirements
- **Node**: 18+
- **Package manager**: npm or pnpm

### Install
```bash
npm install
# or
pnpm install
```

### Run (development)
```bash
npm run dev
```
Open http://localhost:3000

### Build (production)
```bash
npm run build
```

### Project structure
```
src/
  app/            # Next.js app router
  components/     # UI components
  lib/            # data loading
  types/          # TypeScript types
  utils/          # table utilities
public/data/      # JSON data
```
