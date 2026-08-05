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
     cimkek   – tetszőleges számú címke; ezekből épül a szűrő
     datum    – "2026-08" formában, a sorrendhez (újabb elöl)
     kiemelt  – true esetén nagyobb csempét kap (max 1-2 legyen)
============================================================ */

const PROJEKTEK = [

  {
    cim: "Magyar nyelvű audio transcription pipeline",
    leiras: "Lokálisan futó, GPU-gyorsított átirat-készítő faster-whisper alapon. Beszélő-felismerés, időbélyegek, batch feldolgozás.",
    fajl: "transcription-pipeline.html",
    cimkek: ["Python", "AI / LLM", "Automatizálás"],
    datum: "2026-07",
    kiemelt: true
  },

  {
    cim: "Ügyfélszegmentáció K-means klaszterezéssel",
    leiras: "Viselkedés-alapú klaszterek gördülő 12 hónapos ablakon, banki hűségprogram adatain. Anonimizált esettanulmány.",
    fajl: "kmeans-szegmentacio.html",
    cimkek: ["Python", "ML / Data Science", "CRM"],
    datum: "2026-06",
    kiemelt: false
  },

  {
    cim: "Conversational Analytics SQL adatbázison",
    leiras: "Természetes nyelvű lekérdezés éles adatbázison Claude + MCP kapcsolaton keresztül. Pilot koncepció és architektúra.",
    fajl: "conversational-analytics.html",
    cimkek: ["AI / LLM", "SQL", "Power BI"],
    datum: "2026-05",
    kiemelt: false
  }

];
