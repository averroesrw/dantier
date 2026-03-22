# Střední odborná škola strojní a elektrotechnická Velešín

## Informační technologie

---

# Webová aplikace pro rezervační systém kadeřnického salonu

**Maturitní práce**

---

**Autor:** [Jméno a příjmení]

**Školní rok:** 2025/2026

---

\newpage

## Patitul

| | |
|---|---|
| **Název práce:** | Webová aplikace pro rezervační systém kadeřnického salonu |
| **Autor:** | [Jméno a příjmení] |
| **Škola:** | Střední odborná škola strojní a elektrotechnická Velešín |
| **Obor:** | Informační technologie |
| **Školní rok:** | 2025/2026 |
| **Vedoucí práce:** | [Jméno vedoucího] |
| **E-mail autora:** | [email@example.com] |

---

\newpage

## Anotace

Práce se zabývá návrhem a implementací moderní webové aplikace určené pro online rezervační systém kadeřnického salonu Dantier. Aplikace byla vytvořena s využitím frameworku Vue.js verze 3 a programovacího jazyka TypeScript. Pro stylování bylo použito řešení Tailwind CSS. Backendová část využívá serverless architekturu prostřednictvím platformy Cloudflare Pages Functions a databázi Cloudflare D1. Součástí systému je automatické odesílání potvrzovacích e-mailů zákazníkům. V teoretické části jsou popsány použité technologie a principy tvorby jednostránkových aplikací. Praktická část dokumentuje proces vývoje od návrhu až po nasazení do produkčního prostředí.

---

\newpage

## Prohlášení

Prohlašuji, že jsem maturitní práci vypracoval/a samostatně a veškeré použité prameny a informace uvádím v seznamu použité literatury. Jsem si vědom/a, že se na moji práci vztahuje zákon č. 121/2000 Sb., autorský zákon, a že škola má právo na užití této práce jako školního díla podle § 60 odst. 1 autorského zákona.

Ve Velešíně dne: ________________

Podpis: ________________

---

\newpage

## Poděkování

Tímto bych rád/a poděkoval/a vedoucímu práce za odborné vedení, cenné rady a trpělivost při zpracování této maturitní práce. Dále děkuji své rodině za podporu během celého studia.

---

\newpage

## Obsah

1. [Úvod a cíl práce](#1-úvod-a-cíl-práce)
2. [Teoretická část](#2-teoretická-část)
   - 2.1 [Jednostránkové aplikace](#21-jednostránkové-aplikace)
   - 2.2 [Framework Vue.js](#22-framework-vuejs)
   - 2.3 [TypeScript](#23-typescript)
   - 2.4 [Tailwind CSS](#24-tailwind-css)
   - 2.5 [Serverless architektura](#25-serverless-architektura)
   - 2.6 [Cloudflare Pages a D1](#26-cloudflare-pages-a-d1)
3. [Praktická část](#3-praktická-část)
   - 3.1 [Analýza požadavků](#31-analýza-požadavků)
   - 3.2 [Návrh aplikace](#32-návrh-aplikace)
   - 3.3 [Struktura projektu](#33-struktura-projektu)
   - 3.4 [Implementace frontendu](#34-implementace-frontendu)
   - 3.5 [Implementace backendu](#35-implementace-backendu)
   - 3.6 [Databázový model](#36-databázový-model)
   - 3.7 [Odesílání e-mailů](#37-odesílání-e-mailů)
   - 3.8 [Nasazení aplikace](#38-nasazení-aplikace)
4. [Závěr](#4-závěr)
5. [Použité zdroje](#5-použité-zdroje)
6. [Seznam obrázků](#6-seznam-obrázků)
7. [Seznam tabulek](#7-seznam-tabulek)
8. [Přílohy](#8-přílohy)

---

\newpage

## 1. Úvod a cíl práce

V dnešní době hraje internet klíčovou roli v každodenním životě lidí. Stále více zákazníků preferuje možnost objednání služeb online místo telefonického kontaktu nebo osobní návštěvy provozovny. Tento trend se nevyhýbá ani odvětví služeb, jako jsou kadeřnické salony. Provozovatelé těchto podniků se proto snaží nabídnout svým zákazníkům moderní způsoby komunikace a rezervace termínů.

Motivací pro vytvoření této práce byla skutečná potřeba fiktivního kadeřnického salonu Dantier, který dosud neměl vlastní webovou prezentaci s možností online rezervací. Majitelé salonu se potýkali s problémy spojenými s telefonickým objednáváním, kdy docházelo k nedorozuměním ohledně termínů a služeb. Zákazníci si navíc stěžovali na nemožnost provést rezervaci mimo pracovní dobu salonu.

Cílem této maturitní práce bylo navrhnout a vytvořit funkční webovou aplikaci, která umožní zákazníkům kadeřnického salonu provádět online rezervace termínů. Aplikace měla splňovat následující požadavky:

- Přehledná prezentace salonu a nabízených služeb
- Intuitivní rezervační formulář s výběrem data a času
- Zabránění dvojitým rezervacím na stejný termín
- Automatické odesílání potvrzovacích e-mailů zákazníkům
- Responzivní design pro mobilní zařízení
- Moderní tmavý vizuální styl odpovídající charakteru salonu

Při vývoji byl kladen důraz na použití moderních technologií a postupů, které jsou v současnosti standardem v oblasti webového vývoje. Zároveň bylo dbáno na jednoduchost a přehlednost kódu, aby bylo možné aplikaci v budoucnu snadno rozšiřovat a udržovat.

Práce je rozdělena na teoretickou a praktickou část. V teoretické části jsou představeny použité technologie a vysvětleny základní principy, na kterých je aplikace postavena. Praktická část pak podrobně popisuje samotný proces vývoje od počátečního návrhu až po nasazení do produkčního prostředí.

---

\newpage

## 2. Teoretická část

Tato kapitola se věnuje teoretickému základu technologií a konceptů, které byly při vývoji aplikace použity. Pochopení těchto principů je nezbytné pro správné uchopení praktické části práce.

### 2.1 Jednostránkové aplikace

Jednostránková aplikace, zkráceně SPA (z anglického Single Page Application), představuje moderní přístup k tvorbě webových aplikací. Na rozdíl od tradičních vícestránkových webů, kde každý přechod na novou stránku vyžaduje načtení kompletního HTML dokumentu ze serveru, načítá SPA pouze jednu HTML stránku při prvním přístupu. Veškerá další navigace a změny obsahu jsou pak prováděny dynamicky pomocí JavaScriptu bez nutnosti opětovného načítání stránky. [1]

Tento přístup přináší několik výhod. Za prvé je uživatelský zážitek plynulejší, protože přechody mezi jednotlivými sekcemi aplikace probíhají okamžitě bez blikání stránky. Za druhé je snížena zátěž serveru, neboť ten nemusí při každém požadavku generovat kompletní HTML. Server pouze poskytuje data ve formátu JSON, která jsou následně zpracována na straně klienta. [2]

Mezi nevýhody SPA patří horší výchozí optimalizace pro vyhledávače, větší počáteční doba načítání a zvýšené nároky na výkon prohlížeče. Tyto problémy lze však řešit různými technikami, jako je například předvykreslování nebo server-side rendering.

Pro správnou funkci SPA je nezbytné implementovat routování na straně klienta. To znamená, že změny URL adresy v prohlížeči nejsou zpracovávány serverem, ale JavaScriptovou aplikací, která na základě URL rozhodne, jaký obsah zobrazit. Pro tento účel existují specializované knihovny, jako je například Vue Router pro framework Vue.js.

### 2.2 Framework Vue.js

Vue.js je progresivní JavaScriptový framework určený pro tvorbu uživatelských rozhraní. Byl vytvořen Evanem You v roce 2014 a od té doby si získal značnou popularitu mezi vývojáři po celém světě. Označení „progresivní" vyjadřuje skutečnost, že Vue.js lze použít jak pro drobná vylepšení existujících stránek, tak pro vývoj rozsáhlých jednostránkových aplikací. [3]

Základním stavebním kamenem Vue.js jsou komponenty. Komponenta je samostatná jednotka, která zapouzdřuje svou šablonu (HTML), logiku (JavaScript) a styly (CSS). Tento přístup umožňuje rozdělit aplikaci na menší, snáze spravovatelné části, které lze opakovaně používat na různých místech aplikace.

Vue.js ve verzi 3 přinesl zásadní změny, mezi které patří zejména Composition API. Jedná se o nový způsob organizace logiky komponent, který nabízí větší flexibilitu a lepší možnosti znovupoužití kódu oproti původnímu Options API. Composition API využívá reaktivní systém Vue.js prostřednictvím funkcí jako jsou `ref()` a `reactive()` pro vytváření reaktivních proměnných. [4]

Syntaxe `<script setup>` představuje kompilační zkratku pro Composition API, která výrazně redukuje množství boilerplate kódu. Proměnné a funkce definované v bloku `<script setup>` jsou automaticky dostupné v šabloně komponenty bez nutnosti explicitního exportování.

Reaktivní systém Vue.js automaticky sleduje závislosti mezi daty a šablonou. Když se změní hodnota reaktivní proměnné, framework automaticky aktualizuje všechny části šablony, které na této proměnné závisí. Tento mechanismus výrazně zjednodušuje vývoj interaktivních aplikací.

### 2.3 TypeScript

TypeScript je programovací jazyk vyvinutý společností Microsoft, který rozšiřuje JavaScript o statické typování. Na rozdíl od JavaScriptu, kde jsou typy proměnných určeny až za běhu programu, umožňuje TypeScript definovat typy již při psaní kódu. Překladač TypeScriptu pak kontroluje správnost typů ještě před spuštěním programu. [5]

Hlavní výhodou statického typování je odhalení většího množství chyb již ve fázi vývoje. Překladač upozorní vývojáře na situace, kdy je například předána hodnota nesprávného typu do funkce nebo kdy je přistupováno k neexistující vlastnosti objektu. Tyto chyby by v čistém JavaScriptu byly odhaleny až za běhu, což může vést k nepředvídatelnému chování aplikace.

TypeScript také výrazně zlepšuje podporu vývojových nástrojů. Díky informacím o typech mohou editory jako Visual Studio Code nabídnout přesnější automatické doplňování, refaktoring a navigaci v kódu. To zvyšuje produktivitu vývojáře a snižuje počet chyb způsobených překlepy.

Pro definici typů objektů se v TypeScriptu používají rozhraní (interface) nebo typové aliasy (type). Rozhraní jsou vhodná pro definici struktury objektů, zatímco typové aliasy nabízejí větší flexibilitu a umožňují například definovat sjednocení typů.

V kontextu Vue.js se TypeScript integruje pomocí příznaku `lang="ts"` v bloku `<script>`. Vue.js ve verzi 3 byl od základu navržen s podporou TypeScriptu a poskytuje kompletní typové definice pro všechny své API.

### 2.4 Tailwind CSS

Tailwind CSS je tzv. utility-first CSS framework, který představuje odlišný přístup ke stylování webových stránek oproti tradičním frameworkům jako Bootstrap. Místo předpřipravených komponent poskytuje Tailwind CSS sadu nízkoúrovňových pomocných tříd, které přímo odpovídají jednotlivým CSS vlastnostem. [6]

Každá třída v Tailwind CSS obvykle nastavuje jednu konkrétní CSS vlastnost. Například třída `p-4` nastaví padding na velikost odpovídající hodnotě 4 v designovém systému frameworku, třída `text-white` nastaví barvu textu na bílou a třída `rounded-lg` přidá zaoblené rohy s větším poloměrem.

Tento přístup může na první pohled působit nepřehledně, protože HTML elementy obsahují velké množství tříd. V praxi však přináší několik výhod. Za prvé není nutné vymýšlet názvy pro CSS třídy, což je často překvapivě obtížný úkol. Za druhé je styling přímo viditelný v HTML, což usnadňuje pochopení, jak element vypadá, aniž by bylo nutné procházet samostatné CSS soubory.

Tailwind CSS ve verzi 4 přinesl zásadní změny v konfiguraci. Místo konfiguračního souboru `tailwind.config.js` se design tokeny definují přímo v CSS pomocí direktivy `@theme`. Tento přístup zjednodušuje nastavení a lépe odpovídá standardům CSS.

Pro optimalizaci výsledného CSS využívá Tailwind CSS techniku zvanou purging. Při sestavení produkční verze jsou z výstupního CSS odstraněny všechny nepoužité třídy, čímž se výrazně redukuje velikost souboru.

### 2.5 Serverless architektura

Serverless, česky bezserverová architektura, představuje model cloud computingu, kde poskytovatel cloudových služeb dynamicky spravuje alokaci a škálování serverových zdrojů. Vývojář se nemusí starat o správu serverů, jejich konfiguraci ani škálování – to vše zajišťuje poskytovatel. [7]

Základní jednotkou serverless architektury je funkce. Jedná se o krátký kus kódu, který je spuštěn v reakci na nějakou událost, například HTTP požadavek. Funkce běží pouze po dobu zpracování požadavku a poté je ukončena. Platí se pouze za skutečně spotřebovaný výpočetní čas, nikoliv za nepřetržitě běžící server.

Tento model přináší několik výhod. Za prvé je eliminována potřeba správy infrastruktury. Za druhé je zajištěno automatické škálování – pokud přijde více požadavků, poskytovatel automaticky spustí více instancí funkce. Za třetí je model ekonomicky výhodný pro aplikace s proměnlivou zátěží, protože není nutné platit za nevyužité serverové kapacity.

Mezi nevýhody patří tzv. cold start, tedy zpoždění při prvním spuštění funkce po delší době nečinnosti. Další omezení představují limity na dobu běhu funkce a velikost paměti. Pro některé typy aplikací také může být serverless model nákladnější než tradiční hosting.

### 2.6 Cloudflare Pages a D1

Cloudflare Pages je platforma pro hosting statických webů a jednostránkových aplikací v globální síti Cloudflare. Nabízí automatické nasazení při každém pushnutí do Git repozitáře, globální distribuci obsahu prostřednictvím CDN a integraci s dalšími službami Cloudflare. [8]

Klíčovou funkcí Cloudflare Pages jsou tzv. Functions. Jedná se o serverless funkce, které běží na hraničních serverech Cloudflare (edge computing). Funkce jsou definovány jako soubory v adresáři `functions/` a jsou automaticky mapovány na URL cesty. Například soubor `functions/api/reservations.ts` bude dostupný na URL `/api/reservations`.

Functions využívají Workers runtime, což je prostředí založené na standardu Service Workers. Podporuje JavaScript a TypeScript a nabízí API kompatibilní s webovými standardy, jako jsou Fetch API a Web Streams.

Cloudflare D1 je serverless SQL databáze typu SQLite, navržená pro použití s Cloudflare Workers a Pages. D1 kombinuje jednoduchost SQLite s globální distribucí a nízkými latencemi díky integraci s hraničními servery Cloudflare.

Databáze D1 využívá standardní SQL syntaxi a podporuje všechny běžné operace jako SELECT, INSERT, UPDATE a DELETE. Pro propojení databáze s Functions se používá tzv. binding, který je definován v konfiguračním souboru `wrangler.toml`. V kódu funkce je pak databáze dostupná prostřednictvím objektu `env.DB`.

---

\newpage

## 3. Praktická část

V této kapitole je podrobně popsán proces vývoje aplikace od počáteční analýzy požadavků přes návrh a implementaci až po nasazení do produkčního prostředí.

### 3.1 Analýza požadavků

Na začátku vývoje byla provedena analýza požadavků na základě konzultací s potenciálními uživateli systému. Byly identifikovány následující funkční požadavky:

**Požadavky na prezentační část:**
- Hlavní stránka s videem na pozadí a úvodním textem
- Stránka s informacemi o salonu a galerií fotografií
- Kontaktní stránka s adresou, telefonem a otevírací dobou
- Responzivní design fungující na mobilních i desktopových zařízeních

**Požadavky na rezervační systém:**
- Formulář pro zadání kontaktních údajů zákazníka
- Výběr požadované služby ze seznamu
- Interaktivní kalendář pro výběr data
- Výběr časového slotu s vizualizací obsazených termínů
- Validace vstupních dat na frontendu i backendu
- Uložení rezervace do databáze
- Automatické odeslání potvrzovacího e-mailu

**Nefunkční požadavky:**
- Doba načtení stránky do 3 sekund
- Podpora prohlížečů Chrome, Firefox, Safari a Edge
- Bezpečnost – ochrana proti běžným útokům (XSS, SQL injection)
- Dostupnost – provoz 24/7 bez výpadků

### 3.2 Návrh aplikace

Na základě analýzy požadavků byl vytvořen návrh aplikace. Pro frontend byl zvolen framework Vue.js 3 s TypeScriptem, který poskytuje dobrou rovnováhu mezi produktivitou vývoje a výkonem výsledné aplikace. Pro stylování byl vybrán Tailwind CSS kvůli jeho flexibilitě a podpoře dark mode.

Vizuální návrh aplikace vychází z konceptu tmavého minimalistického designu s akcenty v zlaté barvě. Tento styl byl zvolen pro vytvoření luxusního a profesionálního dojmu, který odpovídá charakteru kadeřnického salonu. Pro dosažení moderního vzhledu byl implementován tzv. glassmorphism efekt – poloprůhledné prvky s rozmazaným pozadím.

Pro backend byla zvolena serverless architektura využívající Cloudflare Pages Functions. Toto řešení bylo preferováno před tradičním serverem z několika důvodů. Za prvé není nutná správa infrastruktury. Za druhé jsou náklady minimální díky modelu pay-per-use. Za třetí je zajištěna vysoká dostupnost a globální distribuce.

Databázový model byl navržen s ohledem na jednoduchost a efektivitu. Pro ukládání rezervací byla vytvořena jedna tabulka s unikátním indexem na kombinaci data a času, což zabraňuje dvojitým rezervacím na stejný termín.

### 3.3 Struktura projektu

Projekt byl organizován do logické adresářové struktury, která odděluje různé části aplikace:

```
dantier/
├── src/
│   ├── main.ts              # Vstupní bod aplikace
│   ├── App.vue              # Kořenová komponenta
│   ├── style.css            # Globální styly a design tokeny
│   ├── components/          # Sdílené komponenty
│   │   ├── AppHeader.vue    # Hlavička s navigací
│   │   └── AppFooter.vue    # Patička
│   ├── pages/               # Stránkové komponenty
│   │   ├── HomePage.vue
│   │   ├── AboutPage.vue
│   │   ├── ReservationPage.vue
│   │   └── ContactPage.vue
│   └── router/
│       └── index.ts         # Konfigurace routeru
├── functions/
│   └── api/
│       └── reservations.ts  # API endpoint pro rezervace
├── migrations/
│   └── 0001_init.sql        # Schéma databáze
├── public/
│   └── video/
│       └── mpv.mp4          # Video pro hlavní stránku
└── docs/                    # Dokumentace projektu
```

Adresář `src/` obsahuje veškerý zdrojový kód frontendové části aplikace. Komponenty jsou rozděleny do dvou kategorií – sdílené komponenty v `components/` a stránkové komponenty v `pages/`. Toto rozdělení usnadňuje orientaci v projektu.

Adresář `functions/` obsahuje serverless funkce pro Cloudflare Pages. Struktura adresářů odpovídá URL cestám – soubor `api/reservations.ts` je mapován na cestu `/api/reservations`.

Adresář `migrations/` obsahuje SQL soubory pro inicializaci databázového schématu. Tyto soubory jsou spouštěny prostřednictvím nástroje Wrangler.

### 3.4 Implementace frontendu

#### 3.4.1 Kořenová komponenta a layout

Kořenová komponenta `App.vue` definuje základní layout aplikace. Využívá flexbox pro vytvoření struktury, kde hlavička je vždy nahoře, patička vždy dole a obsah zabírá zbývající prostor:

```vue
<template>
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
</template>
```

Komponenta `RouterView` zobrazuje aktuální stránku na základě URL. Pomocí slotu je získána reference na aktuální komponentu, která je následně obalena komponentou `Transition` pro animované přechody mezi stránkami.

#### 3.4.2 Navigační hlavička

Komponenta `AppHeader.vue` implementuje fixní hlavičku s reaktivním chováním. Při scrollování stránky se mění její vzhled – po překročení určité vzdálenosti od vrcholu se aplikuje glassmorphism efekt pro lepší kontrast s pozadím.

```typescript
const scrolled = ref(false)

onMounted(() => {
  const handleScroll = () => {
    scrolled.value = window.scrollY > 40
  }
  window.addEventListener('scroll', handleScroll)
})
```

Pro mobilní zařízení byl implementován hamburger menu s animovanou transformací tří čar na symbol X. Menu se zobrazuje pomocí Vue transition s animací opacity a translateY.

#### 3.4.3 Hlavní stránka

Hlavní stránka (`HomePage.vue`) se skládá ze tří sekcí. První sekcí je hero s video pozadím na celou obrazovku. Video je automaticky přehráváno ve smyčce bez zvuku. Přes video je aplikován gradientní overlay pro zajištění čitelnosti textu.

```vue
<video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover">
  <source src="/video/mpv.mp4" type="video/mp4" />
</video>
<div class="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-surface" />
```

Druhá sekce prezentuje nabízené služby formou karet s ikonami. Každá karta využívá třídu `glass-card` pro glassmorphism efekt a obsahuje hover animaci.

Třetí sekce je výzvou k akci (call-to-action) s odkazem na rezervační stránku. Sekce využívá tmavou variantu glass efektu pro vytvoření vizuálního kontrastu.

#### 3.4.4 Rezervační formulář

Rezervační stránka (`ReservationPage.vue`) obsahuje nejkomplexnější logiku v celé aplikaci. Formulář využívá reaktivní objekt pro ukládání všech hodnot:

```typescript
const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  note: '',
})
```

Pro výběr data byl implementován vlastní kalendář místo nativního HTML5 date inputu. Důvodem byla potřeba lepší kontroly nad vzhledem a funkcionalitou. Kalendář zobrazuje aktuální měsíc s možností navigace na předchozí a následující měsíce. Minulé dny jsou zašedlé a nelze je vybrat.

```typescript
const calendarDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const totalDays = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const offset = (firstDay.getDay() + 6) % 7
  const days: Array<CalendarDay | null> = []

  for (let i = 0; i < offset; i += 1) {
    days.push(null)
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const dateObj = new Date(currentYear.value, currentMonth.value, day)
    // ... vytvoření objektu dne
  }

  return days
})
```

Po výběru data jsou z API načteny obsazené časové sloty pro daný den. Tato informace je zobrazena uživateli – obsazené časy jsou vizuálně odlišeny a nelze je vybrat.

```typescript
watch(
  () => form.date,
  (value) => {
    if (!value) {
      reservedTimes.value = []
      return
    }
    loadReservedTimes(value)
  },
  { immediate: true }
)
```

Při odeslání formuláře je provedena validace na straně frontendu. V případě úspěšného odeslání je uživateli zobrazena potvrzovací zpráva s číslem rezervace.

### 3.5 Implementace backendu

Backend aplikace je implementován jako Cloudflare Pages Function v souboru `functions/api/reservations.ts`. Funkce zpracovává tři typy HTTP požadavků:

**OPTIONS** – Preflight požadavek pro CORS. Vrací hlavičky povolující cross-origin přístup.

**GET** – Načtení obsazených termínů pro zadané datum. Vrací pole časů, které jsou již rezervovány.

**POST** – Vytvoření nové rezervace. Přijímá JSON s údaji o rezervaci, validuje je, ukládá do databáze a odesílá potvrzovací e-mail.

#### 3.5.1 Validace vstupních dat

Validace vstupních dat je klíčová pro bezpečnost aplikace. Na backendu jsou kontrolovány všechny povinné položky, formáty (e-mail, datum, čas, telefon) a délky řetězců:

```typescript
function validatePayload(payload: unknown): 
  { ok: true; value: ReservationPayload } | 
  { ok: false; error: string } {
  
  if (!payload || typeof payload !== 'object') {
    return { ok: false, error: 'Neplatná data rezervace.' }
  }

  const name = normalizeRequired(input.name)
  const email = normalizeRequired(input.email)
  
  if (!name || !email || !service || !date || !time) {
    return { ok: false, error: 'Vyplňte povinná pole.' }
  }

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: 'E-mail nemá platný formát.' }
  }

  // ... další validace
}
```

#### 3.5.2 CORS hlavičky

Pro správné fungování frontendu na jiné doméně než backend bylo nutné implementovat CORS (Cross-Origin Resource Sharing). Funkce `corsHeaders()` generuje potřebné hlavičky na základě konfigurace:

```typescript
function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get('Origin')
  return {
    'Access-Control-Allow-Origin': origin ?? '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}
```

#### 3.5.3 Zpracování rezervace

Při vytváření rezervace je nejprve zkontrolováno, zda není požadovaný termín již obsazen. Pokud je volný, je rezervace uložena do databáze a odeslán potvrzovací e-mail:

```typescript
const slotTaken = await env.DB.prepare(
  `SELECT id FROM reservations 
   WHERE reservation_date = ?1 AND reservation_time = ?2`
)
  .bind(date, time)
  .first()

if (slotTaken) {
  return json(request, env, { 
    error: 'Tento termín je již rezervovaný.' 
  }, 409)
}

const result = await env.DB.prepare(
  `INSERT INTO reservations 
   (name, email, phone, service, reservation_date, reservation_time, note)
   VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
)
  .bind(name, email, phone, service, date, time, note)
  .run()
```

### 3.6 Databázový model

Pro ukládání rezervací byla navržena jednoduchá databázová struktura s jednou tabulkou. Schéma bylo definováno v migračním souboru:

```sql
CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  reservation_date TEXT NOT NULL,
  reservation_time TEXT NOT NULL,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_reservations_unique_slot
  ON reservations (reservation_date, reservation_time);
```

Unikátní index na kombinaci sloupců `reservation_date` a `reservation_time` zajišťuje na úrovni databáze, že nemůže existovat více rezervací na stejný termín. Pokus o vložení duplicitního záznamu vyvolá chybu, kterou aplikace zachytí a vrátí uživateli srozumitelnou zprávu.

Sloupec `status` byl přidán pro budoucí rozšíření – umožňuje evidovat stav rezervace (čekající, potvrzená, zrušená). V současné verzi je používána pouze výchozí hodnota `pending`.

### 3.7 Odesílání e-mailů

Pro odesílání potvrzovacích e-mailů byla integrována služba Resend. Tato služba poskytuje jednoduché REST API pro odesílání e-mailů a je optimalizovaná pro serverless prostředí.

E-mail je formátován jako HTML se styly odpovídajícími vizuálnímu stylu webu. Pro bezpečnost jsou všechny uživatelské vstupy escapovány před vložením do HTML:

```typescript
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
```

Odeslání e-mailu není kritickou operací – pokud selže, rezervace je stále úspěšně uložena. Uživatel je o případném problému s e-mailem informován, ale může počítat s tím, že jeho rezervace byla přijata.

### 3.8 Nasazení aplikace

Nasazení aplikace probíhá automaticky při každém pushnutí do hlavní větve Git repozitáře. Cloudflare Pages sleduje repozitář a při detekci změn spustí build proces.

Build proces zahrnuje následující kroky:

1. Instalace závislostí příkazem `bun install`
2. Sestavení produkční verze příkazem `bun run build`
3. Nahrání výstupních souborů na Cloudflare CDN
4. Aktivace nové verze na produkční URL

Pro manuální nasazení lze použít nástroj Wrangler:

```bash
bun run build
wrangler pages deploy dist --project-name dantier
```

Databázové migrace jsou spouštěny manuálně příkazem:

```bash
wrangler d1 execute dantier-reservations --remote --file=./migrations/0001_init.sql
```

Tajné hodnoty jako API klíče jsou uloženy jako secrets v Cloudflare dashboard a nejsou součástí repozitáře.

---

\newpage

## 4. Závěr

Cílem této maturitní práce bylo navrhnout a implementovat webovou aplikaci pro rezervační systém kadeřnického salonu. Všechny stanovené cíle byly splněny.

Byla vytvořena moderní jednostránková aplikace s intuitivním uživatelským rozhraním. Aplikace umožňuje zákazníkům salonu prohlížet informace o nabízených službách, zobrazit kontaktní údaje a především provádět online rezervace termínů. Rezervační formulář obsahuje interaktivní kalendář s vizualizací obsazených a volných termínů, což usnadňuje výběr vhodného času.

Z technického hlediska byly použity moderní technologie a postupy. Framework Vue.js 3 v kombinaci s TypeScriptem zajišťuje robustnost a udržitelnost kódu. Tailwind CSS umožnil rychlou implementaci responzivního designu s konzistentním vizuálním stylem. Serverless architektura na platformě Cloudflare eliminuje potřebu správy serverů a zajišťuje vysokou dostupnost.

Databázový model s unikátním indexem spolehlivě zabraňuje dvojitým rezervacím. Automatické odesílání potvrzovacích e-mailů zlepšuje uživatelský zážitek a snižuje nejistotu zákazníků ohledně stavu jejich rezervace.

Během vývoje bylo získáno mnoho praktických zkušeností s moderními webovými technologiemi. Práce ukázala, že i relativně jednoduchá aplikace vyžaduje pečlivý návrh a promyšlení mnoha detailů, od validace vstupů přes zpracování chybových stavů až po zabezpečení.

Aplikace je nasazena na adrese https://dantier.pages.dev a je plně funkční. V budoucnu by bylo možné systém rozšířit o administrační rozhraní pro správu rezervací, notifikace přes SMS, možnost zrušení nebo změny rezervace zákazníkem, nebo integraci s kalendářovými aplikacemi.

---

\newpage

## 5. Použité zdroje

[1] FREEMAN, Adam. *Pro Vue.js 2*. Berkeley: Apress, 2018. ISBN 978-1-4842-3804-2.

[2] MARTIN, Robert C. *Čistý kód: Návrhové vzory, refaktorování a testování*. Brno: Computer Press, 2019. ISBN 978-80-251-4942-2.

[3] MACRAE, Callum. *Vue.js: Up and Running*. Sebastopol: O'Reilly Media, 2018. ISBN 978-1-491-99724-6.

[4] Vue.js. *Vue.js Documentation* [online]. 2024 [cit. 2025-03-15]. Dostupné z: https://vuejs.org/guide/introduction.html

[5] CHERNY, Boris. *Programming TypeScript*. Sebastopol: O'Reilly Media, 2019. ISBN 978-1-492-03765-1.

[6] Tailwind Labs. *Tailwind CSS Documentation* [online]. 2024 [cit. 2025-03-15]. Dostupné z: https://tailwindcss.com/docs

[7] ROBERTS, Mike a John CHAPIN. *What Is Serverless?* Sebastopol: O'Reilly Media, 2017. ISBN 978-1-491-98441-3.

[8] Cloudflare. *Cloudflare Pages Documentation* [online]. 2024 [cit. 2025-03-15]. Dostupné z: https://developers.cloudflare.com/pages

[9] Cloudflare. *Cloudflare D1 Documentation* [online]. 2024 [cit. 2025-03-15]. Dostupné z: https://developers.cloudflare.com/d1

[10] Resend. *Resend API Documentation* [online]. 2024 [cit. 2025-03-15]. Dostupné z: https://resend.com/docs

---

\newpage

## 6. Seznam obrázků

*Obrázek 1: Struktura projektu a organizace souborů*

*Obrázek 2: Hlavní stránka aplikace s hero sekcí*

*Obrázek 3: Rezervační formulář s kalendářem*

*Obrázek 4: Mobilní zobrazení navigace*

*Obrázek 5: Potvrzovací e-mail*

*Obrázek 6: Schéma architektury aplikace*

---

## 7. Seznam tabulek

*Tabulka 1: Přehled použitých technologií*

*Tabulka 2: Funkční požadavky na aplikaci*

*Tabulka 3: Pole rezervačního formuláře*

*Tabulka 4: Struktura databázové tabulky reservations*

*Tabulka 5: HTTP odpovědi API endpointu*

---

\newpage

## 8. Přílohy

### Příloha 1 – Zdrojový kód API endpointu (reservations.ts)

```typescript
interface Env {
  DB: D1Database
  RESEND_API_KEY?: string
  RESEND_FROM_EMAIL?: string
}

interface ReservationPayload {
  name: string
  email: string
  phone?: string
  service: string
  date: string
  time: string
  note?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const TIME_RE = /^\d{2}:\d{2}$/

function validatePayload(payload: unknown): 
  { ok: true; value: ReservationPayload } | 
  { ok: false; error: string } {
  // ... validační logika
}

export const onRequestGet = async ({ request, env }) => {
  const url = new URL(request.url)
  const date = url.searchParams.get('date')

  const { results } = await env.DB.prepare(
    `SELECT reservation_time FROM reservations 
     WHERE reservation_date = ?1`
  ).bind(date).all()

  return json({ date, reservedTimes: results.map(r => r.reservation_time) })
}

export const onRequestPost = async ({ request, env }) => {
  const payload = await request.json()
  const validated = validatePayload(payload)

  if (!validated.ok) {
    return json({ error: validated.error }, 400)
  }

  const { name, email, phone, service, date, time, note } = validated.value

  const result = await env.DB.prepare(
    `INSERT INTO reservations 
     (name, email, phone, service, reservation_date, reservation_time, note)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`
  ).bind(name, email, phone, service, date, time, note).run()

  await sendConfirmationEmail(env, validated.value)

  return json({ reservationId: result.meta.last_row_id, message: 'OK' }, 201)
}
```

### Příloha 2 – Databázové schéma (0001_init.sql)

```sql
CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT NOT NULL,
  reservation_date TEXT NOT NULL,
  reservation_time TEXT NOT NULL,
  note TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_reservations_unique_slot
  ON reservations (reservation_date, reservation_time);

CREATE INDEX IF NOT EXISTS idx_reservations_created_at
  ON reservations (created_at);
```

### Příloha 3 – Konfigurace Tailwind CSS design tokenů

```css
@import "tailwindcss";

@theme {
  --color-surface: #060608;
  --color-surface-raised: #0e0e12;
  --color-accent: #c9a96e;
  --color-accent-light: #e2c78f;
  --color-text-primary: #f5f5f7;
  --color-text-secondary: #a1a1aa;
  --color-text-muted: #71717a;
  --color-glass: rgba(255,255,255,0.08);
  --color-glass-border: rgba(255,255,255,0.18);
  --font-logo: "Playfair Display", serif;
  --font-sans: "Inter", sans-serif;
}

.glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px) saturate(1.4);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 1rem;
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.12);
  transform: translateY(-2px);
}
```

### Příloha 4 – Ukázka rezervační komponenty (ReservationPage.vue)

```vue
<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  date: '',
  time: '',
  note: '',
})

const services = [
  'Dámský střih',
  'Pánský střih',
  'Barvení',
  'Melír',
  'Foukaná',
  'Regenerace vlasů',
  'Svatební účes',
]

const times = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00',
]

const isSubmitting = ref(false)
const reservedTimes = ref<string[]>([])

async function loadReservedTimes(date: string) {
  const response = await fetch(`/api/reservations?date=${date}`)
  const data = await response.json()
  reservedTimes.value = data.reservedTimes
}

watch(() => form.date, (value) => {
  if (value) loadReservedTimes(value)
})

async function handleSubmit() {
  isSubmitting.value = true
  
  const response = await fetch('/api/reservations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  })
  
  const result = await response.json()
  // ... zpracování odpovědi
  
  isSubmitting.value = false
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="glass-card p-8">
    <input v-model="form.name" required placeholder="Jméno" />
    <input v-model="form.email" type="email" required placeholder="E-mail" />
    <select v-model="form.service" required>
      <option v-for="s in services" :key="s" :value="s">{{ s }}</option>
    </select>
    <!-- ... kalendář a výběr času -->
    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Odesílání...' : 'Rezervovat' }}
    </button>
  </form>
</template>
```
