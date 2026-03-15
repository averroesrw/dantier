# Design systém

**Soubor:** `src/style.css`

Aplikace používá tmavý motiv s glassmorphism efekty. Veškeré design tokens jsou definovány v CSS pomocí Tailwind v4 direktivy `@theme`.

## Barvy

### Povrchové barvy

| Token | Hodnota | Použití |
|---|---|---|
| `--color-surface` | `#060608` | Hlavní pozadí stránky |
| `--color-surface-raised` | `#0e0e12` | Pozadí vyvýšených prvků |

### Accent

| Token | Hodnota | Použití |
|---|---|---|
| `--color-accent` | `#c9a96e` | Zlatý accent (aktivní prvky, hover) |
| `--color-accent-light` | `#e2c78f` | Světlejší varianta accentu |

### Text

| Token | Hodnota | Použití |
|---|---|---|
| `--color-text-primary` | `#f5f5f7` | Hlavní barva textu |
| `--color-text-secondary` | `#a1a1aa` | Sekundární / doplňkový text |
| `--color-text-muted` | `#71717a` | Tlumený text (labely, poznámky) |

### Glass barvy

| Token | Hodnota | Použití |
|---|---|---|
| `--color-glass` | `rgba(255,255,255,0.08)` | Výchozí glass pozadí |
| `--color-glass-border` | `rgba(255,255,255,0.18)` | Ohraničení glass prvků |
| `--color-glass-hover` | `rgba(255,255,255,0.14)` | Hover stav glass prvků |
| `--color-glass-strong` | `rgba(255,255,255,0.22)` | Silnější glass (CTA tlačítka) |
| `--color-glass-dark` | `rgba(0,0,0,0.25)` | Tmavý glass (sekce, overlay) |
| `--color-glass-dark-border` | `rgba(255,255,255,0.1)` | Ohraničení tmavého glassu |

## Typografie

| Token | Hodnota | Použití |
|---|---|---|
| `--font-logo` | `"Playfair Display", serif` | Logo, velké nadpisy |
| `--font-sans` | `"Inter", sans-serif` | Vše ostatní |

V Tailwind třídách:
- `font-logo` → Playfair Display
- `font-sans` → Inter (výchozí pro `body`)

## Glass utility třídy

Projekt definuje čtyři CSS utility třídy pro glassmorphism efekty. Všechny kombinují `backdrop-filter: blur()` s poloprůhledným pozadím a jemným ohraničením.

### `.glass`

Základní glassmorphism. Použit na hlavičku (po scrollu) a lehčí prvky.

```css
.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.1);
}
```

### `.glass-strong`

Silnější glass pro primární CTA tlačítka a aktivní navigační odkazy.

- Vyšší opacity pozadí (`0.22`)
- Silnější blur (`28px`) a saturace (`1.6`)
- Výraznější ohraničení

### `.glass-dark`

Tmavá varianta pro sekce s inverzním kontrastem (CTA band na homepage).

- Tmavé pozadí (`rgba(0,0,0,0.25)`)
- Subtilnější ohraničení

### `.glass-card`

Karta s interaktivním hover efektem:

- Výchozí stav: blur `16px`, standardní ohraničení
- Hover: pozadí zesvětlí, karta se posune o `2px` nahoru, stín se zvětší
- Přechod animován s `transition: all 0.3s ease`
- Automaticky zahrnuje `border-radius: 1rem`

## Glow efekt

```css
.glow-accent {
  box-shadow: 0 0 20px rgba(201,169,110,0.15),
              0 0 60px rgba(201,169,110,0.05);
}
```

Jemná zlatá záře kolem CTA tlačítek. Kombinuje se s `.glass-strong`.

## Page transition

```css
.page-enter-active, .page-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.page-enter-from {
  opacity: 0; transform: translateY(12px);
}
.page-leave-to {
  opacity: 0; transform: translateY(-12px);
}
```

Viz [Routing — Přechody](./routing.md#přechody-mezi-stránkami).

## Scrollbar

Vlastní tenký scrollbar (6 px) s poloprůhledným thumb pro Webkit prohlížeče:

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); }
```

## Selection

Výběr textu používá zlatý accent jako pozadí:

```css
::selection {
  background: var(--color-accent);
  color: var(--color-surface);
}
```

## Jak přidat nový token

Přidejte proměnnou do bloku `@theme` v `src/style.css`:

```css
@theme {
  /* existující tokeny... */
  --color-muj-novy-token: #ff0000;
}
```

Token bude automaticky dostupný v Tailwind třídách jako `text-muj-novy-token`, `bg-muj-novy-token` atd.
