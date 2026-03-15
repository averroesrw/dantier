# Komponenty

Sdílené komponenty se nachází v `src/components/`. Jsou použity v kořenové komponentě `App.vue` a jsou zobrazeny na všech stránkách aplikace.

---

## AppHeader

**Soubor:** `src/components/AppHeader.vue`

Fixní hlavička v horní části stránky. Obsahuje logo, desktopovou navigaci a mobilní hamburger menu.

### Funkce

- **Scroll efekt** — při scrollu více než 40 px od vrchu se na hlavičku aplikuje třída `.glass` (poloprůhledné pozadí s blur efektem) a zmenší se padding.
- **Navigace** — 4 odkazy: Domů, O nás, Rezervace, Kontakt. Aktivní odkaz je zvýrazněn třídou `.glass-strong`.
- **Mobilní menu** — Pod breakpointem `md` (768 px) se navigace skryje a zobrazí se hamburger tlačítko. Kliknutím se otevře/zavře dropdown s animovaným přechodem (`<Transition>`).
- **Hamburger animace** — Tři čáry se při otevření transformují na „X" pomocí CSS rotate/translate.

### Reaktivní stav

| Proměnná | Typ | Popis |
|---|---|---|
| `isOpen` | `Ref<boolean>` | Stav mobilního menu (otevřeno/zavřeno) |
| `scrolled` | `Ref<boolean>` | `true` když `window.scrollY > 40` |

### Navigační odkazy

```ts
const navLinks = [
  { to: '/', label: 'Domů' },
  { to: '/o-nas', label: 'O nás' },
  { to: '/rezervace', label: 'Rezervace' },
  { to: '/kontakt', label: 'Kontakt' },
]
```

### Event listenery

- `scroll` — registrován v `onMounted`, odebrán v `onUnmounted`.
- `click` na mobilním menu odkazu — zavře menu (`isOpen = false`).

---

## AppFooter

**Soubor:** `src/components/AppFooter.vue`

Patička s třísloupcovým layoutem (na desktopu).

### Obsah

| Sloupec | Obsah |
|---|---|
| **Brand** | Logo „Dantier" (font Playfair Display) + krátký popis |
| **Navigace** | Odkazy na všechny stránky pomocí `<RouterLink>` |
| **Kontakt** | Adresa, telefon, e-mail |

### Spodní lišta

- Copyright s dynamickým rokem (`new Date().getFullYear()`)
- Přepínač jazyka (CS / EN) — zatím pouze vizuální, bez funkcionality

---

## App.vue (kořenová komponenta)

**Soubor:** `src/App.vue`

Definuje celkový layout aplikace:

```html
<div class="min-h-screen flex flex-col bg-surface text-text-primary">
  <AppHeader />
  <main class="flex-1">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
</div>
```

### Klíčové vlastnosti

- **Flexbox layout** — hlavička nahoře, patička dole, obsah zabírá zbývající prostor (`flex-1`).
- **Animované přechody** — `<Transition name="page" mode="out-in">` zajišťuje plynulý fade + slide efekt při změně stránky.
- **`:key="route.path"`** — nutné pro správné rozlišení komponent při navigaci, aby `<Transition>` fungoval.
