/* ============================================================
   MAGYARÁZÓ VIDEÓK — ez az EGYETLEN fájl, amit szerkesztened kell,
   ha új videó kerül fel vagy egy meglévő felkerül a YouTube-ra.

   Új videó felvétele:
     1. Plakátkép a kész mp4-ből (a projekt gyökeréből futtatva):
          ffmpeg -ss 50 -i video.mp4 -frames:v 1 \
                 -vf "scale=800:450:flags=lanczos" -q:v 4 \
                 assets/videok/<slug>.jpg
        A -ss a másodperc: olyan pillanatot válassz, ahol már a
        tartalom látszik, ne a címkép.
     2. Másolj le egy blokkot alább, és írd át.
     3. Mentés, commit — kész.

   Mezők:
     cim       – a videó címe
     leiras    – 1-2 mondat: mire ad választ
     cim_en    – a cím angolul (ha hiányzik, a magyar látszik)
     leiras_en – a leírás angolul
     slug      – a plakátkép neve: assets/videok/<slug>.jpg
     youtube   – a YouTube-azonosító (a ?v= utáni rész). AMÍG ÜRES,
                 a kártya nem játszható: „hamarosan” felirat látszik
                 a lejátszógomb helyett. Ez a tudatos állapot, amíg
                 a feltöltés meg nem történt.
     hossz     – "4:06" formában, csak kijelzésre
     temak     – egy vagy több témakör a TEMAK listából. Ez a szűrő.
     datum     – "2026-10" formában
     allapot   – "kesz" vagy "keszul". A „keszul” kártyán nincs
                 plakátkép, csak a téma és egy készül-jelzés.
     kapcsolodo – OPCIONÁLIS: { cim, cim_en, url } — ha a videóhoz
                 tartozik egy demó a portfólión, a kártya alján
                 megjelenik egy link rá.
============================================================ */

/* A témakörök sorrendje = a szűrő gombjainak sorrendje.
   Ha új témakört veszel fel, az angol feliratát is add meg. */
const TEMAK = [
  "Adat és statisztika",
  "Gépi tanulás",
  "Matematika",
  "Természettudomány",
  "A műhely"
];

const TEMA_EN = {
  "Adat és statisztika": "Data and statistics",
  "Gépi tanulás":        "Machine learning",
  "Matematika":          "Mathematics",
  "Természettudomány":   "Natural science",
  "A műhely":            "The workshop"
};

const VIDEOK = [

  {
    cim: "A 3b1b-stílus — és hogyan készül",
    leiras: "Mitől működik egy magyarázó animáció, és hogyan áll össze: hat elv, aztán a gyakorlat — Manim-jelenetek, narráció, szinkron.",
    cim_en: "The 3b1b style — and how it is made",
    leiras_en: "What makes an explanatory animation work, and how one is actually built: six principles, then the practice — Manim scenes, narration, synchronisation.",
    slug: "3b1b-stilus-es-keszites",
    youtube: "",
    hossz: "5:23",
    temak: ["A műhely"],
    datum: "2026-10",
    allapot: "kesz"
  },

  {
    cim: "A hűségprogram jéghegye",
    leiras: "A tagok nagy része soha nem vált be semmit. Mit mutat az aktivitás szintenként, és mit kezdjünk a víz alatti résszel?",
    cim_en: "The loyalty programme iceberg",
    leiras_en: "Most members never redeem anything. What does activity by tier actually show, and what do you do with the part below the waterline?",
    slug: "husegprogram-jeghegye",
    youtube: "",
    hossz: "4:06",
    temak: ["Adat és statisztika"],
    datum: "2026-10",
    allapot: "kesz",
    kapcsolodo: {
      cim: "Hűségprogram-dashboard szállodaláncnak",
      cim_en: "Loyalty programme dashboard for a hotel chain",
      url: "demos/hotel-demo-loyalty-dashboard.html"
    }
  },

  {
    cim: "Amikor az adatbázis megszólal",
    leiras: "Három tipp, három szám — ugyanarra a kérdésre. Miért nem elég az LLM-nek az adatbázis, és mi az, ami hiányzik: a definíció.",
    cim_en: "When the database learns to answer",
    leiras_en: "Three guesses, three numbers — for the same question. Why a database alone is not enough for an LLM, and what is missing: the definition.",
    slug: "beszelgetesalapu-adatelemzes",
    youtube: "",
    hossz: "3:07",
    temak: ["Adat és statisztika"],
    datum: "2026-10",
    allapot: "kesz",
    kapcsolodo: {
      cim: "Beszélgetésalapú adatelemzés SQL adatbázison",
      cim_en: "Conversational analytics on an SQL database",
      url: "demos/conversational-analytics.html"
    }
  },

  {
    cim: "Döntési fák",
    leiras: "Hogyan dönt egy szálloda, kinek küldjön ajánlatot? Egy kérdés a másik után — és a fa megmutatja, hol vágjunk.",
    cim_en: "Decision trees",
    leiras_en: "How does a hotel decide who gets an offer? One question after another — and the tree shows where to cut.",
    slug: "dontesi-fak",
    youtube: "",
    hossz: "3:44",
    temak: ["Gépi tanulás"],
    datum: "2026-10",
    allapot: "kesz"
  },

  {
    cim: "Neurális hálók",
    leiras: "Miért nem elég egymás után rakni a lineáris lépéseket, és mit csinál valójában az aktivációs függvény?",
    cim_en: "Neural networks",
    leiras_en: "Why stacking linear steps gets you nowhere, and what the activation function actually does.",
    slug: "neuralis-halok",
    youtube: "",
    hossz: "3:54",
    temak: ["Gépi tanulás"],
    datum: "2026-10",
    allapot: "kesz"
  },

  {
    cim: "A legkisebb négyzetek módszere",
    leiras: "Van egy pontfelhő, és keressük a legjobb egyenest. Miért a négyzetek, és miért nem elég, hogy a hibák összege nulla?",
    cim_en: "The method of least squares",
    leiras_en: "A cloud of points and the search for the best line. Why squares, and why is it not enough that the errors sum to zero?",
    slug: "legkisebb-negyzetek",
    youtube: "",
    hossz: "3:44",
    temak: ["Adat és statisztika"],
    datum: "2026-10",
    allapot: "kesz"
  },

  {
    cim: "A másodfokú megoldóképlet",
    leiras: "Mínusz bé, plusz-mínusz gyök alatt… — a képlet, amit mindenki bemagolt. Honnan jön, és miért pont így néz ki?",
    cim_en: "The quadratic formula",
    leiras_en: "Minus b, plus or minus the square root of… — the formula everyone memorised. Where does it come from, and why does it look like that?",
    slug: "masodfoku-megoldokeplet",
    youtube: "",
    hossz: "3:24",
    temak: ["Matematika"],
    datum: "2026-10",
    allapot: "kesz"
  },

  {
    cim: "A Haversine-módszer",
    leiras: "Két koordináta között mekkora a távolság egy gömbön? És mire jó ez, ha ugyanazt a boltot kétszer találod meg az adatbázisban?",
    cim_en: "The Haversine formula",
    leiras_en: "How far apart are two coordinates on a sphere? And why does it matter when the same shop turns up twice in your database?",
    slug: "haversine",
    youtube: "",
    hossz: "4:10",
    temak: ["Matematika"],
    datum: "2026-10",
    allapot: "kesz"
  },

  {
    cim: "Idődilatáció — a Hail Mary nyomán",
    leiras: "Ha majdnem fénysebességgel utazol, miért telik lassabban az idő? Newton szerint nem így lenne — és pont ez a baj.",
    cim_en: "Time dilation — after Project Hail Mary",
    leiras_en: "If you travel at nearly the speed of light, why does time pass more slowly? According to Newton it would not — and that is exactly the problem.",
    slug: "hail-mary-idodilatacio",
    youtube: "",
    hossz: "4:27",
    temak: ["Természettudomány"],
    datum: "2026-10",
    allapot: "kesz"
  },

  {
    cim: "Mi történik a kovászban?",
    leiras: "A liszt enzimjei, a mikrobák tápláléka, a hőmérséklet szerepe — egy folyamat, ami napokig tart, négy és fél percben.",
    cim_en: "What happens inside a sourdough starter?",
    leiras_en: "The enzymes in the flour, what the microbes actually eat, the role of temperature — a process that takes days, in four and a half minutes.",
    slug: "mi-tortenik-a-kovaszban",
    youtube: "",
    hossz: "4:42",
    temak: ["Természettudomány"],
    datum: "2026-10",
    allapot: "kesz"
  },

  {
    cim: "A Simpson-paradoxon",
    leiras: "Amikor minden csoportban A nyer, összesítve mégis B. Nem hiba, nem trükk — és pontosan ezért veszélyes.",
    cim_en: "Simpson's paradox",
    leiras_en: "When A wins in every group but B wins overall. Not an error, not a trick — and that is exactly why it is dangerous.",
    slug: "simpson-paradoxon",
    youtube: "",
    hossz: "",
    temak: ["Adat és statisztika"],
    datum: "2026-10",
    allapot: "keszul"
  },

  {
    cim: "Átlag vagy medián?",
    leiras: "Ugyanaz az adat, két szám, két különböző történet. Melyiket mikor szabad használni — és mikor hazudik az átlag?",
    cim_en: "Mean or median?",
    leiras_en: "The same data, two numbers, two different stories. Which to use when — and when does the mean lie?",
    slug: "atlag-vagy-median",
    youtube: "",
    hossz: "",
    temak: ["Adat és statisztika"],
    datum: "2026-10",
    allapot: "keszul"
  },

  {
    cim: "Idődilatáció — közérthetően",
    leiras: "Ugyanaz a téma, képletek nélkül: mi történik az idővel, ha nagyon gyorsan mozogsz.",
    cim_en: "Time dilation — the plain-language version",
    leiras_en: "The same topic without the formulas: what happens to time when you move very fast.",
    slug: "hail-mary-kozerthetoen",
    youtube: "",
    hossz: "",
    temak: ["Természettudomány"],
    datum: "2026-10",
    allapot: "keszul"
  }

];
