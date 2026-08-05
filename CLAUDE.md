# Projekt: portfólió (gyors, ideiglenes verzió)

Statikus HTML portfólió GitHub Pages-en. Nincs build, nincs npm, nincs framework.
Ideiglenes megoldás — a végleges oldal külön projekt lesz.

## Szerkezet

```
index.html    – főoldal: bemutatkozás, csempék, címkeszűrő. RITKÁN módosul.
projects.js   – a projektek listája. Új demónál EZ változik.
demos/        – egyoldalas, önálló HTML demók
  _sablon-visszalink.html – a vissza-navigációs sáv forrása
OLVASD-EL.md  – kézi (böngészős) használati útmutató
```

## Kritikus szabályok

### 1. Anonimizálás — ez a legfontosabb
A repó **publikus**. Minden fájl bárki számára letölthető, nem csak a
megjelenített oldal.

Új demó feldolgozásakor **mindig nézd át** a fájlt, és jelezd, ha találsz:
- ügyfél- vagy cégnevet (Raiffeisen, Nitro, konkrét megbízók)
- valódi ügyfélszintű adatot, e-mail címet, ügyfélazonosítót
- belső rendszernevet, szerver- vagy adatbázisnevet, connection stringet
- API kulcsot, tokent, jelszót
- belső URL-t vagy SharePoint útvonalat

Ne javítsd ki magadtól — **szólj, és kérdezz rá**, mielőtt bármi bekerül.
Ha bizonytalan vagy, inkább kérdezz.

Elfogadott anonimizálás: „egy hazai bank hűségprogramja", arányosított
vagy kerekített számok, kitalált minta-adatok.

### 2. Minden HTML-be kell noindex
Minden oldal `<head>` részébe, kivétel nélkül:

```html
<meta name="robots" content="noindex, nofollow">
```

Ez azért kell, mert a tulaj aktívan állást keres, és nem akarja, hogy az oldal
a nevére rákeresve felbukkanjon. Soha ne távolítsd el kérés nélkül.

### 3. Címke-szótár — ne találj ki újat
Csak ezeket használd, pontosan így írva:

```
SQL · Python · Power BI · Excel
ML / Data Science · CRM · Szegmentáció · A/B teszt
AI / LLM · Automatizálás · Web scraping · ETL / Adatpipeline
```

Ha egy projekthez ezek egyike sem illik, **kérdezd meg**, mielőtt új címkét
vezetsz be. Egy elgépelt vagy szinonim címke (pl. „python", „PowerBI")
külön szűrőgombot csinál, és szétesik a szűrő.

Egy projekthez 2-4 címke az ideális.

### 4. Az index.html-hez ne nyúlj új demó miatt
A csempék és a szűrő a `projects.js`-ből generálódnak. Ha új demó felrakásához
az `index.html`-t akarod módosítani, valamit félreértettél.

## Új demó felvétele — a folyamat

1. A kapott HTML-t másold a `demos/` mappába, beszédes, ékezet nélküli,
   kisbetűs-kötőjeles néven (pl. `kmeans-szegmentacio.html`).
2. Nézd át anonimizálás szempontjából (lásd fent). Ami gyanús, jelezd.
3. Szúrd be a `<head>`-be a noindex sort.
4. Szúrd be a `<body>` után a `_sablon-visszalink.html` tartalmát.
5. Vedd fel a bejegyzést a `projects.js`-be:

```js
{
  cim: "…",
  leiras: "1-2 mondat: mi ez és mit old meg",
  fajl: "fajlnev.html",
  cimkek: ["…", "…"],
  datum: "2026-08",
  kiemelt: false
},
```

6. Ellenőrizd, hogy a `projects.js` szintaktikailag ép (vessző minden blokk
   után, az utolsó után nincs).
7. Nyisd meg helyben az `index.html`-t, és nézd meg, hogy megjelent-e a csempe
   és működik-e a szűrő.

A `kiemelt: true` szélesebb csempét ad — egyszerre legfeljebb 1-2 projekten
legyen bekapcsolva.

## Stílus

A demók megtarthatják a saját megjelenésüket — nem cél az egységesítés.
A közös elem csak a vissza-link sáv.

Ha új oldalt írsz nulláról, a főoldal tokenjeit használd:
`--paper:#F2F3F0 · --ink:#15181C · --accent:#1F6F5C`, IBM Plex Sans + IBM Plex Mono.

## Commit

Rövid, magyar, tárgyszerű üzenet:

```
Új demó: K-means szegmentáció
Leírás pontosítva a transcription demónál
```

Ne írj `Co-Authored-By` sort és ne említsd a commitban, hogy AI készítette.

## Amit ne csinálj

- Ne vezess be build lépést, npm-et, frameworköt. A lényeg az egyszerűség.
- Ne írd át a demók tartalmát „szebbre" külön kérés nélkül.
- Ne pusholj automatikusan — a commit után várd meg a jóváhagyást.
