# Vývoj

## Požadavky

- **Bun** (package manager a runtime) — [instalace](https://bun.sh/)
- **Node.js** 20.19+ nebo 22.12+ (vyžaduje Vite 7)

## Instalace závislostí

```bash
bun install
```

## Skripty

| Příkaz | Popis |
|---|---|
| `bun run dev` | Spustí vývojový server (Vite) s HMR |
| `bun run build` | Vytvoří produkční build do `dist/` |
| `bun run preview` | Spustí lokální server s produkčním buildem |
| `bun run typecheck` | Zkontroluje TypeScript typy pomocí `vue-tsc` |

## Cloudflare setup

Projekt je nasazeny na Cloudflare Pages a pouziva D1:

- Pages projekt: `dantier`
- Produkcni URL: `https://dantier.pages.dev`
- D1 databaze: `dantier-reservations`
- API endpoint: `POST /api/reservations`

### D1 migrace

```bash
wrangler d1 execute dantier-reservations --remote --file=./migrations/0001_init.sql --yes
```

### Pages deploy

```bash
bun run build
wrangler pages deploy dist --project-name dantier --branch main
```

### CI/CD z GitHub

Workflow soubor:

- `.github/workflows/deploy-cloudflare-pages.yml`

Nutne GitHub secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Vývojový server

```bash
bun run dev
```

Výchozí adresa: `http://localhost:5173/`. Pokud je port obsazený, Vite automaticky zvolí jiný (5174, 5175, …).

HMR (Hot Module Replacement) zajišťuje okamžitou aktualizaci v prohlížeči při úpravě souborů.

## Produkční build

```bash
bun run build
```

Výstup se zapíše do složky `dist/`. Vite automaticky:
- Minifikuje CSS a JavaScript
- Rozdělí lazy-loaded stránky do samostatných chunks
- Hashuje názvy souborů pro cache busting

## Kontrola typů

```bash
bun run typecheck
```

Používá `vue-tsc` (TypeScript compiler s podporou Vue SFC). Konfigurace:
- Strict mode zapnutý
- Nepovolené nepoužité proměnné a parametry
- Importy side-effectů musí být explicitní

## Nasazení

### Statický hosting

Build produkuje čistě statické soubory, nasaditelné na libovolný hosting:
- Netlify
- Vercel
- GitHub Pages
- Vlastní server (nginx, Apache)

### SPA fallback

Protože aplikace používá `createWebHistory()` (bez hash routingu), je nutné na serveru nakonfigurovat fallback — všechny cesty musí vracet `index.html`.

**Příklad pro nginx:**

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Příklad pro Netlify** (`public/_redirects`):

```
/*    /index.html   200
```

## Konvence

### Pojmenování souborů

- **Komponenty:** PascalCase (`AppHeader.vue`, `HomePage.vue`)
- **Stránky:** `[Název]Page.vue` — jasně odděluje stránky od komponent
- **Soubory:** kebab-case (`design-system.md`)

### Struktura komponent

Použit **Vue 3 Composition API** s `<script setup lang="ts">`:

```vue
<script setup lang="ts">
// importy a logika
</script>

<template>
  <!-- šablona -->
</template>
```

### Styly

- Preferovat Tailwind utility třídy přímo v šablonách
- Vlastní CSS třídy jen pro opakující se vzory (glass efekty)
- Žádné scoped styly — vše řešeno přes globální utility

### Routing

- České URL cesty (`/o-nas`, `/rezervace`, `/kontakt`)
- Anglické názvy routes (`home`, `about`, `reservation`, `contact`)

## Známé TODO

- [ ] Nahradit placeholder obrázky v galerii reálnými fotografiemi
- [ ] Doplnit reálnou adresu do Google Maps odkazu na kontaktní stránce
- [ ] Nahradit Lorem Ipsum na stránce O nás
- [ ] Implementovat přepínání jazyků (CS / EN)
