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
cd inter-case-2-nextjs

pnpm install  # recommended to use pnpm
# or
npm install
```

### Run (development)
```bash
pnpm dev
# or
npm run dev
```
Open http://localhost:3000

### Build (production)
```bash
pnpm build
# or
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

### Architecture
- **Framework**: Next.js (App Router) with TypeScript.
- **Routing & layout**: I use `src/app/layout.tsx` for the base HTML, theme provider, and global styles. The main dashboard lives in `src/app/page.tsx`.
- **Styling & UI**: Tailwind CSS and shadcn/ui primitives in `src/components/ui/*` (button, card, table, dialog, etc.).
- **Theming**: `src/components/ThemeProvider.tsx` and `src/components/ThemeToggle.tsx` handle light/dark mode; globals are in `src/app/globals.css`.
- **Data layer**: I load static JSON from `public/data/intern-case-2.json` via `src/lib/data.ts`. Types are in `src/types`.
- **Presentation**: The page composes `StatusCards`, `DataTable`, and `ItemDetailModal` from `src/components/*`.
- **State & interactions**: I keep filter/sort, selection, and dialog state on the client. `src/utils/tableUtils.ts` holds the filtering/sorting helpers with Jest tests in `src/utils/__tests__/`.

Data flow in one line: JSON → `lib/data.ts` (parse/shape) → `page.tsx` (load) → components. Interactions (filter, sort, row click) update local state and re-render the list.

### Trade-offs
- **Static data over API**: I prioritized simplicity and easy static hosting (Netlify). The cost is no persistence and no server-side querying.
- **Client-side filtering/sorting**: Perfect for small datasets and quick feedback. If this grows, I’d push it server-side and add pagination/virtualization.
- **Minimal global state**: Local state is enough here, so I skipped Redux/Zustand to keep things light.
- **UI primitives**: I leaned on prebuilt primitives in `components/ui/*` to move fast. That trades some deep customizability for speed and consistency.
- **Testing scope**: I covered table utilities with unit tests and left the UI to manual/visual checks to match the scope and timeline.

### AI assistance I used
- I used AI tools (Cursor with an auto models mode) to:
  - Fixing Netlify "page not found" by configuring SPA-style redirects (via `public/_redirects` and `netlify.toml`) so client-side routes resolve to `index.html`
  - Refactoring and tightening this documentation structure and phrasing
I reviewed and adjusted the output to keep naming, types, and behavior consistent.

### If I had more time, I’d extend it like this
- **Persisted backend**: Replace the static JSON with an API (Next.js Route Handlers or an external service). Add server-side filtering/sorting and pagination.
- **CRUD**: Add create/edit/delete flows with forms, validation, and optimistic updates.
- **Bigger datasets**: Add list virtualization (e.g., `react-virtual`) and debounced queries.
- **Analytics**: Grow `StatusCards` into trends, macros, and training summaries.
- **Accessibility & i18n**: Improve keyboard nav/ARIA and add translations.
- **Testing**: Add component tests (React Testing Library) and e2e (Playwright) for the critical flows.
