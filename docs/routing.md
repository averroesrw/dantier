# Routing

## Konfigurace

**Soubor:** `src/router/index.ts`

Aplikace používá Vue Router 4 s HTML5 History API (`createWebHistory`).

```ts
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 }
    },
})
```

## Tabulka routes

| Cesta | Název | Komponenta | Popis |
|---|---|---|---|
| `/` | `home` | `HomePage.vue` | Hlavní stránka |
| `/o-nas` | `about` | `AboutPage.vue` | O nás + galerie |
| `/rezervace` | `reservation` | `ReservationPage.vue` | Rezervační formulář |
| `/kontakt` | `contact` | `ContactPage.vue` | Kontaktní informace |
| `/:pathMatch(.*)*` | `not-found` | — | Catch-all, přesměruje na `/` |

## Lazy loading

Všechny stránkové komponenty jsou načítány lazy pomocí dynamického `import()`:

```ts
component: () => import('../pages/HomePage.vue')
```

Vite je automaticky rozdělí do samostatných chunks, takže se načtou až při první návštěvě dané stránky.

## Scroll behavior

Při každé navigaci se stránka automaticky scrolluje na vrch:

```ts
scrollBehavior() {
    return { top: 0 }
}
```

## Catch-all route (404)

Neznámé URLs jsou přesměrovány na hlavní stránku:

```ts
{ path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' }
```

## Přechody mezi stránkami

Přechody jsou řízeny v `App.vue` pomocí Vue `<Transition>`:

```html
<RouterView v-slot="{ Component, route }">
  <Transition name="page" mode="out-in">
    <component :is="Component" :key="route.path" />
  </Transition>
</RouterView>
```

### Princip

1. `v-slot="{ Component, route }"` — destrukturuje aktuální komponentu a route objekt ze slotu `<RouterView>`.
2. `<Transition name="page" mode="out-in">` — nejprve odejde stará stránka, pak přijde nová.
3. `:key="route.path"` — zajistí, že Vue rozpozná změnu komponenty a spustí transition.

### CSS animace

Definovány v `src/style.css`:

```css
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
```

Efekt: stránka odchází nahoru s fadeout a nová přichází zdola s fadein.

## Navigační prvky

Navigace je implementována pomocí `<RouterLink>` na dvou místech:

- **AppHeader** — desktopová + mobilní navigace (4 odkazy)
- **AppFooter** — sekundární navigace (4 odkazy)
