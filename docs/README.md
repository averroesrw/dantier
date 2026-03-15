# Dantier — Dokumentace

Webová prezentace prémiového kadeřnictví **Dantier**, postavená na moderním frontend stacku.

## Obsah dokumentace

| Dokument | Popis |
|---|---|
| [Architektura](./architektura.md) | Struktura projektu, technologie a build pipeline |
| [Komponenty](./komponenty.md) | Sdílené komponenty (`AppHeader`, `AppFooter`) |
| [Stránky](./stranky.md) | Popis jednotlivých stránek aplikace |
| [Routing](./routing.md) | Konfigurace Vue Router, navigace a přechody |
| [Design systém](./design-system.md) | Barvy, typografie, glass utility třídy |
| [Vývoj](./vyvoj.md) | Spuštění, build, nasazení a konvence |

## Rychlý přehled

- **Framework:** Vue 3 (Composition API, `<script setup>`)
- **Jazyk:** TypeScript
- **Bundler:** Vite 7
- **Styly:** Tailwind CSS 4 + vlastní CSS utility třídy
- **Routing:** Vue Router 4 (HTML5 history mode)
- **Package manager:** Bun
- **Design:** Tmavý glassmorphism motiv se zlatým accentem

## Spuštění

```bash
bun install
bun run dev
```

Aplikace poběží na `http://localhost:5173/`.
