
// ─── Simplified City Detection System ───────────────────────────────────────────

// URL der Mapping-Tabelle
const MAPPING_URL = "/geoIdToCity_vollstaendig_nrw.json";

interface CityMapping {
  [cityName: string]: string[];
}

let cityMapping: CityMapping = {};

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

// Vereinfachte Core-Funktion zur Stadterkennung
export async function detectCity(): Promise<string> {
  console.log('[ModernCityDetection] Starting simplified city detection...');
  
  // Debug: Alle Parameter ausgeben
  debugAllParams();
  
  try {
    await loadCityMapping();
  } catch (error) {
    console.error('[ModernCityDetection] Failed to load mapping, using fallback');
    return "Ihrer Stadt";
  }
  
  const kwParam = getParam('kw');
  let city: string | null = null;

  // Priorität 1: Keyword-Parameter Suche
  if (kwParam && !isPlaceholder(kwParam)) {
    const decoded = decodeURIComponent(kwParam);
    console.log('[ModernCityDetection] Checking keyword parameter:', decoded);

    // Direkte Suche in den Stadtnamen
    for (const cityName of Object.keys(cityMapping)) {
      if (decoded.toLowerCase().includes(cityName.toLowerCase())) {
        city = cityName;
        console.log('[ModernCityDetection] Found city via keyword match:', city);
        break;
      }
    }
  } else {
    console.log('[ModernCityDetection] No valid kw parameter found or parameter is placeholder');
  }

  // Fallback falls keine Stadt gefunden
  if (!city) {
    city = 'Ihrer Stadt';
    console.log('[ModernCityDetection] No city found in URL parameters, using fallback:', city);
    
    // Detaillierte Problemanalyse
    const kwValue = getParam('kw');
    const gclid = getParam('gclid');
    
    console.log('[ModernCityDetection] ===== PROBLEMANALYSE =====');
    console.log('[ModernCityDetection] kw parameter:', kwValue);
    console.log('[ModernCityDetection] gclid:', gclid);
    
    if (isPlaceholder(kwValue)) {
      console.log('[ModernCityDetection] PROBLEM: kw Parameter ist ein Platzhalter!');
      console.log('[ModernCityDetection] LÖSUNG: Prüfen Sie Ihre Google Ads Tracking-Template Konfiguration');
    } else if (!kwValue) {
      console.log('[ModernCityDetection] PROBLEM: Kein kw Parameter gefunden');
      console.log('[ModernCityDetection] INFO: MaxMind IP-Geolocation wird als Fallback verwendet');
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
