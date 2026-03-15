# Architektura

## Použité technologie

| Technologie | Verze | Účel |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.5 | UI framework (Composition API, `<script setup>`) |
| [TypeScript](https://www.typescriptlang.org/) | ~5.9 | Statické typování |
| [Vite](https://vite.dev/) | ^7.3 | Dev server a bundler |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.2 | Utility-first CSS framework |
| [Vue Router](https://router.vuejs.org/) | 4 | Client-side routing |
| [Bun](https://bun.sh/) | — | Package manager a runtime |
| [Cloudflare Pages](https://pages.cloudflare.com/) | managed | Hosting frontend + Functions |
| [Cloudflare D1](https://developers.cloudflare.com/d1/) | managed | Ukladani rezervaci |

## Struktura projektu

```
dantier/
├── index.html              # Vstupní HTML (SPA shell)
├── package.json            # Závislosti a skripty
├── vite.config.ts          # Konfigurace Vite
├── tsconfig.json           # Kořenový TypeScript config (references)
├── tsconfig.app.json       # TS config pro aplikaci (src/)
├── tsconfig.node.json      # TS config pro Node (vite.config.ts)
├── public/
│   └── video/
│       └── mpv.mp4         # Hero video na hlavní stránce
├── functions/
│   └── api/
│       └── reservations.ts # Pages Function pro zapis rezervace
├── migrations/
│   └── 0001_init.sql       # D1 schema (tabulka reservations)
├── src/
│   ├── main.ts             # Entry point — vytvoření Vue aplikace
│   ├── App.vue             # Kořenová komponenta (layout)
│   ├── style.css           # Globální styly a design tokens
│   ├── assets/             # Statické assety zpracované Vite
│   ├── components/         # Sdílené komponenty
│   │   ├── AppHeader.vue   # Fixní hlavička s navigací
│   │   └── AppFooter.vue   # Patička
│   ├── pages/              # Stránky (route components)
│   │   ├── HomePage.vue
│   │   ├── AboutPage.vue
│   │   ├── ReservationPage.vue
│   │   └── ContactPage.vue
│   └── router/
│       └── index.ts        # Definice routes
├── wrangler.toml           # Cloudflare Pages + D1 binding
├── wrangler.worker.toml    # Volitelna Worker konfigurace
└── docs/                   # Tato dokumentace
```

## Životní cyklus požadavku

```
index.html
  └─ <div id="app">
       └─ main.ts
            ├─ createApp(App)
            ├─ .use(router)        ← Vue Router plugin
            └─ .mount('#app')
                 └─ App.vue
                      ├─ AppHeader
                      ├─ <RouterView>
                      │    └─ <Transition>
                      │         └─ aktuální stránka (lazy-loaded)
                      └─ AppFooter
```

## Build pipeline

Vite je nakonfigurován s dvěma pluginy:

```ts
// vite.config.ts
export default defineConfig({
  plugins: [vue(), tailwindcss()],
})
```

- **`@vitejs/plugin-vue`** — Kompilace `.vue` souborů (SFC).
- **`@tailwindcss/vite`** — Zpracování Tailwind CSS v4 (nahrazuje PostCSS plugin z v3).

Tailwind v4 nepoužívá konfigurační soubor `tailwind.config.js`. Místo toho se design tokens definují přímo v CSS pomocí direktivy `@theme` (viz [Design systém](./design-system.md)).

## TypeScript konfigurace

Projekt používá **solution-style** TypeScript setup se dvěma referencemi:

- **`tsconfig.app.json`** — Kompilace zdrojového kódu v `src/`. Rozšiřuje `@vue/tsconfig/tsconfig.dom.json` a má zapnutý strict mode.
- **`tsconfig.node.json`** — Kompilace konfiguračních souborů (např. `vite.config.ts`).

## Entry point

```ts
// src/main.ts
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```

Globální styly se importují jako side-effect na začátku, čímž se zajistí, že Tailwind a vlastní CSS utility jsou dostupné v celé aplikaci.

## Fonty

Fonty jsou načítány z Google Fonts přes `<link>` tagy v `index.html`:

- **Playfair Display** (italic, 400/700) — logo a nadpisy
- **Inter** (300–700) — běžný text

## Rezervacni backend

Rezervacni formular vola endpoint `POST /api/reservations`.

- Endpoint je implementovan jako **Cloudflare Pages Function** v `functions/api/reservations.ts`.
- Data se ukladaji do D1 tabulky `reservations`.
- Schema je verzovane SQL migraci v `migrations/0001_init.sql`.

Flow:

1. Frontend odešle JSON payload z `ReservationPage.vue`.
2. Function provede validaci (povinna pole, format data/casu, email).
3. Function zkontroluje obsazeni slotu (`reservation_date + reservation_time`).
4. Pri uspechu se vytvori zaznam v D1 a vrati se `reservationId`.
