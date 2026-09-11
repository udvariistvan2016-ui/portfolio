/* ============================================================
   PROJEKTEK — ez az EGYETLEN fájl, amit szerkesztened kell.

   Új demó felrakása:
     1. Tedd be a kész HTML fájlt a  demos/  mappába.
     2. Másolj le egy blokkot alább, és írd át.
     3. Mentés, feltöltés (commit) — kész.

   Mezők:
     cim      – a csempe címe
     leiras   – 1-2 mondat, mi ez (ez látszik a csempén)
     cim_en   – a csempe címe angolul (ha hiányzik, a magyar látszik)
     leiras_en – a leírás angolul
     fajl     – a demó fájl neve a demos/ mappában
     cimkek   – technológia-címkék + pontosan egy Munka/Magán
     tipus    – interaktív tool / interaktív demó / folyamatábra /
                adatvizualizáció / esettanulmány / helykitöltő
     rang     – SORREND. Nagyobb szám = előrébb. Azonos rang esetén
                a dátum dönt (újabb elöl). Ha elhagyod, 0.
                Ez a szerkesztői kontroll: ezzel teszed előre azt,
                amit elsőnek akarsz mutatni egy állásinterjún.
     datum    – "2026-08" formában
     kiemelt  – true esetén DUPLA SZÉLES csempe (a sorrendre nincs
                hatása). Egyszerre max 1-2 legyen bekapcsolva.
============================================================ */

/* Angol feliratok a szűrőhöz és a csempék címkéihez.
   A bal oldal a belső érték — a magyar címke / típus, amit a projekteknél
   írsz. Ha a CLAUDE.md szótárába új címke kerül, ide is vedd fel az angol
   megfelelőjét. Ami kimarad, az magyarul jelenik meg — nem törik el semmi.
   A nyelvsemleges címkék (SQL, Python, CRM, n8n…) ide sem kellenek. */
const CIMKE_EN = {
  "Szegmentáció":       "Segmentation",
  "Vizualizáció":       "Visualisation",
  "Automatizálás":      "Automation",
  "ETL / Adatpipeline": "ETL / Data pipeline",
  "A/B teszt":          "A/B testing",
  "Munka":              "Work",
  "Magán":              "Personal"
};

const TIPUS_EN = {
  "interaktív tool":  "interactive tool",
  "interaktív demó":  "interactive demo",
  "folyamatábra":     "flow diagram",
  "adatvizualizáció": "data visualisation",
  "esettanulmány":    "case study",
  "helykitöltő":      "placeholder"
};

const PROJEKTEK = [

  {
    cim: "Hűségprogram-dashboard szállodaláncnak",
    leiras: "Szintetikus adatokon futó, szűrhető hűségprogram-elemzés: tagszintek, szegmensek, országok, szállodánkénti bontás. Minden név és érték fiktív.",
    cim_en: "Loyalty programme dashboard for a hotel chain",
    leiras_en: "A filterable loyalty programme analysis on synthetic data: membership tiers, segments, countries and a breakdown by hotel. All names and values are fictional.",
    fajl: "hotel-demo-loyalty-dashboard.html",
    cimkek: ["CRM", "Szegmentáció", "Vizualizáció", "Munka"],
    tipus: "interaktív demó",
    rang: 100,
    datum: "2026-08",
    kiemelt: false
  },

  {
    cim: "E-mail kampány benchmark riport",
    leiras: "73 kampány teljesítménye egy közös viszonyítási alaphoz mérve: tölcsér a kiküldéstől a beváltásig, szűrhető szegmensbontás, súlyozott és átlagolt számítás.",
    cim_en: "E-mail campaign benchmark report",
    leiras_en: "The performance of 73 campaigns measured against a common baseline: a funnel from send to redemption, a filterable segment breakdown, weighted and averaged calculation.",
    fajl: "email-kampany-benchmark.html",
    cimkek: ["SQL", "Vizualizáció", "CRM", "Munka"],
    tipus: "esettanulmány",
    rang: 95,
    datum: "2026-08",
    kiemelt: true
  },

  {
    cim: "Engagement Colours — szegmens-mátrix",
    leiras: "Havi vásárlói besorolás a rendelések és az appmegnyitások mátrixán, mátrix- és treemap-nézetben, éves KPI-célkövetéssel. Fiktív adatokon.",
    cim_en: "Engagement Colours — segment matrix",
    leiras_en: "Monthly customer classification on an orders × app opens matrix, in matrix and treemap views, with annual KPI target tracking. On fictional data.",
    fajl: "engagement-colours-szegmentacio.html",
    cimkek: ["Szegmentáció", "Vizualizáció", "CRM", "Munka"],
    tipus: "interaktív demó",
    rang: 88,
    datum: "2026-09",
    kiemelt: false
  },

  {
    cim: "POI-adatbázis → HubSpot szinkron (Python)",
    leiras: "CSV-exportok beolvasása, tisztítása, deduplikálása és összefésülése CRM-be tölthető kimenetté, futásnaplóval és ellenőrző riportokkal.",
    cim_en: "POI database → HubSpot sync (Python)",
    leiras_en: "Reading, cleaning, deduplicating and merging CSV exports into CRM-ready output, with a run log and validation reports.",
    fajl: "poi-crm-hubspot-python.html",
    cimkek: ["Python", "ETL / Adatpipeline", "CRM", "Munka"],
    tipus: "interaktív demó",
    rang: 90,
    datum: "2026-08",
    kiemelt: false
  },

  {
    cim: "Ugyanez n8n workflow-ként",
    leiras: "A szinkron folyamat vizuális pipeline-ként: node-gráf, ágak, ellenőrző mellékszálak és merge-lépések végigkövethetően.",
    cim_en: "The same as an n8n workflow",
    leiras_en: "The sync process as a visual pipeline: node graph, branches, validation side paths and merge steps you can follow end to end.",
    fajl: "poi-crm-hubspot-n8n.html",
    cimkek: ["n8n", "Automatizálás", "CRM", "Munka"],
    tipus: "folyamatábra",
    rang: 85,
    datum: "2026-08",
    kiemelt: false
  },

  {
    cim: "Magyar nyelvű audio transcription pipeline",
    leiras: "Lokálisan, GPU nélkül futó átirat-készítő faster-whisper alapon, LLM-es utótisztítással. Felhős szolgáltatáshoz mérve, nulla felhőköltséggel.",
    cim_en: "Hungarian speech-to-text pipeline",
    leiras_en: "A local, GPU-free transcription tool built on faster-whisper, with LLM post-correction. Benchmarked against a cloud service, at zero cloud cost.",
    fajl: "transcription-pipeline.html",
    cimkek: ["Python", "AI / LLM", "Automatizálás", "Magán"],
    tipus: "esettanulmány",
    rang: 80,
    datum: "2026-06",
    kiemelt: false
  },

  {
    cim: "Számla-tracker: e-mailből táblázatba",
    leiras: "Két postafiókból gyűjti a számlákat, a PDF-mellékleteket rendezetten elmenti, az adatokat kinyeri és táblázatba írja. Szintetikus mintaadatokkal.",
    cim_en: "Invoice tracker: from e-mail to spreadsheet",
    leiras_en: "Collects invoices from two mailboxes, files the PDF attachments, extracts the data and writes it into a spreadsheet. With synthetic sample data.",
    fajl: "szamla-tracker-pipeline.html",
    cimkek: ["Automatizálás", "Claude", "ETL / Adatpipeline", "Magán"],
    tipus: "interaktív demó",
    rang: 60,
    datum: "2026-07",
    kiemelt: false
  },

  {
    cim: "Laboreredmények gyógyulási íve",
    leiras: "Két időpont leletei egymásra vetítve a referencia-tartományokkal: mi változott, milyen irányba, és mit jelent. Interaktív magyarázatokkal.",
    cim_en: "Lab results: a recovery curve",
    leiras_en: "Lab results from two dates overlaid on the reference ranges: what changed, in which direction, and what it means. With interactive explanations.",
    fajl: "laboreredmeny-vizualizacio.html",
    cimkek: ["Vizualizáció", "Magán"],
    tipus: "adatvizualizáció",
    rang: 50,
    datum: "2026-06",
    kiemelt: false
  },

  {
    cim: "Opera Koktélrepertoár",
    leiras: "Bejelölöd, mi van otthon a polcon, és megmutatja, melyik koktélt tudod most azonnal elkeverni — és melyikhez hiányzik egyetlen hozzávaló.",
    cim_en: "Opera Cocktail Repertoire",
    leiras_en: "Tick what is on your shelf at home, and it shows which cocktails you can mix right now — and which are missing just one ingredient.",
    fajl: "opera-koktelrepertoar.html",
    cimkek: ["Claude", "Vizualizáció", "Tool", "Magán"],
    tipus: "interaktív tool",
    rang: 40,
    datum: "2026-08",
    kiemelt: false
  },

  {
    cim: "Sörkalauz",
    leiras: "Sörstílusok az SRM-színskála szerint szűrve, a főzés nyolc lépése, és egy extrakt→alkohol számoló csúszkákkal.",
    cim_en: "Beer Guide",
    leiras_en: "Beer styles filtered by the SRM colour scale, the eight steps of brewing, and an extract → alcohol calculator with sliders.",
    fajl: "sorkalauz.html",
    cimkek: ["Claude", "Vizualizáció", "Tool", "Magán"],
    tipus: "interaktív tool",
    rang: 40,
    datum: "2026-08",
    kiemelt: false
  },

  {
    cim: "Ügyfélszegmentáció K-means klaszterezéssel",
    leiras: "Végigvezetett módszertan a feature-öktől a klaszterszám melletti döntésig: hét viselkedési mutató gördülő 12 hónapos ablakon, öt metrika, GMM-ellenőrzés és havi stabilitás. Kétnyelvű, szintetikus adatokon.",
    cim_en: "Customer segmentation with K-means clustering",
    leiras_en: "A walk-through of the methodology from features to the choice of cluster count: seven behavioural features on a rolling 12-month window, five metrics, a GMM cross-check and month-over-month stability. Bilingual, on synthetic data.",
    fajl: "kmeans-szegmentacio.html",
    cimkek: ["Python", "ML / Data Science", "Szegmentáció", "Munka"],
    tipus: "esettanulmány",
    rang: 92,
    datum: "2026-09",
    kiemelt: true
  },

  {
    cim: "Conversational Analytics SQL adatbázison",
    leiras: "Természetes nyelvű lekérdezés éles adatbázison Claude + MCP kapcsolaton keresztül. Pilot koncepció és architektúra.",
    cim_en: "Conversational analytics on an SQL database",
    leiras_en: "Natural-language querying of a live database via Claude + MCP. Pilot concept and architecture.",
    fajl: "conversational-analytics.html",
    cimkek: ["Claude", "SQL", "Power BI", "Munka"],
    tipus: "helykitöltő",
    rang: -10,
    datum: "2026-04",
    kiemelt: false
  }

];
