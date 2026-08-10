# -*- coding: utf-8 -*-
"""
projects.js  ->  Google Sheet nyilvántartás

Egyirányú szinkron: a szkript CSAK a saját oszlopait írja, minden máshoz
hozzá sem nyúl. A "Jegyzetek, lehetőségek" sor alatt semmit nem módosít.

Kulcs: a  fájlnév  oszlop. Ha egy sorban még nincs fájlnév, a szkript a
NEV_TERKEP alapján párosít (egyszeri, a meglévő soroknak), majd beírja a
fájlnevet — onnantól az a horgony.

HASZNÁLAT
    python scripts/sheet-sync.py            # próbafutás, NEM ír semmit
    python scripts/sheet-sync.py --apply    # tényleges írás

ELŐFELTÉTELEK
    pip install gspread google-auth json5

    1. Google Cloud projekt -> Sheets API + Drive API bekapcsolva
    2. Service account létrehozása, JSON kulcs letöltése
    3. A kulcsot ide tedd:  scripts/sa-kulcs.json   (a .gitignore kizárja)
    4. A Sheetet oszd meg a service account e-mail címével, SZERKESZTŐKÉNT
       (a kulcsfájlban a "client_email" mező)
    5. scripts/sheet-config.json:   {"sheet_id": "...", "munkalap": "Munka1"}
"""

import sys, json, pathlib, re

try:
    import json5, gspread
    from google.oauth2.service_account import Credentials
except ImportError as e:
    sys.exit(f"Hiányzó csomag: {e.name}\n  pip install gspread google-auth json5")

GYOKER  = pathlib.Path(__file__).resolve().parent.parent
KULCS   = GYOKER / "scripts" / "sa-kulcs.json"
CONFIG  = GYOKER / "scripts" / "sheet-config.json"
PROJEKT = GYOKER / "projects.js"
DEMOS   = GYOKER / "demos"

# A szkript ezeket az oszlopokat írja. Minden más oszlop a tiéd.
SAJAT_OSZLOPOK = [
    "fájlnév", "technológia", "típus", "kategória",
    "dátum", "kiemelt", "weboldalra felrakva", "csempe szövege",
]
# Ezt csak akkor írja, ha ÜRES — a te megjegyzésedet nem üti felül.
CSAK_HA_URES = ["anonimizálás"]

# A "Jegyzetek, lehetőségek" sortól lefelé semmihez nem nyúlunk.
HATAR_SOR = "jegyzetek"

# Kategória-címkék: ezek a kategória-oszlopba mennek.
KATEGORIAK = {"Munka", "Magán"}
# Ezek sem technológiák: a típus-oszlop már hordozza őket.
NEM_TECH = {"Tool"}

# Egyszeri párosítás a meglévő sorokhoz, ahol még nincs fájlnév.
NEV_TERKEP = {
    "hotellánc":                "hotel-demo-loyalty-dashboard.html",
    "bb365 n8n":                "poi-crm-hubspot-n8n.html",
    "bb365 python":             "poi-crm-hubspot-python.html",
    "georgia":                  "laboreredmeny-vizualizacio.html",
    "gyógytorna transcript":    "transcription-pipeline.html",
    "privát számlafeldolgozó":  "szamla-tracker-pipeline.html",
    "opera gin":                "opera-koktelrepertoar.html",
    "sörkalauz":                "sorkalauz.html",
}


def projektek_beolvas():
    """A projects.js tömbjét adja vissza. Nem valid JSON (idézőjel nélküli
    kulcsok), ezért json5-tel olvassuk."""
    sz = PROJEKT.read_text(encoding="utf-8")
    m = re.search(r'const\s+PROJEKTEK\s*=\s*(\[.*?\]);', sz, re.S)
    if not m:
        sys.exit("Nem találom a PROJEKTEK tömböt a projects.js-ben.")
    return json5.loads(m.group(1))


def szetbont(cimkek):
    """A címketömböt technológiára és kategóriára bontja."""
    tech = [c for c in cimkek if c not in KATEGORIAK and c not in NEM_TECH]
    kat  = [c for c in cimkek if c in KATEGORIAK]
    return ", ".join(tech), (kat[0] if kat else "")


def sorok_ertekei(p):
    tech, kat = szetbont(p.get("cimkek", []))
    fajl = p.get("fajl", "")
    return {
        "fájlnév":             fajl,
        "technológia":         tech,
        "típus":               p.get("tipus", ""),
        "kategória":           kat,
        "dátum":               p.get("datum", ""),
        "kiemelt":             "igen" if p.get("kiemelt") else "nem",
        "weboldalra felrakva": "igen" if (DEMOS / fajl).exists() else "nem",
        "csempe szövege":      p.get("leiras", ""),
    }


def main():
    ir = "--apply" in sys.argv
    if not CONFIG.exists():
        sys.exit(f"Hiányzik: {CONFIG}\n  {{\"sheet_id\": \"...\", \"munkalap\": \"Munka1\"}}")
    if not KULCS.exists():
        sys.exit(f"Hiányzik a service account kulcs: {KULCS}")

    cfg = json.loads(CONFIG.read_text(encoding="utf-8"))
    hitel = Credentials.from_service_account_file(
        str(KULCS),
        scopes=["https://www.googleapis.com/auth/spreadsheets"],
    )
    lap = gspread.authorize(hitel).open_by_key(cfg["sheet_id"]) \
                 .worksheet(cfg.get("munkalap", "Munka1"))

    racs = lap.get_all_values()
    if not racs:
        sys.exit("A munkalap üres.")

    # fejlécsor: az, amelyikben szerepel a "Portfolio oldalra"
    fejlec_idx = next(
        (i for i, s in enumerate(racs)
         if any("portfolio oldalra" in c.strip().lower() for c in s)), None)
    if fejlec_idx is None:
        sys.exit("Nem találom a fejlécsort (\"Portfolio oldalra\").")
    fejlec = [c.strip() for c in racs[fejlec_idx]]

    # határ: a "Jegyzetek..." sor
    hatar = next((i for i, s in enumerate(racs)
                  if s and HATAR_SOR in s[0].strip().lower()), len(racs))
    print(f"fejléc: {fejlec_idx+1}. sor · határ: {hatar+1}. sor "
          f"(alatta {len(racs)-hatar} sorhoz nem nyúlok)")

    # hiányzó oszlopok a fejléc végére
    uj_oszlopok = [o for o in SAJAT_OSZLOPOK + CSAK_HA_URES if o not in fejlec]
    if uj_oszlopok:
        print(f"\nÚJ OSZLOP a fejléc végére: {', '.join(uj_oszlopok)}")
        fejlec += uj_oszlopok

    oszlop = {nev: i for i, nev in enumerate(fejlec)}
    projektek = {p["fajl"]: p for p in projektek_beolvas()}
    print(f"projects.js: {len(projektek)} projekt\n")

    valtozasok = []   # (sor_index, oszlop_index, regi, uj, projekt)
    parositva  = set()

    for sor_i in range(fejlec_idx + 1, hatar):
        sor = racs[sor_i] + [""] * (len(fejlec) - len(racs[sor_i]))
        nev = sor[0].strip()
        if not nev:
            continue

        fajl = sor[oszlop["fájlnév"]].strip() if "fájlnév" in oszlop else ""
        if not fajl:
            fajl = NEV_TERKEP.get(nev.lower(), "")
        if not fajl or fajl not in projektek:
            continue

        parositva.add(fajl)
        ertekek = sorok_ertekei(projektek[fajl])

        for o_nev, uj_ert in ertekek.items():
            regi = sor[oszlop[o_nev]].strip()
            if regi != uj_ert:
                valtozasok.append((sor_i, oszlop[o_nev], regi, uj_ert, nev))

        for o_nev in CSAK_HA_URES:
            if not sor[oszlop[o_nev]].strip():
                pass   # az anonimizálás-státuszt kézzel töltöm, itt nem generálom

    # ami a projects.js-ben van, de a Sheetben nincs
    hianyzo = [f for f in projektek if f not in parositva]

    print("=== TERVEZETT VÁLTOZÁSOK ===")
    if not valtozasok:
        print("  nincs — a Sheet naprakész")
    for sor_i, o_i, regi, uj, nev in valtozasok:
        r = f'"{regi}"' if regi else "(üres)"
        print(f"  {sor_i+1}. sor [{nev}] · {fejlec[o_i]}: {r} -> \"{uj}\"")

    if hianyzo:
        print("\n=== ÚJ SOR KELL (a projects.js-ben van, a Sheetben nincs) ===")
        for f in hianyzo:
            print(f"  {projektek[f]['cim']}  ({f})")

    if not ir:
        print("\n[PRÓBAFUTÁS] Semmit nem írtam. Éles futtatás: --apply")
        return

    # --- írás ---
    if uj_oszlopok:
        lap.update(f"{gspread.utils.rowcol_to_a1(fejlec_idx+1, 1)}:"
                   f"{gspread.utils.rowcol_to_a1(fejlec_idx+1, len(fejlec))}",
                   [fejlec])

    cellak = []
    for sor_i, o_i, _, uj, _ in valtozasok:
        c = gspread.Cell(sor_i + 1, o_i + 1, uj)
        cellak.append(c)
    if cellak:
        lap.update_cells(cellak, value_input_option="USER_ENTERED")

    for f in hianyzo:
        e = sorok_ertekei(projektek[f])
        uj_sor = [""] * len(fejlec)
        uj_sor[0] = projektek[f]["cim"]
        for o_nev, ert in e.items():
            uj_sor[oszlop[o_nev]] = ert
        lap.insert_row(uj_sor, hatar + 1)
        hatar += 1

    print(f"\nKÉSZ: {len(cellak)} cella frissítve, {len(hianyzo)} új sor.")


if __name__ == "__main__":
    main()
