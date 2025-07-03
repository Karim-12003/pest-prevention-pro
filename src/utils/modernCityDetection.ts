
// Modern City Detection - URL Parameter
const DEFAULT_CITY = "Ihrer Stadt";

export interface CityDetectionResult {
  city: string;
  source: 'url-kw' | 'fallback';
  confidence: 'high' | 'low';
}

// Cache für die erkannte Stadt um mehrfache API-Aufrufe zu vermeiden
let cityCache: string | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5000; // 5 Sekunden Cache

/**
 * Load city database from JSON file
 */
async function loadCityDatabase(): Promise<Record<string, string[]>> {
  try {
    const response = await fetch('/geoIdToCity_vollstaendig_nrw.json');
    if (!response.ok) {
      console.error('[ModernCityDetection] Failed to load city database:', response.status);
      return {};
    }
    const data = await response.json();
    console.log('[ModernCityDetection] City database loaded successfully');
    return data;
  } catch (error) {
    console.error('[ModernCityDetection] Error loading city database:', error);
    return {};
  }
}

/**
 * Find city name by city_id in the database
 */
async function findCityByCityId(cityId: string): Promise<string | null> {
  console.log(`[ModernCityDetection] Looking up city_id: ${cityId}`);
  const database = await loadCityDatabase();
  
  // Debug: Show what we're searching through
  console.log(`[ModernCityDetection] Database has ${Object.keys(database).length} cities`);
  
  for (const [cityName, cityIds] of Object.entries(database)) {
    if (cityIds.includes(cityId)) {
      console.log(`[ModernCityDetection] Found city for ID ${cityId}: ${cityName}`);
      return cityName;
    }
  }
  
  console.log(`[ModernCityDetection] No city found for ID: ${cityId}`);
  return null;
}

/**
 * Extract city name from keyword parameter
 */
async function extractCityFromKeyword(keyword: string): Promise<string | null> {
  const database = await loadCityDatabase();
  const cities = Object.keys(database);
  
  // Normalisiere das Keyword (lowercase, ersetze + durch Leerzeichen)
  const normalizedKeyword = keyword.toLowerCase().replace(/\+/g, ' ');
  console.log(`[ModernCityDetection] Searching for city in keyword: "${normalizedKeyword}"`);
  
  // Suche nach Städten im Keyword
  for (const city of cities) {
    const normalizedCity = city.toLowerCase();
    if (normalizedKeyword.includes(normalizedCity)) {
      console.log(`[ModernCityDetection] Found city "${city}" in keyword "${keyword}"`);
      return city;
    }
  }
  
  console.log(`[ModernCityDetection] No city found in keyword: ${keyword}`);
  return null;
}

/**
 * Checks if the given string is a placeholder
 */
function isPlaceholder(str: string): boolean {
  const lowerStr = str.toLowerCase();
  return lowerStr === 'ihre stadt' || lowerStr === 'ihr ort';
}

/**
 * Validates if the detected city exists in our NRW+Kassel database
 */
async function validateCity(cityName: string): Promise<string> {
  const database = await loadCityDatabase();
  
  if (database && Object.keys(database).length > 0) {
    if (database[cityName]) {
      console.log(`[ModernCityDetection] City "${cityName}" found in database.`);
      return cityName;
    } else {
      console.warn(`[ModernCityDetection] City "${cityName}" not found in database. Using fallback.`);
      return DEFAULT_CITY;
    }
  } else {
    console.error("[ModernCityDetection] City database is empty or could not be loaded. Using fallback.");
    return DEFAULT_CITY;
  }
}

export async function detectCity(): Promise<string> {
  // Prüfe Cache zuerst
  const now = Date.now();
  if (cityCache && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log("[ModernCityDetection] Returning cached city:", cityCache);
    return cityCache;
  }
  
  // Prüfe sessionStorage zuerst für konsistente Ergebnisse
  const storedCity = sessionStorage.getItem('detectedCity');
  if (storedCity && storedCity !== DEFAULT_CITY) {
    console.log("[ModernCityDetection] Using stored city from sessionStorage:", storedCity);
    cityCache = storedCity;
    cacheTimestamp = now;
    return storedCity;
  }
  
  console.log("[ModernCityDetection] Starting city detection...");
  
  try {
    const currentUrl = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Priority 1: Check for city_id parameter
    const cityIdParam = urlParams.get('city_id');
    if (cityIdParam) {
      console.log(`[ModernCityDetection] Found city_id parameter: ${cityIdParam}`);
      const cityFromId = await findCityByCityId(cityIdParam);
      if (cityFromId) {
        console.log(`[ModernCityDetection] Successfully resolved city_id ${cityIdParam} to: ${cityFromId}`);
        // Store in sessionStorage and cache
        sessionStorage.setItem('detectedCity', cityFromId);
        cityCache = cityFromId;
        cacheTimestamp = now;
        return cityFromId;
      } else {
        console.log(`[ModernCityDetection] Could not resolve city_id ${cityIdParam}, trying other methods`);
      }
    }
    
    // Priority 2: Check for kw parameter
    const kwParam = urlParams.get('kw');
    if (kwParam && !isPlaceholder(kwParam)) {
      console.log(`[ModernCityDetection] Found kw parameter: ${kwParam}`);
      
      // Erst prüfen ob es direkt ein Stadtname ist
      const validatedCity = await validateCity(kwParam);
      if (validatedCity !== DEFAULT_CITY) {
        console.log(`[ModernCityDetection] kw parameter is direct city name: ${validatedCity}`);
        sessionStorage.setItem('detectedCity', validatedCity);
        cityCache = validatedCity;
        cacheTimestamp = now;
        return validatedCity;
      }
      
      // Dann versuchen Stadt aus dem Keyword zu extrahieren
      const cityFromKeyword = await extractCityFromKeyword(kwParam);
      if (cityFromKeyword) {
        console.log(`[ModernCityDetection] Extracted city from keyword: ${cityFromKeyword}`);
        sessionStorage.setItem('detectedCity', cityFromKeyword);
        cityCache = cityFromKeyword;
        cacheTimestamp = now;
        return cityFromKeyword;
      }
    } else if (kwParam) {
      console.log("[ModernCityDetection] kw parameter found but is placeholder:", kwParam);
    }

    console.log("[ModernCityDetection] No valid city_id or kw parameter found, using fallback");
  } catch (error) {
    console.error("[ModernCityDetection] Error in city detection:", error);
  }
  
  // Cache the fallback too
  cityCache = DEFAULT_CITY;
  cacheTimestamp = now;
  return DEFAULT_CITY;
}

/**
 * Updates ALL placeholders in the DOM with the detected city - EXACTLY like physicalLocationDetection
 */
export function updateCityPlaceholders(city: string): void {
  console.log(`[ModernCityDetection] Aktualisiere alle Stadt-Elemente mit: ${city}`);
  
  // Warte kurz damit DOM vollständig geladen ist
  setTimeout(() => {
    // city-placeholder Elemente aktualisieren
    const cityPlaceholders = document.querySelectorAll('.city-placeholder');
    console.log(`[ModernCityDetection] ${cityPlaceholders.length} city-placeholder Elemente gefunden`);
    cityPlaceholders.forEach((element, index) => {
      const oldText = element.textContent;
      console.log(`[ModernCityDetection] city-placeholder ${index + 1} vorher: ${oldText}`);
      element.textContent = city;
      console.log(`[ModernCityDetection] city-placeholder ${index + 1} nachher: ${element.textContent}`);
    });

    // city-welcome Elemente aktualisieren  
    const cityWelcomeElements = document.querySelectorAll('.city-welcome');
    console.log(`[ModernCityDetection] ${cityWelcomeElements.length} city-welcome Elemente gefunden`);
    cityWelcomeElements.forEach((element, index) => {
      const oldText = element.textContent;
      console.log(`[ModernCityDetection] city-welcome ${index + 1} vorher: ${oldText}`);
      element.textContent = city;
      console.log(`[ModernCityDetection] city-welcome ${index + 1} nachher: ${element.textContent}`);
    });

    // cityname Elemente aktualisieren
    const citynameElements = document.querySelectorAll('.cityname');
    console.log(`[ModernCityDetection] ${citynameElements.length} cityname Elemente gefunden`);
    citynameElements.forEach((element, index) => {
      const oldText = element.textContent;
      console.log(`[ModernCityDetection] cityname ${index + 1} vorher: ${oldText}`);
      element.textContent = city;
      console.log(`[ModernCityDetection] cityname ${index + 1} nachher: ${element.textContent}`);
    });

    console.log(`[ModernCityDetection] Updated all city placeholders to: ${city}`);
    
    // Trigger ein Custom Event damit React Components reagieren können
    const event = new CustomEvent('cityUpdated', { detail: { city } });
    window.dispatchEvent(event);
  }, 200);
}
