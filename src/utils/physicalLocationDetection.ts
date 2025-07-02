
// Physical Location Detection using Browser Geolocation API
export interface PhysicalLocationResult {
  city: string;
  success: boolean;
  source: 'geolocation' | 'fallback';
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Detects city using browser geolocation API
 * DISABLED: No longer prompts for geolocation to avoid user permission requests
 */
export async function detectCityViaPhysicalLocation(): Promise<PhysicalLocationResult> {
  console.log('[Physical Location] Geolocation detection disabled - using fallback');
  
  // Immediately return fallback without requesting geolocation permission
  return {
    city: 'Ihrer Stadt',
    success: false,
    source: 'fallback',
    confidence: 'low'
  };
}

/**
 * Promise wrapper for navigator.geolocation.getCurrentPosition
 * DISABLED: No longer used to avoid permission prompts
 */
function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    reject(new Error('Geolocation disabled to avoid permission prompts'));
  });
}

/**
 * Simple reverse geocoding using OpenStreetMap Nominatim API
 * DISABLED: No longer used since we don't get coordinates
 */
async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  console.log('[Physical Location] Reverse geocoding disabled');
  return null;
}

/**
 * Validates if the detected city exists in our NRW+Kassel database
 * DISABLED: No longer used since we don't detect cities via geolocation
 */
async function validateCityInDatabase(cityName: string): Promise<string> {
  console.log('[Physical Location] City validation disabled');
  return 'Ihrer Stadt';
}
