# -*- coding: utf-8 -*-
"""Szövegtérkép: kigyűjti a főoldal minden szerkeszthető szövegét, azonosítóval.

    python scripts/szovegterkep.py

Kimenet: SZOVEGEK.md a projekt gyökerében (verziókövetésből kihagyva).
Bármikor újrafuttatható — a térkép így sosem avul el.

Mit gyűjt:
  - az index.html minden `data-en` attribútumos eleme (magyar + angol),
  - a projects.js csempeszövegei (cím + leírás, magyar + angol).

Az azonosító a szekció betűjéből és egy sorszámból áll (F1, H2, R5…).
A sorszámok szekción belül futnak, tehát egy új bekezdés nem tolja el
a többi szekció számozását.
"""
import io, os, re, sys

GYOKER = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(GYOKER, "index.html")
PROJEKTEK = os.path.join(GYOKER, "projects.js")
KIMENET = os.path.join(GYOKER, "SZOVEGEK.md")

# szekció-jelölő -> (betű, cím). A sorrend a fájlbeli sorrend.
SZEKCIOK = [
    ('<header class="fejlec">',        "F", "FEJLÉC"),
    ('<section class="hero"',          "H", "HERO"),
    ('<section class="teruletek-blokk">', "M", "FŐBB FELADATKÖREIM"),
    ('<section class="filterbar"',     "S", "SZŰRŐ"),
    ('<section class="rolam"',         "R", "RÓLAM"),
    ('<section class="kapcsolat"',     "K", "KAPCSOLAT"),
    ('<footer>',                       "L", "LÁBLÉC"),
]


def tiszta(sz):
    """Megjelenítéshez: sortörések és behúzások összehúzva, tagek jelölve."""
    sz = re.sub(r"\s+", " ", sz).strip()
    sz = sz.replace("&darr;", "↓").replace("&rarr;", "→").replace("&nbsp;", " ")
    return sz


def szekcio_helyek(html):
    helyek = []
    for jelolo, betu, cim in SZEKCIOK:
        i = html.find(jelolo)
        if i < 0:
            sys.exit("HIBA: nem találom a szekciót: %s" % jelolo)
        helyek.append((i, betu, cim))
    helyek.sort()
    return helyek


def melyik_szekcio(helyek, poz):
    talalat = helyek[0]
    for h in helyek:
        if h[0] <= poz:
            talalat = h
        else:
            break
    return talalat[1], talalat[2]


def index_szovegek():
    html = io.open(INDEX, encoding="utf-8").read()
    helyek = szekcio_helyek(html)

    minta = re.compile(
        r'<(h1|h2|h3|p|span|a|div|li)\b([^>]*?\bdata-en="([^"]*)"[^>]*?)>(.*?)</\1>', re.S)
    talalatok = list(minta.finditer(html))

    osszes = html.count('data-en="')
    if len(talalatok) != osszes:
        sys.exit("HIBA: %d data-en van a fájlban, de csak %d elemet tudtam kibontani.\n"
                 "Valószínűleg egy új elem beágyazott, azonos nevű tagot tartalmaz." %
                 (osszes, len(talalatok)))

    szamlalo = {}
    tetelek = []
    for m in talalatok:
        betu, cim = melyik_szekcio(helyek, m.start())
        szamlalo[betu] = szamlalo.get(betu, 0) + 1
        tetelek.append({
            "id": "%s%d" % (betu, szamlalo[betu]),
            "szekcio": cim,
            "hu": tiszta(m.group(4)),
            "en": tiszta(m.group(3)),
        })
    return tetelek


def csempe_szovegek():
    js = io.open(PROJEKTEK, encoding="utf-8").read()
    blokkok = re.findall(r'\{\s*\n\s*cim:.*?\n  \}', js, re.S)
    tetelek = []
    for i, b in enumerate(blokkok, 1):
        def mezo(nev):
            m = re.search(r'\b%s:\s*"((?:[^"\\]|\\.)*)"' % nev, b)
            return m.group(1) if m else ""
        rang = re.search(r'rang:\s*(-?\d+)', b)
        tetelek.append({
            "sorszam": i,
            "fajl": mezo("fajl"),
            "rang": int(rang.group(1)) if rang else 0,
            "cim": mezo("cim"), "cim_en": mezo("cim_en"),
            "leiras": mezo("leiras"), "leiras_en": mezo("leiras_en"),
        })
    tetelek.sort(key=lambda t: -t["rang"])
    return tetelek


FEJLEC = """# Szövegtérkép

A főoldal összes szerkeszthető szövege, azonosítóval. Újragenerálás:
`python scripts/szovegterkep.py`

## Hogyan jelezd a módosítást

Elég az azonosító és az új szöveg, egy sorban:

```
R2: 15+ év az adatelemzésben.
H1: Adatelemzés üzleti döntésekhez, működő demókban.
P03c: Ügyfélérték-index
```

Amit tudni érdemes:

- **Csak a magyart írd** — az angolt hozzáigazítom, és megmutatom, mit írtam.
  Ha az angolt is te adod meg, tedd `en` utótaggal külön sorba: `R2en: …`
- A **`P` a csempéké**: `P03c` a harmadik csempe címe, `P03l` a leírása.
  A sorszám a mostani sorrend szerinti — ez a lapon látható sorrend.
- **Törléshez** írd azt, hogy `R6: TÖRLÉS`.
- A **vastagítás** a szövegben `<strong>így</strong>` marad; ha nem írsz
  ilyet, a mostani kiemeléseket próbálom megtartani ugyanazokon a szavakon.

"""


def ir():
    tetelek = index_szovegek()
    csempek = csempe_szovegek()

    sorok = [FEJLEC]
    elozo = None
    for t in tetelek:
        if t["szekcio"] != elozo:
            sorok.append("\n## %s\n" % t["szekcio"])
            elozo = t["szekcio"]
        sorok.append("**%s**  \n%s  \n<sub>EN: %s</sub>\n" % (t["id"], t["hu"], t["en"]))

    sorok.append("\n## CSEMPÉK (projects.js)\n")
    for c in csempek:
        p = "P%02d" % c["sorszam"]
        sorok.append("**%sc** · `%s` · rang %d  \n%s  \n<sub>EN: %s</sub>\n"
                     % (p, c["fajl"], c["rang"], c["cim"], c["cim_en"]))
        sorok.append("**%sl**  \n%s  \n<sub>EN: %s</sub>\n"
                     % (p, c["leiras"], c["leiras_en"]))

    io.open(KIMENET, "w", encoding="utf-8").write("\n".join(sorok))
    print("SZOVEGEK.md kesz: %d statikus szoveg + %d csempe (%d tetel)"
          % (len(tetelek), len(csempek), len(tetelek) + 2 * len(csempek)))


if __name__ == "__main__":
    ir()
