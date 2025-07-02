// Modern City Detection - URL Parameter
const DEFAULT_CITY = "Ihrer Stadt";

export interface CityDetectionResult {
  city: string;
  source: 'url-kw' | 'fallback';
  confidence: 'high' | 'low';
}

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
  const database = await loadCityDatabase();
  
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
  console.log("[ModernCityDetection] Starting simplified city detection...");
  
  try {
    // Get current URL
    const currentUrl = window.location.href;
    console.log("[ModernCityDetection] === ALL URL PARAMETERS ===");
    console.log("[ModernCityDetection] Full URL:", currentUrl);
    
    const urlParams = new URLSearchParams(window.location.search);
    
    // Log all parameters for debugging
    for (const [key, value] of urlParams.entries()) {
      console.log(`[ModernCityDetection] Parameter: ${key} = ${value}`);
    }
    console.log("[ModernCityDetection] === END PARAMETERS ===");
    
    // Priority 1: Check for city_id parameter (new)
    const cityIdParam = urlParams.get('city_id');
    if (cityIdParam) {
      console.log(`[ModernCityDetection] Found city_id parameter: ${cityIdParam}`);
      const cityFromId = await findCityByCityId(cityIdParam);
      if (cityFromId) {
        console.log(`[ModernCityDetection] Successfully resolved city_id ${cityIdParam} to: ${cityFromId}`);
        return cityFromId;
      }
    }
    
    // Priority 2: Check for kw parameter (existing logic)
    const kwParam = urlParams.get('kw');
    if (kwParam && !isPlaceholder(kwParam)) {
      console.log(`[ModernCityDetection] Found kw parameter: ${kwParam}`);
      const validatedCity = validateCity(kwParam);
      console.log(`[ModernCityDetection] Validated city from kw: ${validatedCity}`);
      return validatedCity;
    } else if (kwParam) {
      console.log("[ModernCityDetection] kw parameter found but is placeholder:", kwParam);
    }

    console.log("[ModernCityDetection] No valid city_id or kw parameter found or parameter is placeholder");
    
    // Problem Analysis
    console.log("[ModernCityDetection] Current URL:", currentUrl);
    console.log("[ModernCityDetection] URL Parameters:", urlParams.toString());
    console.log("[ModernCityDetection] No city detected, using fallback.");
  } catch (error) {
    console.error("[ModernCityDetection] Error in city detection:", error);
  }
  
  return DEFAULT_CITY;
}

/**
 * Updates all placeholders in the DOM with the detected city
 */
export function updateCityPlaceholders(city: string): void {
  const elements = document.querySelectorAll('.city-placeholder, .city-welcome');
  elements.forEach(element => {
    element.textContent = city;
  });
  console.log(`[ModernCityDetection] Updated ${elements.length} city placeholders to: ${city}`);
}
