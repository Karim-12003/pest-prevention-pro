
// MaxMind City Detection Utility - Netlify Functions Version
const NETLIFY_ENDPOINT = '/.netlify/functions/detect-city'; // Netlify Function Endpoint

export interface CityDetectionResult {
  city: string;
  success: boolean;
  source: 'maxmind' | 'fallback';
}

/**
 * Detektiert die Stadt über MaxMind IP-Geolocation
 * Verwendet Netlify Functions für sicheren API-Key Zugriff
 */
export async function detectCityViaMaxMind(): Promise<CityDetectionResult> {
  try {
    console.log('[MaxMind] Starting IP-based city detection via Netlify...');
    
    const response = await fetch(NETLIFY_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Netlify Function response: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.city && data.city !== 'Ihrer Stadt') {
      console.log('[MaxMind] Successfully detected city via Netlify:', data.city);
      return {
        city: data.city,
        success: true,
        source: 'maxmind'
      };
    } else {
      console.log('[MaxMind] No city detected via Netlify, using fallback');
      return {
        city: 'Ihrer Stadt',
        success: false,
        source: 'fallback'
      };
    }
  } catch (error) {
    console.error('[MaxMind] Error detecting city via Netlify:', error);
    return {
      city: 'Ihrer Stadt',
      success: false,
      source: 'fallback'
    };
  }
}

/**
 * Validiert ob die erkannte Stadt in unserer NRW-Datenbank existiert
 */
export async function validateNRWCity(cityName: string): Promise<string> {
  try {
    const response = await fetch('/geoIdToCity_vollstaendig_nrw.json');
    const cityMapping = await response.json();
    
    // Direkte Suche
    if (cityMapping[cityName]) {
      return cityName;
    }
    
    // Fuzzy-Suche für ähnliche Stadtnamen
    const cities = Object.keys(cityMapping);
    const normalizedInput = cityName.toLowerCase().trim();
    
    for (const city of cities) {
      if (city.toLowerCase().includes(normalizedInput) || 
          normalizedInput.includes(city.toLowerCase())) {
        console.log(`[MaxMind] Found similar city: ${cityName} → ${city}`);
        return city;
      }
    }
    
    console.log(`[MaxMind] City ${cityName} not found in NRW database, using fallback`);
    return 'Ihrer Stadt';
  } catch (error) {
    console.error('[MaxMind] Error validating NRW city:', error);
    return 'Ihrer Stadt';
  }
}
