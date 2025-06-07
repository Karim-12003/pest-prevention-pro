
// ─── Hybrid City Detection ──────────────────────────────────────────────────

// 1) Lookup-Tabelle: Geo-ID → Stadtname
const geoIdToCity: Record<string, string> = {
  "1004618": "Ennepetal",
  "1004592": "Bergkamen",
  "1004596": "Bochum",
  "9048825": "Voerde (Niederrhein)",
  "1004610": "Dorsten",
  "9048668": "Raesfeld",
  "1004710": "Oberhausen",
  "1004690": "Lünen",
  "9196810": "Selm",
  "9048269": "Datteln",
  "1004642": "Hamm",
  "1004601": "Bottrop",
  "9048453": "Hünxe",
  "9048374": "Gladbeck",
  "1004631": "Gelsenkirchen",
  "1004762": "Wesel",
  "1004611": "Dortmund",
  "1004652": "Herten",
  "1004702": "Moers",
  "1004641": "Haltern am See",
  "1004706": "Mülheim an der Ruhr",
  "1004612": "Duisburg",
  "1004692": "Marl",
  "1004771": "Xanten",
  "9048844": "Waltrop",
  "9048281": "Dinslaken",
  "1004625": "Essen",
  "9062603": "Schermbeck",
  "1004605": "Castrop-Rauxel",
  "1004651": "Herne",
  "1004768": "Witten",
  "1028816": "Hagen",
  "1004746": "Unna",
  "9048467": "Kamen",
  "1004721": "Recklinghausen",
  "1004731": "Schwerte",
  "9048597": "Neukirchen-Vluyn",
  "9048635": "Oer-Erkenschwick",
  "9048398": "Hamminkeln",
  "9048468": "Kamp-Lintfort",
  "9048256": "Brühl",
  "1004736": "Solingen",
  "1004704": "Monheim am Rhein",
  "1004674": "Korschenbroich",
  "9062605": "Jüchen",
  "1004708": "Neuss",
  "1004747": "Velbert",
  "9048179": "Bad Honnef",
  "9048676": "Rees",
  "1004636": "Grevenbroich",
  "1004615": "Düsseldorf",
  "9048866": "Wesseling",
  "1004700": "Mettmann",
  "1004579": "Alfter",
  "1004619": "Erftstadt",
  "9048240": "Bornheim",
  "1004745": "Troisdorf",
  "1004678": "Langenfeld (Rheinland)",
  "1004722": "Remscheid",
  "1004609": "Dormagen",
  "1004662": "Hürth",
  "1004590": "Bergheim",
  "1004576": "Aachen",
  "1004673": "Kleve",
  "1004719": "Ratingen",
  "9048694": "Rommerskirchen",
  "1004669": "Kerpen",
  "1004695": "Meckenheim",
  "1004682": "Leverkusen",
  "1004616": "Emmerich am Rhein",
  "9048493": "Königswinter",
  "1004675": "Krefeld",
  "1004696": "Meerbusch",
  "1004655": "Hilden",
  "1004666": "Kaarst",
  "1004703": "Mönchengladbach",
  "1004718": "Pulheim",
  "1004628": "Frechen",
  "1004709": "Niederkassel",
  "1004589": "Bedburg",
  "1004733": "Siegburg",
  "1004597": "Bonn",
  "1004738": "Sankt Augustin",
  "1004607": "Köln",
  "1004707": "Münster",
  "1004711": "Oelde",
  "1004617": "Emsdetten",
  "9062602": "Heek",
  "9062599": "Rhede",
  "1004757": "Warendorf",
  "1004578": "Ahlen",
  "9062594": "Südlohn",
  "9210539": "Ostbevern",
  "1004635": "Greven",
  "9048755": "Sendenhorst",
  "1004599": "Borken",
  "1004594": "Billerbeck",
  "9048619": "Nottuln",
  "9062592": "Havixbeck",
  "1004689": "Lüdinghausen",
  "1004577": "Ahaus",
  "9048461": "Isselburg",
  "9048711": "Sassenberg",
  "9048754": "Senden",
  "1004588": "Beckum",
  "1004657": "Hörstel",
  "1004739": "Stadtlohn",
  "1004724": "Rheine",
  "1004712": "Olfen",
  "1004680": "Lengerich",
  "1004752": "Vreden",
  "9048792": "Telgte",
  "1004740": "Steinfurt",
  "1004613": "Dülmen",
  "9062596": "Rosendahl",
  "9214328": "Wadersloh",
  "1004606": "Coesfeld",
  "9048370": "Gescher",
  "9048319": "Ennigerloh",
  "1004663": "Ibbenbüren",
  "9196211": "Ochtrup",
  "9048161": "Ascheberg",
  "1004741": "Steinhagen",
  "1004593": "Bielefeld",
  "9048243": "Brakel",
  "9215569": "Schieder-Schwalenberg",
  "1004728": "Salzkotten",
  "1004602": "Bünde",
  "9048652": "Petershagen",
  "1004679": "Lemgo",
  "1004723": "Rheda-Wiedenbrück",
  "9209090": "Preußisch Oldendorf",
  "9220962": "Altenbeken",
  "9048449": "Hövelhof",
  "1004715": "Paderborn",
  "9193263": "Oerlinghausen",
  "1004624": "Espelkamp",
  "9048318": "Enger",
  "9048724": "Schloß Holte-Stukenbrock",
  "9048448": "Horn-Bad Meinberg",
  "1004687": "Lübbecke",
  "1004608": "Detmold",
  "9189603": "Beverungen",
  "9193298": "Delbrück",
  "1003986": "Lichtenau",
  "9048190": "Bad Salzuflen",
  "1004585": "Bad Oeynhausen",
  "1004598": "Borchen",
  "1004725": "Rietberg",
  "1004717": "Porta Westfalica",
  "1004756": "Warburg",
  "1004639": "Gütersloh",
  "1004748": "Verl",
  "9048402": "Harsewinkel",
  "9048238": "Borgholzhausen",
  "1004650": "Herford",
  "9212883": "Augustdorf",
  "9217662": "Nieheim",
  "9219163": "Extertal",
  "1004701": "Minden",
  "1004659": "Höxter",
  "9048679": "Reichshof",
  "9048510": "Leichlingen (Rheinland)",
  "9048574": "Much",
  "1004729": "Schalksmühle",
  "1004737": "Sprockhövel",
  "1004671": "Kierspe",
  "9048834": "Waldbröl",
  "1004730": "Schwelm",
  "9048151": "Altena",
  "1004604": "Burscheid",
  "9191589": "Bergneustadt",
  "1004727": "Rösrath",
  "1004697": "Meinerzhagen",
  "1004714": "Overath",
  "9048620": "Nümbrecht",
  "1004649": "Herdecke",
  "9197635": "Halver",
  "9048316": "Engelskirchen",
  "1004591": "Bergisch Gladbach",
  "9217576": "Odenthal",
  "9195199": "Marienheide",
  "1004676": "Kürten",
  "1004763": "Wetter (Ruhr)",
  "1004764": "Wiehl",
  "9048521": "Lindlar",
  "1004767": "Wipperfürth",
  "1004705": "Morsbach",
  "9048667": "Radevormwald",
  "1004769": "Wuppertal",
  "1004643": "Hattingen",
  "1004761": "Wermelskirchen",
  "1004661": "Hückeswagen",
  "1004632": "Gevelsberg",
  "1004638": "Gummersbach",
  "9048847": "Warstein",
  "1004583": "Attendorn",
  "9048513": "Lennestadt",
  "1004766": "Winterberg",
  "1004693": "Marsberg",
  "1004629": "Freudenberg",
  "9048371": "Geseke",
  "9048599": "Neunkirchen",
  "1004735": "Soest",
  "9217732": "Erndtebrück",
  "1004584": "Bad Berleburg",
  "1004699": "Meschede",
  "1004698": "Menden (Sauerland)",
  "1004664": "Iserlohn",
  "1004716": "Plettenberg",
  "1004713": "Olpe",
  "9048551": "Medebach",
  "9048697": "Rüthen",
  "9048879": "Wilnsdorf",
  "9048588": "Netphen",
  "1004734": "Siegen",
  "9048249": "Brilon",
  "9117191": "59969",
  "9193919": "Bad Laasphe",
  "9048786": "Sundern (Sauerland)",
  "9048156": "Anröchte",
  "1004582": "Arnsberg",
  "1004603": "Burbach",
  "1004684": "Lippstadt",
  "9048219": "Bestwig",
  "9048342": "Finnentrop",
  "1004688": "Lüdenscheid",
  "9048498": "Kreuztal",
  "9048331": "Eslohe (Sauerland)",
  "9048431": "Hilchenbach",
  "9048727": "Schmallenberg",
  "1004760": "Werl",
};

// 2) Keyword-Liste: alle Städte für Keyword-Matching
const cityKeywords: string[] = [
  "59969",
  "Aachen",
  "Ahaus",
  "Ahlen",
  "Alfter",
  "Altena",
  "Altenbeken",
  "Anröchte",
  "Arnsberg",
  "Ascheberg",
  "Attendorn",
  "Augustdorf",
  "Bad Berleburg",
  "Bad Honnef",
  "Bad Laasphe",
  "Bad Oeynhausen",
  "Bad Salzuflen",
  "Beckum",
  "Bedburg",
  "Bergheim",
  "Bergisch Gladbach",
  "Bergkamen",
  "Bergneustadt",
  "Bestwig",
  "Beverungen",
  "Bielefeld",
  "Billerbeck",
  "Bochum",
  "Bonn",
  "Borchen",
  "Borgholzhausen",
  "Borken",
  "Bornheim",
  "Bottrop",
  "Brakel",
  "Brilon",
  "Brühl",
  "Burbach",
  "Burscheid",
  "Bünde",
  "Castrop-Rauxel",
  "Coesfeld",
  "Datteln",
  "Delbrück",
  "Detmold",
  "Dinslaken",
  "Dormagen",
  "Dorsten",
  "Dortmund",
  "Duisburg",
  "Dülmen",
  "Düsseldorf",
  "Emmerich am Rhein",
  "Emsdetten",
  "Engelskirchen",
  "Enger",
  "Ennepetal",
  "Ennigerloh",
  "Erftstadt",
  "Erndtebrück",
  "Eslohe (Sauerland)",
  "Espelkamp",
  "Essen",
  "Extertal",
  "Finnentrop",
  "Frechen",
  "Freudenberg",
  "Gelsenkirchen",
  "Gescher",
  "Geseke",
  "Gevelsberg",
  "Gladbeck",
  "Greven",
  "Grevenbroich",
  "Gummersbach",
  "Gütersloh",
  "Hagen",
  "Haltern am See",
  "Halver",
  "Hamm",
  "Hamminkeln",
  "Harsewinkel",
  "Hattingen",
  "Havixbeck",
  "Heek",
  "Herdecke",
  "Herford",
  "Herne",
  "Herten",
  "Hilchenbach",
  "Hilden",
  "Horn-Bad Meinberg",
  "Hörstel",
  "Hövelhof",
  "Höxter",
  "Hückeswagen",
  "Hünxe",
  "Hürth",
  "Ibbenbüren",
  "Iserlohn",
  "Isselburg",
  "Jüchen",
  "Kaarst",
  "Kamen",
  "Kamp-Lintfort",
  "Kerpen",
  "Kierspe",
  "Kleve",
  "Korschenbroich",
  "Krefeld",
  "Kreuztal",
  "Köln",
  "Königswinter",
  "Kürten",
  "Langenfeld (Rheinland)",
  "Leichlingen (Rheinland)",
  "Lemgo",
  "Lengerich",
  "Lennestadt",
  "Leverkusen",
  "Lichtenau",
  "Lindlar",
  "Lippstadt",
  "Lübbecke",
  "Lüdenscheid",
  "Lüdinghausen",
  "Lünen",
  "Marienheide",
  "Marl",
  "Marsberg",
  "Medebach",
  "Meerbusch",
  "Meinerzhagen",
  "Menden (Sauerland)",
  "Meschede",
  "Mettmann",
  "Minden",
  "Moers",
  "Monheim am Rhein",
  "Morsbach",
  "Much",
  "Mönchengladbach",
  "Mülheim an der Ruhr",
  "Münster",
  "Netphen",
  "Neukirchen-Vluyn",
  "Neunkirchen",
  "Neuss",
  "Niederkassel",
  "Nieheim",
  "Nottuln",
  "Nümbrecht",
  "Oberhausen",
  "Ochtrup",
  "Odenthal",
  "Oelde",
  "Oer-Erkenschwick",
  "Oerlinghausen",
  "Olfen",
  "Olpe",
  "Ostbevern",
  "Overath",
  "Paderborn",
  "Petershagen",
  "Plettenberg",
  "Porta Westfalica",
  "Preußisch Oldendorf",
  "Pulheim",
  "Radevormwald",
  "Raesfeld",
  "Ratingen",
  "Recklinghausen",
  "Rees",
  "Reichshof",
  "Remscheid",
  "Rheda-Wiedenbrück",
  "Rhede",
  "Rheine",
  "Rietberg",
  "Rommerskirchen",
  "Rosendahl",
  "Rösrath",
  "Rüthen",
  "Salzkotten",
  "Sankt Augustin",
  "Sassenberg",
  "Schalksmühle",
  "Schermbeck",
  "Schieder-Schwalenberg",
  "Schloß Holte-Stukenbrock",
  "Schmallenberg",
  "Schwelm",
  "Schwerte",
  "Selm",
  "Senden",
  "Sendenhorst",
  "Siegburg",
  "Siegen",
  "Soest",
  "Solingen",
  "Sprockhövel",
  "Stadtlohn",
  "Steinfurt",
  "Steinhagen",
  "Sundern (Sauerland)",
  "Südlohn",
  "Telgte",
  "Troisdorf",
  "Unna",
  "Velbert",
  "Verl",
  "Voerde (Niederrhein)",
  "Vreden",
  "Wadersloh",
  "Waldbröl",
  "Waltrop",
  "Warburg",
  "Warendorf",
  "Warstein",
  "Werl",
  "Wermelskirchen",
  "Wesel",
  "Wesseling",
  "Wetter (Ruhr)",
  "Wiehl",
  "Wilnsdorf",
  "Winterberg",
  "Wipperfürth",
  "Witten",
  "Wuppertal",
  "Xanten",
];

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

// Hilfsfunktion: URL-Parameter auslesen
function getParam(name: string): string | null {
  return new URLSearchParams(window.location.search).get(name);
}

// Debug-Funktion: Alle URL-Parameter ausgeben
function debugAllParams(): void {
  const urlParams = new URLSearchParams(window.location.search);
  console.log('[CityDetection] === ALL URL PARAMETERS ===');
  console.log('[CityDetection] Full URL:', window.location.href);
  
  for (const [key, value] of urlParams.entries()) {
    console.log(`[CityDetection] Parameter: ${key} = ${value}`);
  }
  
  if (urlParams.size === 0) {
    console.log('[CityDetection] No URL parameters found');
  }
  console.log('[CityDetection] === END PARAMETERS ===');
}

// Google Ads Kampagnen-ID zu Stadt Mapping (basierend auf Kampagnen-Setup)
function getCityFromCampaignId(campaignId: string): string | null {
  console.log('[CityDetection] Prüfe Kampagnen-ID:', campaignId);
  
  // Hier könnten Sie spezifische Kampagnen-IDs zu Städten zuordnen
  // Beispiel (Sie müssen das an Ihre Kampagnen anpassen):
  const campaignMapping: Record<string, string> = {
    "22474471919": "Düsseldorf", // Beispiel-Zuordnung
    // Fügen Sie hier weitere Kampagnen-ID -> Stadt Zuordnungen hinzu
  };
  
  return campaignMapping[campaignId] || null;
}

// 1) normalizeText: ä→a, ü→u etc., alles lower-case  
function normalizeText(str: string): string {
  return str
    .normalize('NFD')               // Unicode auftrennen
    .replace(/[\u0300-\u036f]/g, '')// Diakritika entfernen
    .toLowerCase();
}

// 2) capitalizeWords: aus "bad oeynhausen" → "Bad Oeynhausen"
function capitalizeWords(str: string): string {
  return str.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// ─── Keyword-Map aufbauen ────────────────────────────────────────────────────

// cityKeywords enthält z.B. ["Düsseldorf","Essen",…] ohne NRW/Deutschland
// wir machen daraus eine Map von normalisiert → original
const keywordMap: Record<string, string> = {};
cityKeywords.forEach(origName => {
  const key = normalizeText(origName);
  keywordMap[key] = origName;  
});

// die Liste der normalisierten Keys für unseren Regex
const normalizedKeys = Object.keys(keywordMap);
const cityRegex = new RegExp('\\b(' + normalizedKeys.join('|') + ')\\b');

// ─── Core-Funktion zur Stadterkennung ───────────────────────────────────────

export function detectCity(): string {
  console.log('[CityDetection] start');
  
  // Debug: Alle Parameter ausgeben
  debugAllParams();
  
  const kwParam = getParam('kw');
  let locId = getParam('loc_physical_ms');
  
  // *** WICHTIG: Prüfen ob loc_physical_ms ein Platzhalter ist ***
  if (locId && (locId.includes('{') || locId.includes('}'))) {
    console.log('[CityDetection] WARNUNG: loc_physical_ms enthält Platzhalter:', locId);
    console.log('[CityDetection] Google Ads hat den Parameter nicht ersetzt!');
    locId = null; // Als ungültig behandeln
  }
  
  // Alternative Parameter-Namen prüfen falls loc_physical_ms leer ist
  if (!locId) {
    console.log('[CityDetection] loc_physical_ms ist leer oder Platzhalter, prüfe Alternativen...');
    
    // Verschiedene mögliche Parameter-Namen testen
    const alternativeParams = [
      'location_target_id',
      'locationtargetid', 
      'loc_id',
      'location_id',
      'target_id',
      'geo_id',
      'location'
    ];
    
    for (const paramName of alternativeParams) {
      const value = getParam(paramName);
      if (value && !value.includes('{') && !value.includes('}')) {
        console.log(`[CityDetection] Alternative Parameter gefunden: ${paramName} = ${value}`);
        locId = value;
        break;
      }
    }
  }
  
  let city: string | null = null;

  // 1) Keyword-Pfad
  if (kwParam) {
    const decoded = decodeURIComponent(kwParam);
    const normKw  = normalizeText(decoded);
    console.log('[CityDetection] normalized kw:', normKw);

    const m = normKw.match(cityRegex);
    if (m) {
      // hier holen wir uns aus der Map wieder den Original-Namen
      city = keywordMap[m[1]];
      console.log('[CityDetection] via keyword:', city);
    } else {
      console.log('[CityDetection] kein Keyword-Match für:', normKw);
    }
  }

  // 2) Geo-ID
  if (!city && locId && geoIdToCity[locId]) {
    city = geoIdToCity[locId];
    console.log('[CityDetection] via Geo-ID:', locId, '→', city);
  } else if (locId) {
    console.log('[CityDetection] Geo-ID nicht in Mapping gefunden:', locId);
  }

  // 3) NEUE Fallback-Strategie: Google Ads Kampagnen-ID verwenden
  if (!city) {
    const campaignId = getParam('gad_campaignid');
    if (campaignId) {
      const cityFromCampaign = getCityFromCampaignId(campaignId);
      if (cityFromCampaign) {
        city = cityFromCampaign;
        console.log('[CityDetection] via Kampagnen-ID:', campaignId, '→', city);
      }
    }
  }

  // 4) Fallback mit detaillierter Problemanalyse
  if (!city) {
    city = 'Ihrer Stadt';
    console.log('[CityDetection] fallback:', city);
    
    // Detaillierte Problemanalyse
    const locPhysical = getParam('loc_physical_ms');
    const campaignId = getParam('gad_campaignid');
    const gclid = getParam('gclid');
    
    console.log('[CityDetection] ===== PROBLEMANALYSE =====');
    console.log('[CityDetection] loc_physical_ms:', locPhysical);
    console.log('[CityDetection] gad_campaignid:', campaignId);
    console.log('[CityDetection] gclid:', gclid);
    
    if (locPhysical && (locPhysical.includes('{') || locPhysical.includes('}'))) {
      console.log('[CityDetection] HAUPTPROBLEM: Google Ads Parameter wurde nicht ersetzt!');
      console.log('[CityDetection] LÖSUNG: Prüfen Sie Ihre Google Ads Tracking-Template Konfiguration');
    } else if (!locPhysical && !kwParam) {
      console.log('[CityDetection] PROBLEM: Keine Stadt-Parameter gefunden');
    }
    console.log('[CityDetection] =========================');
  }

  return city;
}

// Funktion zum Aktualisieren aller Platzhalter-Elemente - verbessert
export function updateCityPlaceholders(city: string): void {
  console.log('[CityDetection] Updating all city placeholders to:', city);
  
  // Alle möglichen Selektoren für Stadt-Platzhalter
  const selectors = [
    '.city-placeholder',
    '.city-welcome', 
    '.cityname',
    '[data-city-placeholder]'
  ];
  
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    console.log(`[CityDetection] Found ${elements.length} elements for selector ${selector}`);
    
    elements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        console.log(`[CityDetection] Updating element ${index + 1}/${elements.length} (${selector}):`, el.textContent, '→', city);
        el.textContent = city;
      }
    });
  });

  // Zusätzlich: React State Events für bessere Integration
  const customEvent = new CustomEvent('cityDetected', { 
    detail: { city },
    bubbles: true 
  });
  document.dispatchEvent(customEvent);
  
  // Force update nach kurzer Verzögerung für dynamisch geladene Elemente
  setTimeout(() => {
    selectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (el instanceof HTMLElement && el.textContent !== city) {
          console.log('[CityDetection] Force updating delayed element:', el.textContent, '→', city);
          el.textContent = city;
        }
      });
    });
  }, 100);
}

// Initialisierung für Browser-Umgebung
export function initCityDetection(): void {
  const detectAndUpdate = () => {
    const city = detectCity();
    updateCityPlaceholders(city);
  };

  // 5) Aufruf: sofort, nach kurzen Delays und bei SPA-Navigation
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener("DOMContentLoaded", () => {
        detectAndUpdate();
        setTimeout(detectAndUpdate, 500);
        setTimeout(detectAndUpdate, 1500);
      });
    } else {
      detectAndUpdate();
      setTimeout(detectAndUpdate, 500);
      setTimeout(detectAndUpdate, 1500);
    }

    window.addEventListener("popstate", () => setTimeout(detectAndUpdate, 300));
  }
}

// Auto-Initialisierung wenn im Browser
if (typeof window !== 'undefined') {
  initCityDetection();
}
