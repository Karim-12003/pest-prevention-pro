
// Physical Location Detection using Browser Geolocation API
export interface PhysicalLocationResult {
  city: string;
  success: boolean;
  source: 'geolocation' | 'fallback';
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Detects city using browser geolocation API
 * Uses coordinates to find matching GeoIDs in our database
 */
export async function detectCityViaPhysicalLocation(): Promise<PhysicalLocationResult> {
  try {
    console.log('[Physical Location] Starting browser geolocation detection...');
    
    // Check if geolocation is supported
    if (!navigator.geolocation) {
      console.log('[Physical Location] Geolocation not supported by browser');
      return {
        city: 'Ihrer Stadt',
        success: false,
        source: 'fallback',
        confidence: 'low'
      };
    }

    // Get current position with timeout
    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    
    console.log('[Physical Location] Got coordinates:', { latitude, longitude });

    // Find matching city using reverse geocoding
    const cityName = await reverseGeocode(latitude, longitude);
    
    if (cityName && cityName !== 'Ihrer Stadt') {
      // Validate against our NRW database
      const validatedCity = await validateCityInDatabase(cityName);
      
      if (validatedCity !== 'Ihrer Stadt') {
        console.log('[Physical Location] Successfully detected city:', validatedCity);
        return {
          city: validatedCity,
          success: true,
          source: 'geolocation',
          confidence: 'high'
        };
      }
    }

    console.log('[Physical Location] No valid city found, using fallback');
    return {
      city: 'Ihrer Stadt',
      success: false,
      source: 'fallback',
      confidence: 'low'
    };

  } catch (error) {
    console.error('[Physical Location] Error detecting location:', error);
    return {
      city: 'Ihrer Stadt',
      success: false,
      source: 'fallback',
      confidence: 'low'
    };
  }
}

/**
 * Promise wrapper for navigator.geolocation.getCurrentPosition
 */
function getCurrentPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds timeout
      maximumAge: 300000 // 5 minutes cache
    };

    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      options
    );
  });
}

/**
 * Simple reverse geocoding using OpenStreetMap Nominatim API
 * Free service without API key requirement
 */
async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'KammerjaegerSchneider/1.0'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract city name from various possible fields
    const cityName = data.address?.city || 
                     data.address?.town || 
                     data.address?.village || 
                     data.address?.municipality ||
                     null;

    console.log('[Physical Location] Reverse geocoding result:', {
      cityName,
      country: data.address?.country,
      state: data.address?.state
    });

    return cityName;
  } catch (error) {
    console.error('[Physical Location] Reverse geocoding failed:', error);
    return null;
  }
}

/**
 * Validates if the detected city exists in our NRW+Kassel database
 */
async function validateCityInDatabase(cityName: string): Promise<string> {
  try {
    const response = await fetch('/geoIdToCity_vollstaendig_nrw.json');
    const cityDatabase = await response.json();
    
    // Direct match
    if (cityDatabase[cityName]) {
      return cityName;
    }
    
    // Fuzzy matching for similar city names
    const cities = Object.keys(cityDatabase);
    const normalizedInput = cityName.toLowerCase().trim();
    
    for (const city of cities) {
      const normalizedCity = city.toLowerCase();
      
      // Exact match after normalization
      if (normalizedCity === normalizedInput) {
        console.log(`[Physical Location] Found exact match: ${cityName} → ${city}`);
        return city;
      }
      
      // Partial matches
      if (normalizedCity.includes(normalizedInput) || 
          normalizedInput.includes(normalizedCity)) {
        console.log(`[Physical Location] Found partial match: ${cityName} → ${city}`);
        return city;
      }
    }
    
    console.log(`[Physical Location] City ${cityName} not found in database`);
    return 'Ihrer Stadt';
  } catch (error) {
    console.error('[Physical Location] Error validating city:', error);
    return 'Ihrer Stadt';
  }
}
