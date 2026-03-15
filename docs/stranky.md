# Stránky

Stránky se nachází v `src/pages/`. Každá stránka je lazy-loaded Vue komponenta mapovaná na konkrétní route (viz [Routing](./routing.md)).

Všechny stránky mají **jeden kořenový element** (`<div>`), což je vyžadováno pro fungování `<Transition>` v `App.vue`.

---

## HomePage

**Soubor:** `src/pages/HomePage.vue`  
**Route:** `/`

Hlavní stránka salonu, skládá se ze tří sekcí.

### Sekce

#### 1. Hero (celá obrazovka)

- **Video pozadí** — soubor `public/video/mpv.mp4`, přehrává se automaticky, ve smyčce, bez zvuku.
- **Overlay gradient** — přechod z černé (nahoře) do barvy pozadí (`to-surface`), zajišťuje čitelnost textu.
- **Obsah** — logo „Dantier", tagline a dva CTA buttony:
  - „Rezervovat termín" → `/rezervace`
  - „Poznat nás" → `/o-nas`
- **Animace při načtení** — obsah se zobrazí s fade-in + slide-up efektem po 100 ms (`heroVisible` ref).

#### 2. Služby (Features)

Mřížka se třemi kartami (`.glass-card`):

| Ikona | Služba | Popis |
|---|---|---|
| ✂️ | Střihy | Moderní i klasické střihy |
| 🎨 | Barvení | Profesionální barvení |
| 💆 | Péče | Ošetření a regenerace |

#### 3. CTA band

Výzva k akci s odkazem na rezervaci. Použit `.glass-dark` styl.

### Reaktivní stav

| Proměnná | Typ | Popis |
|---|---|---|
| `heroVisible` | `Ref<boolean>` | Řídí fade-in animaci hero sekce |

---

## AboutPage

**Soubor:** `src/pages/AboutPage.vue`  
**Route:** `/o-nas`

Stránka „O nás" se dvěma sekcemi.

### Sekce

#### 1. O nás

Textový blok v `.glass-card` s popisem salonu (aktuálně Lorem Ipsum placeholder).

#### 2. Galerie

Mřížka 6 obrázků (3 sloupce na desktopu) s hover efektem:
- Obrázek se při hoveru zvětší (`scale-110`)
- Přes obrázek se zobrazí gradient overlay

Obrázky jsou aktuálně z `picsum.photos` (placeholder) a je třeba je nahradit reálnými fotografiemi.

---

## ReservationPage

**Soubor:** `src/pages/ReservationPage.vue`  
**Route:** `/rezervace`

Rezervační formulář v `.glass-card`.

### Pole formuláře

| Pole | Typ | Povinné | Popis |
|---|---|---|---|
| `name` | `text` | Ano | Jméno zákazníka |
| `email` | `email` | Ano | E-mailová adresa |
| `phone` | `tel` | Ne | Telefonní číslo |
| `service` | `select` | Ano | Výběr služby |
| `date` | `date` | Ano | Datum návštěvy |
| `time` | `select` | Ano | Čas návštěvy |
| `note` | `textarea` | Ne | Další požadavky |

### Dostupné služby

- Dámský střih
- Pánský střih
- Barvení
- Melír
- Foukaná
- Regenerace vlasů
- Svatební účes

### Dostupné časy

Od 09:00 do 17:00 v 30minutových intervalech.

### Odeslání

Formular vola `POST /api/reservations` (Cloudflare Pages Function), ktera ulozi data do D1 databaze.

Po odeslani:

- pri uspechu se zobrazi potvrzeni a `reservationId`,
- pri chybe se zobrazi validacni nebo serverova hlaska,
- tlacitko behem requestu prejde do loading stavu.

---

## ContactPage

**Soubor:** `src/pages/ContactPage.vue`  
**Route:** `/kontakt`

Kontaktní stránka se dvěma sloupci.

### Levý sloupec — Kontaktní informace

| Typ | Hodnota |
|---|---|
| Adresa | Ulice 123, 110 00 Praha 1 |
| Telefon | +420 123 456 789 (`tel:` odkaz) |
| E-mail | info@dantier.cz (`mailto:` odkaz) |
| Otevírací doba | Po–Pá 9–18, So 9–14, Ne zavřeno |

### Pravý sloupec — Mapa

Vizuální karta s ikonou místa a odkazem na Google Maps. Aktuálně vede na obecný `maps.google.com` — je třeba doplnit konkrétní adresu.
