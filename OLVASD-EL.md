# Portfólió — gyors verzió

Ideiglenes, eldobható megoldás. Statikus HTML, nincs build, nincs függőség.
Ha kész a végleges oldal, ez törölhető nyom nélkül.

---

## Mi van a mappában

| Fájl | Mi ez | Nyúlsz hozzá? |
|---|---|---|
| `index.html` | A főoldal: bemutatkozás, LinkedIn, csempék, címkeszűrő | Ritkán (szöveg) |
| `projects.js` | **A projektek listája** | **Igen — csak ezt** |
| `demos/` | Ide kerülnek a kész, egyoldalas HTML demóid | Igen (fájlokat másolsz) |
| `demos/_sablon-visszalink.html` | A „Vissza a projektekhez" sáv, amit a demóidra másolsz | Csak másolod |

---

## Első beállítás — GitHub Pages (kb. 15 perc)

### 1. GitHub fiók
Menj a <https://github.com/signup> oldalra, regisztrálj. Ingyenes.
Jegyezd meg a felhasználóneved — ez lesz a webcímed része.

### 2. Új repó
- Jobb fent **+** → **New repository**
- **Repository name:** `portfolio`
- **Public** (a GitHub Pages ingyenes csomagban csak publikus repóból működik)
- Pipa: **Add a README file**
- **Create repository**

> A repó publikus, tehát a benne lévő fájlok bárki számára láthatók.
> Ezért kerül ide **kizárólag anonimizált** tartalom. A privát repóidhoz
> és a valódi megoldásaidhoz ennek semmi köze — külön repó, külön tartalom.

### 3. Fájlok feltöltése
- A repóban: **Add file** → **Upload files**
- Húzd be az `index.html`, `projects.js` fájlokat és a teljes `demos` mappát
- Lent: **Commit changes**

### 4. Pages bekapcsolása
- **Settings** (a repó fenti menüsorában) → bal oldalt **Pages**
- **Source:** `Deploy from a branch`
- **Branch:** `main`, mappa: `/ (root)` → **Save**
- Várj 1-2 percet

Az oldalad ezen a címen lesz:

```
https://FELHASZNALONEVED.github.io/portfolio/
```

---

## Új demó felrakása (kb. 2 perc)

1. Másold a kész HTML fájlt a `demos/` mappába.
2. Nyisd meg, és a `<body>` után illeszd be a `_sablon-visszalink.html` tartalmát.
3. Nyisd meg a `projects.js`-t, és másolj le egy blokkot:

```js
{
  cim: "A projekt címe",
  leiras: "Egy-két mondat arról, mi ez és mit old meg.",
  fajl: "a-fajl-neve.html",
  cimkek: ["Python", "Automatizálás"],
  datum: "2026-08",
  kiemelt: false
},
```

4. Feltöltés GitHubra (**Add file** → **Upload files**), commit.

A címkeszűrő **automatikusan** frissül — nem kell hozzányúlnod.
Ami új címkét beírsz, az magától megjelenik a szűrősávban.

**Figyelj:** minden blokk után vessző kell, az utolsó után nem.
Ha az oldal üresen marad, szinte biztos egy hiányzó vessző vagy idézőjel.

---

## Kereshetőség (fontos, amíg állást keresel)

Az `index.html` és a demók tetején ez a sor van:

```html
<meta name="robots" content="noindex, nofollow">
```

Ez azt kéri a Google-tól, hogy **ne indexelje** az oldalt. Aki megkapja a linket,
eléri; aki a nevedre rákeres, nem találja meg. Ez nem jelszavas védelem, csak
diszkréció — de pont elég ahhoz, hogy ne bukkanjon fel véletlenül.

Ha később szeretnéd, hogy megtalálható legyen, töröld ezt a sort minden fájlból.

---

## Helyi kipróbálás

Dupla katt az `index.html`-re — megnyílik a böngészőben, minden működik.
Nem kell szerver.
