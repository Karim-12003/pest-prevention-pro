// ─── Modern City Detection System ───────────────────────────────────────────

// URL der Mapping-Tabelle
const MAPPING_URL = "/geoIdToCity_vollstaendig_nrw.json";

interface CityMapping {
  [cityName: string]: string[];
}

let cityMapping: CityMapping = {};
let idToCity: Record<string, string> = {}; // Hilfs-Mapping für schnelle ID → Stadt-Suche

// Lade das Mapping einmalig
async function loadCityMapping(): Promise<void> {
  if (Object.keys(cityMapping).length > 0) return;
  
  try {
    console.log('[ModernCityDetection] Loading city mapping from:', MAPPING_URL);
    const response = await fetch(MAPPING_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    cityMapping = await response.json();
    console.log('[ModernCityDetection] City mapping loaded successfully:', Object.keys(cityMapping).length, 'cities');
    
    // Hilfsmapping erstellen: ID → Stadt für schnelle Rückwärts-Suche
    idToCity = {};
    for (const [stadt, ids] of Object.entries(cityMapping)) {
      ids.forEach(id => {
        idToCity[id] = stadt;
      });
    }
    
    console.log('[ModernCityDetection] ID mapping created:', Object.keys(idToCity).length, 'IDs');
  } catch (error) {
    console.error('[ModernCityDetection] Failed to load city mapping:', error);
    throw error;
  }
}

// Lese einen URL-Parameter aus
function getParam(name: string): string | null {
  return new URLSearchParams(window.location.search).get(name);
}

// Debug-Funktion: Alle URL-Parameter ausgeben
function debugAllParams(): void {
  const urlParams = new URLSearchParams(window.location.search);
  console.log('[ModernCityDetection] === ALL URL PARAMETERS ===');
  console.log('[ModernCityDetection] Full URL:', window.location.href);
  
  for (const [key, value] of urlParams.entries()) {
    console.log(`[ModernCityDetection] Parameter: ${key} = ${value}`);
  }
  
  if (urlParams.size === 0) {
    console.log('[ModernCityDetection] No URL parameters found');
  }
  console.log('[ModernCityDetection] === END PARAMETERS ===');
}

// Prüft ob ein Parameter-Wert ein Platzhalter ist
function isPlaceholder(value: string | null): boolean {
  if (!value) return true;
  return value.includes('{') || value.includes('}');
}

// Core-Funktion zur Stadterkennung
export async function detectCity(): Promise<string> {
  console.log('[ModernCityDetection] Starting city detection...');
  
  // Debug: Alle Parameter ausgeben
  debugAllParams();
  
  try {
    await loadCityMapping();
  } catch (error) {
    console.error('[ModernCityDetection] Failed to load mapping, using fallback');
    return "Ihrer Stadt";
  }
  
  const kwParam = getParam('kw');
  
  // Haupt-Location-Parameter prüfen (Priorität: loc > loc_physical_ms)
  let locId = getParam('loc');
  console.log('[ModernCityDetection] Checking primary loc parameter:', locId);
  
  if (!locId || isPlaceholder(locId)) {
    console.log('[ModernCityDetection] Primary loc parameter empty or placeholder, checking loc_physical_ms...');
    locId = getParam('loc_physical_ms');
    console.log('[ModernCityDetection] loc_physical_ms parameter:', locId);
  }
  
  // *** WICHTIG: Prüfen ob der Location-Parameter ein Platzhalter ist ***
  if (isPlaceholder(locId)) {
    console.log('[ModernCityDetection] WARNUNG: Location-Parameter enthält Platzhalter:', locId);
    console.log('[ModernCityDetection] Google Ads hat den Parameter nicht ersetzt!');
    locId = null; // Als ungültig behandeln
  }
  
  // Alternative Parameter-Namen prüfen falls beide Haupt-Parameter leer sind
  if (!locId) {
    console.log('[ModernCityDetection] Haupt-Location-Parameter sind leer oder Platzhalter, prüfe Alternativen...');
    
    // Verschiedene mögliche Parameter-Namen testen (ohne loc und loc_physical_ms, da bereits geprüft)
    const alternativeParams = [
      'city_id',
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
      if (!isPlaceholder(value)) {
        console.log(`[ModernCityDetection] Alternative Parameter gefunden: ${paramName} = ${value}`);
        locId = value;
        break;
      }
    }
  }
  
  let city: string | null = null;

  // 1) Keyword-Pfad: Suche Stadt im 'kw' oder 'city' Parameter
  if (kwParam) {
    const decoded = decodeURIComponent(kwParam);
    console.log('[ModernCityDetection] Checking keyword:', decoded);

    // Direkte Suche in den Stadtnamen
    for (const cityName of Object.keys(cityMapping)) {
      if (decoded.toLowerCase().includes(cityName.toLowerCase())) {
        city = cityName;
        console.log('[ModernCityDetection] Found city via keyword match:', city);
        break;
      }
    }
  }

  // 2) Geo-ID Lookup (mit dem gefundenen locId)
  if (!city && locId && idToCity[locId]) {
    city = idToCity[locId];
    console.log('[ModernCityDetection] Found city via Geo-ID:', locId, '→', city);
  } else if (locId) {
    console.log('[ModernCityDetection] Geo-ID not found in mapping:', locId);
  }

  // 3) Optional: Suche Stadt im URL-Pfad
  if (!city) {
    const pathCity = Object.keys(cityMapping).find(
      stadt => window.location.pathname.toLowerCase().includes(stadt.toLowerCase())
    );
    if (pathCity) {
      city = pathCity;
      console.log('[ModernCityDetection] Found city in URL path:', city);
    }
  }

  // 4) Fallback mit detaillierter Problemanalyse
  if (!city) {
    city = 'Ihrer Stadt';
    console.log('[ModernCityDetection] Using fallback:', city);
    
    // Detaillierte Problemanalyse
    const locParam = getParam('loc');
    const locPhysical = getParam('loc_physical_ms');
    const gclid = getParam('gclid');
    
    console.log('[ModernCityDetection] ===== PROBLEMANALYSE =====');
    console.log('[ModernCityDetection] loc:', locParam);
    console.log('[ModernCityDetection] loc_physical_ms:', locPhysical);
    console.log('[ModernCityDetection] gclid:', gclid);
    
    if (isPlaceholder(locParam) || isPlaceholder(locPhysical)) {
      console.log('[ModernCityDetection] HAUPTPROBLEM: Google Ads Parameter wurde nicht ersetzt!');
      console.log('[ModernCityDetection] LÖSUNG: Prüfen Sie Ihre Google Ads Tracking-Template Konfiguration');
    } else if (!locParam && !locPhysical && !kwParam) {
      console.log('[ModernCityDetection] PROBLEM: Keine Stadt-Parameter gefunden');
    }
    console.log('[ModernCityDetection] =========================');
  }

  console.log('[ModernCityDetection] Final result:', city);
  return city;
}

// Funktion zum Aktualisieren aller Platzhalter-Elemente
export function updateCityPlaceholders(city: string): void {
  console.log('[ModernCityDetection] Updating all city placeholders to:', city);
  
  // Alle möglichen Selektoren für Stadt-Platzhalter
  const selectors = [
    '.city-placeholder',
    '.city-welcome', 
    '.cityname',
    '[data-city-placeholder]'
  ];
  
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    console.log(`[ModernCityDetection] Found ${elements.length} elements for selector ${selector}`);
    
    elements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        console.log(`[ModernCityDetection] Updating element ${index + 1}/${elements.length} (${selector}):`, el.textContent, '→', city);
        el.textContent = city;
      }
    });
  });

  // Custom Event für React Integration
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
          console.log('[ModernCityDetection] Force updating delayed element:', el.textContent, '→', city);
          el.textContent = city;
        }
      });
    });
  }, 100);
}

// Initialisierung für Browser-Umgebung
export async function initCityDetection(): Promise<void> {
  const detectAndUpdate = async () => {
    try {
      const city = await detectCity();
      updateCityPlaceholders(city);
    } catch (error) {
      console.error('[ModernCityDetection] Error in detectAndUpdate:', error);
      updateCityPlaceholders('Ihrer Stadt');
    }
  };

  // Aufruf: sofort, nach kurzen Delays und bei SPA-Navigation
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
