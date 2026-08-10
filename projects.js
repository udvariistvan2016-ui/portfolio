/* ============================================================
   PROJEKTEK — ez az EGYETLEN fájl, amit szerkesztened kell.

   Új demó felrakása:
     1. Tedd be a kész HTML fájlt a  demos/  mappába.
     2. Másolj le egy blokkot alább, és írd át.
     3. Mentés, feltöltés (commit) — kész.

   Mezők:
     cim      – a csempe címe
     leiras   – 1-2 mondat, mi ez (ez látszik a csempén)
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

const PROJEKTEK = [

  {
    cim: "Hűségprogram-dashboard szállodaláncnak",
    leiras: "Szintetikus adatokon futó, szűrhető hűségprogram-elemzés: tagszintek, szegmensek, országok, szállodánkénti bontás. Minden név és érték fiktív.",
    fajl: "hotel-demo-loyalty-dashboard.html",
    cimkek: ["CRM", "Szegmentáció", "Vizualizáció", "Munka"],
    tipus: "interaktív demó",
    rang: 100,
    datum: "2026-08",
    kiemelt: true
  },

  {
    cim: "POI-adatbázis → HubSpot szinkron (Python)",
    leiras: "CSV-exportok beolvasása, tisztítása, deduplikálása és összefésülése CRM-be tölthető kimenetté, futásnaplóval és ellenőrző riportokkal.",
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
    fajl: "transcription-pipeline.html",
    cimkek: ["Python", "AI / LLM", "Automatizálás", "Magán"],
    tipus: "esettanulmány",
    rang: 80,
    datum: "2026-06",
    kiemelt: true
  },

  {
    cim: "Számla-tracker: e-mailből táblázatba",
    leiras: "Két postafiókból gyűjti a számlákat, a PDF-mellékleteket rendezetten elmenti, az adatokat kinyeri és táblázatba írja. Szintetikus mintaadatokkal.",
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
    fajl: "sorkalauz.html",
    cimkek: ["Claude", "Vizualizáció", "Tool", "Magán"],
    tipus: "interaktív tool",
    rang: 40,
    datum: "2026-08",
    kiemelt: false
  },

  {
    cim: "Ügyfélszegmentáció K-means klaszterezéssel",
    leiras: "Viselkedés-alapú klaszterek gördülő 12 hónapos ablakon, banki hűségprogram adatain. Anonimizált esettanulmány.",
    fajl: "kmeans-szegmentacio.html",
    cimkek: ["Python", "ML / Data Science", "CRM", "Munka"],
    tipus: "helykitöltő",
    rang: -10,
    datum: "2026-05",
    kiemelt: false
  },

  {
    cim: "Conversational Analytics SQL adatbázison",
    leiras: "Természetes nyelvű lekérdezés éles adatbázison Claude + MCP kapcsolaton keresztül. Pilot koncepció és architektúra.",
    fajl: "conversational-analytics.html",
    cimkek: ["Claude", "SQL", "Power BI", "Munka"],
    tipus: "helykitöltő",
    rang: -10,
    datum: "2026-04",
    kiemelt: false
  }

];
