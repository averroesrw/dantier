Úvod a cíl práce
V dnešní době hraje internet klíčovou roli v každodenním životě lidí. Stále více zákazníků preferuje možnost objednání služeb online místo telefonického kontaktu nebo osobní návštěvy provozovny. Tento trend se nevyhýbá ani odvětví služeb, jako jsou kadeřnické salony. Provozovatelé těchto podniků se proto snaží nabídnout svým zákazníkům moderní způsoby komunikace a rezervace termínů.

Motivací pro vytvoření této práce byla skutečná potřeba fiktivního kadeřnického salonu Dantier, který dosud neměl vlastní webovou prezentaci s možností online rezervací. Majitelé salonu se potýkali s problémy spojenými s telefonickým objednáváním, kdy docházelo k nedorozuměním ohledně termínů a služeb. Zákazníci si navíc stěžovali na nemožnost provést rezervaci mimo pracovní dobu salonu.

Cílem této maturitní práce bylo navrhnout a vytvořit funkční webovou aplikaci, která umožní zákazníkům kadeřnického salonu provádět online rezervace termínů. Aplikace měla splňovat následující požadavky:

Přehledná prezentace salonu a nabízených služeb
Intuitivní rezervační formulář s výběrem data a času
Zabránění dvojitým rezervacím na stejný termín
Automatické odesílání potvrzovacích e-mailů zákazníkům
Responzivní design pro mobilní zařízení
Moderní tmavý vizuální styl odpovídající charakteru salonu
Při vývoji byl kladen důraz na použití moderních technologií a postupů, které jsou v současnosti standardem v oblasti webového vývoje. Zároveň bylo dbáno na jednoduchost a přehlednost kódu, aby bylo možné aplikaci v budoucnu snadno rozšiřovat a udržovat.

Práce je rozdělena na teoretickou a praktickou část. V teoretické části jsou představeny použité technologie a vysvětleny základní principy, na kterých je aplikace postavena. Praktická část pak podrobně popisuje samotný proces vývoje od počátečního návrhu až po nasazení do produkčního prostředí.

Teoretická část
Tato kapitola se věnuje teoretickému základu technologií a konceptů, které byly při vývoji aplikace použity. Pochopení těchto principů je nezbytné pro správné uchopení praktické části práce.

Jednostránkové aplikace
Jednostránková aplikace, zkráceně SPA (z anglického Single Page Application), představuje moderní přístup k tvorbě webových aplikací. Na rozdíl od tradičních vícestránkových webů, kde každý přechod na novou stránku vyžaduje načtení kompletního HTML dokumentu ze serveru, načítá SPA pouze jednu HTML stránku při prvním přístupu. Veškerá další navigace a změny obsahu jsou pak prováděny dynamicky pomocí JavaScriptu bez nutnosti opětovného načítání stránky. [1]

Tento přístup přináší několik výhod. Za prvé je uživatelský zážitek plynulejší, protože přechody mezi jednotlivými sekcemi aplikace probíhají okamžitě bez blikání stránky. Za druhé je snížena zátěž serveru, neboť ten nemusí při každém požadavku generovat kompletní HTML. Server pouze poskytuje data ve formátu JSON, která jsou následně zpracována na straně klienta. [2]

Mezi nevýhody SPA patří horší výchozí optimalizace pro vyhledávače, větší počáteční doba načítání a zvýšené nároky na výkon prohlížeče. Tyto problémy lze však řešit různými technikami, jako je například předvykreslování nebo server-side rendering.

Pro správnou funkci SPA je nezbytné implementovat routování na straně klienta. To znamená, že změny URL adresy v prohlížeči nejsou zpracovávány serverem, ale JavaScriptovou aplikací, která na základě URL rozhodne, jaký obsah zobrazit. Pro tento účel existují specializované knihovny, jako je například Vue Router pro framework Vue.js.

Framework Vue.js
Vue.js je progresivní JavaScriptový framework určený pro tvorbu uživatelských rozhraní. Byl vytvořen Evanem You v roce 2014 a od té doby si získal značnou popularitu mezi vývojáři po celém světě. Označení „progresivní" vyjadřuje skutečnost, že Vue.js lze použít jak pro drobná vylepšení existujících stránek, tak pro vývoj rozsáhlých jednostránkových aplikací. [3]

Základním stavebním kamenem Vue.js jsou komponenty. Komponenta je samostatná jednotka, která zapouzdřuje svou šablonu (HTML), logiku (JavaScript) a styly (CSS). Tento přístup umožňuje rozdělit aplikaci na menší, snáze spravovatelné části, které lze opakovaně používat na různých místech aplikace.

Vue.js ve verzi 3 přinesl zásadní změny, mezi které patří zejména Composition API. Jedná se o nový způsob organizace logiky komponent, který nabízí větší flexibilitu a lepší možnosti znovupoužití kódu oproti původnímu Options API. Composition API využívá reaktivní systém Vue.js prostřednictvím funkcí jako jsou ref() a reactive() pro vytváření reaktivních proměnných. [4]

Syntaxe <script setup> představuje kompilační zkratku pro Composition API, která výrazně redukuje množství boilerplate kódu. Proměnné a funkce definované v bloku <script setup> jsou automaticky dostupné v šabloně komponenty bez nutnosti explicitního exportování.

Reaktivní systém Vue.js automaticky sleduje závislosti mezi daty a šablonou. Když se změní hodnota reaktivní proměnné, framework automaticky aktualizuje všechny části šablony, které na této proměnné závisí. Tento mechanismus výrazně zjednodušuje vývoj interaktivních aplikací.

TypeScript
TypeScript je programovací jazyk vyvinutý společností Microsoft, který rozšiřuje JavaScript o statické typování. Na rozdíl od JavaScriptu, kde jsou typy proměnných určeny až za běhu programu, umožňuje TypeScript definovat typy již při psaní kódu. Překladač TypeScriptu pak kontroluje správnost typů ještě před spuštěním programu. [5]

Hlavní výhodou statického typování je odhalení většího množství chyb již ve fázi vývoje. Překladač upozorní vývojáře na situace, kdy je například předána hodnota nesprávného typu do funkce nebo kdy je přistupováno k neexistující vlastnosti objektu. Tyto chyby by v čistém JavaScriptu byly odhaleny až za běhu, což může vést k nepředvídatelnému chování aplikace.

TypeScript také výrazně zlepšuje podporu vývojových nástrojů. Díky informacím o typech mohou editory jako Visual Studio Code nabídnout přesnější automatické doplňování, refaktoring a navigaci v kódu. To zvyšuje produktivitu vývojáře a snižuje počet chyb způsobených překlepy.

Pro definici typů objektů se v TypeScriptu používají rozhraní (interface) nebo typové aliasy (type). Rozhraní jsou vhodná pro definici struktury objektů, zatímco typové aliasy nabízejí větší flexibilitu a umožňují například definovat sjednocení typů.

V kontextu Vue.js se TypeScript integruje pomocí příznaku lang="ts" v bloku <script>. Vue.js ve verzi 3 byl od základu navržen s podporou TypeScriptu a poskytuje kompletní typové definice pro všechny své API.

Tailwind CSS
Tailwind CSS je tzv. utility-first CSS framework, který představuje odlišný přístup ke stylování webových stránek oproti tradičním frameworkům jako Bootstrap. Místo předpřipravených komponent poskytuje Tailwind CSS sadu nízkoúrovňových pomocných tříd, které přímo odpovídají jednotlivým CSS vlastnostem. [6]

Každá třída v Tailwind CSS obvykle nastavuje jednu konkrétní CSS vlastnost. Například třída p-4 nastaví padding na velikost odpovídající hodnotě 4 v designovém systému frameworku, třída text-white nastaví barvu textu na bílou a třída rounded-lg přidá zaoblené rohy s větším poloměrem.

Tento přístup může na první pohled působit nepřehledně, protože HTML elementy obsahují velké množství tříd. V praxi však přináší několik výhod. Za prvé není nutné vymýšlet názvy pro CSS třídy, což je často překvapivě obtížný úkol. Za druhé je styling přímo viditelný v HTML, což usnadňuje pochopení, jak element vypadá, aniž by bylo nutné procházet samostatné CSS soubory.

Tailwind CSS ve verzi 4 přinesl zásadní změny v konfiguraci. Místo konfiguračního souboru tailwind.config.js se design tokeny definují přímo v CSS pomocí direktivy @theme. Tento přístup zjednodušuje nastavení a lépe odpovídá standardům CSS.

Pro optimalizaci výsledného CSS využívá Tailwind CSS techniku zvanou purging. Při sestavení produkční verze jsou z výstupního CSS odstraněny všechny nepoužité třídy, čímž se výrazně redukuje velikost souboru.

Serverless architektura
Serverless, česky bezserverová architektura, představuje model cloud computingu, kde poskytovatel cloudových služeb dynamicky spravuje alokaci a škálování serverových zdrojů. Vývojář se nemusí starat o správu serverů, jejich konfiguraci ani škálování - to vše zajišťuje poskytovatel. [7]

Základní jednotkou serverless architektury je funkce. Jedná se o krátký kus kódu, který je spuštěn v reakci na nějakou událost, například HTTP požadavek. Funkce běží pouze po dobu zpracování požadavku a poté je ukončena. Platí se pouze za skutečně spotřebovaný výpočetní čas, nikoliv za nepřetržitě běžící server.

Tento model přináší několik výhod. Za prvé je eliminována potřeba správy infrastruktury. Za druhé je zajištěno automatické škálování - pokud přijde více požadavků, poskytovatel automaticky spustí více instancí funkce. Za třetí je model ekonomicky výhodný pro aplikace s proměnlivou zátěží, protože není nutné platit za nevyužité serverové kapacity.

Mezi nevýhody patří tzv. cold start, tedy zpoždění při prvním spuštění funkce po delší době nečinnosti. Další omezení představují limity na dobu běhu funkce a velikost paměti. Pro některé typy aplikací také může být serverless model nákladnější než tradiční hosting.

Cloudflare Pages a D1
Cloudflare Pages je platforma pro hosting statických webů a jednostránkových aplikací v globální síti Cloudflare. Nabízí automatické nasazení při každém pushnutí do Git repozitáře, globální distribuci obsahu prostřednictvím CDN a integraci s dalšími službami Cloudflare. [8]

Klíčovou funkcí Cloudflare Pages jsou tzv. Functions. Jedná se o serverless funkce, které běží na hraničních serverech Cloudflare (edge computing). Funkce jsou definovány jako soubory v adresáři functions/ a jsou automaticky mapovány na URL cesty. Například soubor functions/api/reservations.ts bude dostupný na URL /api/reservations.

Functions využívají Workers runtime, což je prostředí založené na standardu Service Workers. Podporuje JavaScript a TypeScript a nabízí API kompatibilní s webovými standardy, jako jsou Fetch API a Web Streams.

Cloudflare D1 je serverless SQL databáze typu SQLite, navržená pro použití s Cloudflare Workers a Pages. D1 kombinuje jednoduchost SQLite s globální distribucí a nízkými latencemi díky integraci s hraničními servery Cloudflare.

Databáze D1 využívá standardní SQL syntaxi a podporuje všechny běžné operace jako SELECT, INSERT, UPDATE a DELETE. Pro propojení databáze s Functions se používá tzv. binding, který je definován v konfiguračním souboru wrangler.toml. V kódu funkce je pak databáze dostupná prostřednictvím objektu env.DB.

Praktická část
V této kapitole je podrobně popsán proces vývoje aplikace od počáteční analýzy požadavků přes návrh a implementaci až po nasazení do produkčního prostředí.

Analýza požadavků
Na začátku vývoje byla provedena analýza požadavků na základě konzultací s potenciálními uživateli systému. Byly identifikovány následující funkční požadavky:

Požadavky na prezentační část:

Hlavní stránka s videem na pozadí a úvodním textem
Stránka s informacemi o salonu a galerií fotografií
Kontaktní stránka s adresou, telefonem a otevírací dobou
Responzivní design fungující na mobilních i desktopových zařízeních
Požadavky na rezervační systém:

Formulář pro zadání kontaktních údajů zákazníka
Výběr požadované služby ze seznamu
Interaktivní kalendář pro výběr data
Výběr časového slotu s vizualizací obsazených termínů
Validace vstupních dat na frontendu i backendu
Uložení rezervace do databáze
Automatické odeslání potvrzovacího e-mailu
Nefunkční požadavky:

Doba načtení stránky do 3 sekund
Podpora prohlížečů Chrome, Firefox, Safari a Edge
Bezpečnost - ochrana proti běžným útokům (XSS, SQL injection)
Dostupnost - provoz 24/7 bez výpadků
Návrh aplikace
Na základě analýzy požadavků byl vytvořen návrh aplikace. Pro frontend byl zvolen framework Vue.js 3 s TypeScriptem, který poskytuje dobrou rovnováhu mezi produktivitou vývoje a výkonem výsledné aplikace. Pro stylování byl vybrán Tailwind CSS kvůli jeho flexibilitě a podpoře dark mode.

Vizuální návrh aplikace vychází z konceptu tmavého minimalistického designu s akcenty v zlaté barvě. Tento styl byl zvolen pro vytvoření luxusního a profesionálního dojmu, který odpovídá charakteru kadeřnického salonu. Pro dosažení moderního vzhledu byl implementován tzv. glassmorphism efekt - poloprůhledné prvky s rozmazaným pozadím.

Pro backend byla zvolena serverless architektura využívající Cloudflare Pages Functions. Toto řešení bylo preferováno před tradičním serverem z několika důvodů. Za prvé není nutná správa infrastruktury. Za druhé jsou náklady minimální díky modelu pay-per-use. Za třetí je zajištěna vysoká dostupnost a globální distribuce.

Databázový model byl navržen s ohledem na jednoduchost a efektivitu. Pro ukládání rezervací byla vytvořena jedna tabulka s unikátním indexem na kombinaci data a času, což zabraňuje dvojitým rezervacím na stejný termín.

Struktura projektu
Projekt byl organizován do logické adresářové struktury, která odděluje různé části aplikace:

dantier/
├── src/
│ ├── main.ts # Vstupní bod aplikace
│ ├── App.vue # Kořenová komponenta
│ ├── style.css # Globální styly a design tokeny
│ ├── components/ # Sdílené komponenty
│ │ ├── AppHeader.vue # Hlavička s navigací
│ │ └── AppFooter.vue # Patička
│ ├── pages/ # Stránkové komponenty
│ │ ├── HomePage.vue
│ │ ├── AboutPage.vue
│ │ ├── ReservationPage.vue
│ │ └── ContactPage.vue
│ └── router/
│ └── index.ts # Konfigurace routeru
├── functions/
│ └── api/
│ └── reservations.ts # API endpoint pro rezervace
├── migrations/
│ └── 0001_init.sql # Schéma databáze
├── public/
│ └── video/
│ └── mpv.mp4 # Video pro hlavní stránku
└── docs/ # Dokumentace projektu

Adresář src/ obsahuje veškerý zdrojový kód frontendové části aplikace. Komponenty jsou rozděleny do dvou kategorií - sdílené komponenty v components/ a stránkové komponenty v pages/. Toto rozdělení usnadňuje orientaci v projektu.

Adresář functions/ obsahuje serverless funkce pro Cloudflare Pages. Struktura adresářů odpovídá URL cestám - soubor api/reservations.ts je mapován na cestu /api/reservations.

Adresář migrations/ obsahuje SQL soubory pro inicializaci databázového schématu. Tyto soubory jsou spouštěny prostřednictvím nástroje Wrangler.

Implementace frontendu
Kořenová komponenta a layout
Kořenová komponenta App.vue definuje základní layout aplikace. Využívá flexbox pro vytvoření struktury, kde hlavička je vždy nahoře, patička vždy dole a obsah zabírá zbývající prostor:

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

Komponenta RouterView zobrazuje aktuální stránku na základě URL. Pomocí slotu je získána reference na aktuální komponentu, která je následně obalena komponentou Transition pro animované přechody mezi stránkami.

Navigační hlavička
Komponenta AppHeader.vue implementuje fixní hlavičku s reaktivním chováním. Při scrollování stránky se mění její vzhled - po překročení určité vzdálenosti od vrcholu se aplikuje glassmorphism efekt pro lepší kontrast s pozadím.

const scrolled = ref(false)
onMounted(() => {
const handleScroll = () => {
scrolled.value = window.scrollY > 40
}
window.addEventListener('scroll', handleScroll)
})

Pro mobilní zařízení byl implementován hamburger menu s animovanou transformací tří čar na symbol X. Menu se zobrazuje pomocí Vue transition s animací opacity a translateY.

Hlavní stránka
Hlavní stránka (HomePage.vue) se skládá ze tří sekcí. První sekcí je hero s video pozadím na celou obrazovku. Video je automaticky přehráváno ve smyčce bez zvuku. Přes video je aplikován gradientní overlay pro zajištění čitelnosti textu.

<video autoplay loop muted playsinline class="absolute inset-0 w-full h-full object-cover">
<source src="/video/mpv.mp4" type="video/mp4" />
</video>
<div class="absolute inset-0 bg-linear-to-b from-black/50 via-black/30 to-surface" />

Druhá sekce prezentuje nabízené služby formou karet s ikonami. Každá karta využívá třídu glass-card pro glassmorphism efekt a obsahuje hover animaci.

Třetí sekce je výzvou k akci (call-to-action) s odkazem na rezervační stránku. Sekce využívá tmavou variantu glass efektu pro vytvoření vizuálního kontrastu.

Rezervační formulář
Rezervační stránka (ReservationPage.vue) obsahuje nejkomplexnější logiku v celé aplikaci. Formulář využívá reaktivní objekt pro ukládání všech hodnot:

const form = reactive({
name: '',
email: '',
phone: '',
service: '',
date: '',
time: '',
note: '',
})

Pro výběr data byl implementován vlastní kalendář místo nativního HTML5 date inputu. Důvodem byla potřeba lepší kontroly nad vzhledem a funkcionalitou. Kalendář zobrazuje aktuální měsíc s možností navigace na předchozí a následující měsíce. Minulé dny jsou zašedlé a nelze je vybrat.

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

Po výběru data jsou z API načteny obsazené časové sloty pro daný den. Tato informace je zobrazena uživateli - obsazené časy jsou vizuálně odlišeny a nelze je vybrat.

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

Při odeslání formuláře je provedena validace na straně frontendu. V případě úspěšného odeslání je uživateli zobrazena potvrzovací zpráva s číslem rezervace.

Implementace backendu
Backend aplikace je implementován jako Cloudflare Pages Function v souboru functions/api/reservations.ts. Funkce zpracovává tři typy HTTP požadavků:

OPTIONS - Preflight požadavek pro CORS. Vrací hlavičky povolující cross-origin přístup.

GET - Načtení obsazených termínů pro zadané datum. Vrací pole časů, které jsou již rezervovány.

POST - Vytvoření nové rezervace. Přijímá JSON s údaji o rezervaci, validuje je, ukládá do databáze a odesílá potvrzovací e-mail.

Validace vstupních dat
Validace vstupních dat je klíčová pro bezpečnost aplikace. Na backendu jsou kontrolovány všechny povinné položky, formáty (e-mail, datum, čas, telefon) a délky řetězců:

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

CORS hlavičky
Pro správné fungování frontendu na jiné doméně než backend bylo nutné implementovat CORS (Cross-Origin Resource Sharing). Funkce corsHeaders() generuje potřebné hlavičky na základě konfigurace:

function corsHeaders(request: Request, env: Env): Record<string, string> {
const origin = request.headers.get('Origin')
return {
'Access-Control-Allow-Origin': origin ?? '*',
'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
'Access-Control-Allow-Headers': 'Content-Type',
}
}

Zpracování rezervace
Při vytváření rezervace je nejprve zkontrolováno, zda není požadovaný termín již obsazen. Pokud je volný, je rezervace uložena do databáze a odeslán potvrzovací e-mail:

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

Databázový model
Pro ukládání rezervací byla navržena jednoduchá databázová struktura s jednou tabulkou. Schéma bylo definováno v migračním souboru:

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

Unikátní index na kombinaci sloupců reservation_date a reservation_time zajišťuje na úrovni databáze, že nemůže existovat více rezervací na stejný termín. Pokus o vložení duplicitního záznamu vyvolá chybu, kterou aplikace zachytí a vrátí uživateli srozumitelnou zprávu.

Sloupec status byl přidán pro budoucí rozšíření - umožňuje evidovat stav rezervace (čekající, potvrzená, zrušená). V současné verzi je používána pouze výchozí hodnota pending.

Odesílání e-mailů
Pro odesílání potvrzovacích e-mailů byla integrována služba Resend. Tato služba poskytuje jednoduché REST API pro odesílání e-mailů a je optimalizovaná pro serverless prostředí.

E-mail je formátován jako HTML se styly odpovídajícími vizuálnímu stylu webu. Pro bezpečnost jsou všechny uživatelské vstupy escapovány před vložením do HTML:

function escapeHtml(value: string): string {
return value
.replace(/&/g, '&')
.replace(/</g, '<')
.replace(/>/g, '>')
.replace(/"/g, '"')
.replace(/'/g, ''')
}

Odeslání e-mailu není kritickou operací - pokud selže, rezervace je stále úspěšně uložena. Uživatel je o případném problému s e-mailem informován, ale může počítat s tím, že jeho rezervace byla přijata.

Nasazení aplikace
Nasazení aplikace probíhá automaticky při každém pushnutí do hlavní větve Git repozitáře. Cloudflare Pages sleduje repozitář a při detekci změn spustí build proces.

Build proces zahrnuje následující kroky:

1. Instalace závislostí příkazem bun install

2. Sestavení produkční verze příkazem bun run build

3. Nahrání výstupních souborů na Cloudflare CDN

4. Aktivace nové verze na produkční URL

Pro manuální nasazení lze použít nástroj Wrangler:

bun run build
wrangler pages deploy dist --project-name dantier

Databázové migrace jsou spouštěny manuálně příkazem:

wrangler d1 execute dantier-reservations --remote --file=./migrations/0001_init.sql

Tajné hodnoty jako API klíče jsou uloženy jako secrets v Cloudflare dashboard a nejsou součástí repozitáře.

Závěr
Cílem této maturitní práce bylo navrhnout a implementovat webovou aplikaci pro rezervační systém kadeřnického salonu. Všechny stanovené cíle byly splněny.

Byla vytvořena moderní jednostránková aplikace s intuitivním uživatelským rozhraním. Aplikace umožňuje zákazníkům salonu prohlížet informace o nabízených službách, zobrazit kontaktní údaje a především provádět online rezervace termínů. Rezervační formulář obsahuje interaktivní kalendář s vizualizací obsazených a volných termínů, což usnadňuje výběr vhodného času.

Z technického hlediska byly použity moderní technologie a postupy. Framework Vue.js 3 v kombinaci s TypeScriptem zajišťuje robustnost a udržitelnost kódu. Tailwind CSS umožnil rychlou implementaci responzivního designu s konzistentním vizuálním stylem. Serverless architektura na platformě Cloudflare eliminuje potřebu správy serverů a zajišťuje vysokou dostupnost.

Databázový model s unikátním indexem spolehlivě zabraňuje dvojitým rezervacím. Automatické odesílání potvrzovacích e-mailů zlepšuje uživatelský zážitek a snižuje nejistotu zákazníků ohledně stavu jejich rezervace.

Během vývoje bylo získáno mnoho praktických zkušeností s moderními webovými technologiemi. Práce ukázala, že i relativně jednoduchá aplikace vyžaduje pečlivý návrh a promyšlení mnoha detailů, od validace vstupů přes zpracování chybových stavů až po zabezpečení.

Aplikace je nasazena na adrese https://dantier.pages.dev a je plně funkční. V budoucnu by bylo možné systém rozšířit o administrační rozhraní pro správu rezervací, notifikace přes SMS, možnost zrušení nebo změny rezervace zákazníkem, nebo integraci s kalendářovými aplikacemi.
