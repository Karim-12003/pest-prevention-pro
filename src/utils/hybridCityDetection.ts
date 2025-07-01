
// Simplified Hybrid City Detection - nur kw Parameter + MaxMind IP
import { detectCity as detectCityFromURL } from './modernCityDetection';
import { detectCityViaMaxMind, validateNRWCity } from './maxmindCityDetection';

export interface HybridDetectionResult {
  city: string;
  source: 'url-kw' | 'ip-geolocation' | 'fallback';
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Vereinfachte hybride Stadt-Erkennung mit maximaler Performance
 * Priority 1: URL kw-Parameter 
 * Priority 2: IP-Geolocation (MaxMind)
 * Priority 3: Fallback
 */
export async function detectCityHybrid(): Promise<HybridDetectionResult> {
  console.log('[Hybrid] Starting simplified hybrid city detection...');
  
  // Priority 1: URL kw-Parameter Detection
  try {
    const urlCity = await detectCityFromURL();
    if (urlCity && urlCity !== 'Ihrer Stadt') {
      console.log('[Hybrid] City detected from URL kw parameter:', urlCity);
      return {
        city: urlCity,
        source: 'url-kw',
        confidence: 'high'
      };
    }
  } catch (error) {
    console.error('[Hybrid] URL kw detection failed:', error);
  }

  // Priority 2: IP-Geolocation via MaxMind
  try {
    console.log('[Hybrid] URL kw parameter not found, trying MaxMind IP geolocation...');
    const maxmindResult = await detectCityViaMaxMind();
    if (maxmindResult.success) {
      // Validiere gegen NRW-Datenbank
      const validatedCity = await validateNRWCity(maxmindResult.city);
      if (validatedCity !== 'Ihrer Stadt') {
        console.log('[Hybrid] City detected via IP-Geolocation:', validatedCity);
        return {
          city: validatedCity,
          source: 'ip-geolocation',
          confidence: 'medium'
        };
      }
    }
  } catch (error) {
    console.error('[Hybrid] MaxMind detection failed:', error);
  }

  // Priority 3: Fallback
  console.log('[Hybrid] Using fallback city');
  return {
    city: 'Ihrer Stadt',
    source: 'fallback',
    confidence: 'low'
  };
}

/**
 * Cached Detection - für Performance-Optimierung
 */
let cachedResult: HybridDetectionResult | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 Minuten

export async function detectCityCached(): Promise<HybridDetectionResult> {
  const now = Date.now();
  
  // Cache-Check
  if (cachedResult && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('[Hybrid] Using cached result:', cachedResult.city);
    return cachedResult;
  }
  
  // Neue Erkennung
  const result = await detectCityHybrid();
  
  // Cache nur erfolgreiche Erkennungen
  if (result.source !== 'fallback') {
    cachedResult = result;
    cacheTimestamp = now;
  }
  
  return result;
}
