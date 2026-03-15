# Dantier

Webova prezentace kadernickeho salonu Dantier postavena na Vue 3, Vite a Tailwind CSS.

## Produkce

- Frontend + API: https://dantier.pages.dev
- API endpoint: https://dantier.pages.dev/api/reservations

Rezervace se ukladaji do Cloudflare D1 databaze `dantier-reservations`.

## Stack

- Vue 3 + TypeScript
- Vite 7
- Tailwind CSS 4
- Vue Router 4
- Cloudflare Pages Functions
- Cloudflare D1

## Lokalni spusteni

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

## Dokumentace

Kompletni ceska dokumentace je ve slozce [docs/README.md](docs/README.md).

## Cloudflare CI/CD (GitHub)

Workflow je v [\.github/workflows/deploy-cloudflare-pages.yml](.github/workflows/deploy-cloudflare-pages.yml).

Je potreba nastavit GitHub repository secret:

- `CLOUDFLARE_API_TOKEN`

## Resend email potvrzeni

Rezervace odesilaji potvrzovaci email pres Resend. V Cloudflare Pages nastavte:

- `RESEND_API_KEY` (secret)
- `RESEND_FROM_EMAIL`
- `RESEND_FROM_NAME` (volitelne)

Po pushi do `main` workflow:

1. postavi frontend,
2. aplikuje D1 migraci,
3. nasadi aktualni verzi na Cloudflare Pages.
