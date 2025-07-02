
// Hybrid City Detection - URL Parameter + Physical Location
import { detectCity as detectCityFromURL } from './modernCityDetection';
import { detectCityViaPhysicalLocation } from './physicalLocationDetection';

export interface HybridDetectionResult {
  city: string;
  source: 'url-kw' | 'physical-location' | 'fallback';
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Optimized hybrid city detection with physical location
 * Priority 1: URL kw-Parameter 
 * Priority 2: Physical Location (Browser Geolocation + Reverse Geocoding)
 * Priority 3: Fallback
 */
export async function detectCityHybrid(): Promise<HybridDetectionResult> {
  console.log('[Hybrid] Starting optimized hybrid city detection...');
  
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

  // Priority 2: Physical Location Detection
  try {
    console.log('[Hybrid] URL kw parameter not found, trying physical location detection...');
    const locationResult = await detectCityViaPhysicalLocation();
    if (locationResult.success) {
      console.log('[Hybrid] City detected via physical location:', locationResult.city);
      return {
        city: locationResult.city,
        source: 'physical-location',
        confidence: locationResult.confidence
      };
    }
  } catch (error) {
    console.error('[Hybrid] Physical location detection failed:', error);
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
 * Cached Detection - for performance optimization
 */
let cachedResult: HybridDetectionResult | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function detectCityCached(): Promise<HybridDetectionResult> {
  const now = Date.now();
  
  // Cache check
  if (cachedResult && (now - cacheTimestamp) < CACHE_DURATION) {
    console.log('[Hybrid] Using cached result:', cachedResult.city);
    return cachedResult;
  }
  
  // New detection
  const result = await detectCityHybrid();
  
  // Cache successful detections only
  if (result.source !== 'fallback') {
    cachedResult = result;
    cacheTimestamp = now;
  }
  
  return result;
}
