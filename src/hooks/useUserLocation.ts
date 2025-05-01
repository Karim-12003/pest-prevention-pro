
import { useState, useEffect } from 'react';
import { getLocationFromUrl } from '@/utils/locationDetection';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      // Use our improved location detection function
      const detectedCity = getLocationFromUrl();
      console.log("useUserLocation detected city:", detectedCity);
      setCity(detectedCity);
    } catch (err) {
      console.error("Error detecting location:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setCity('NRW'); // Fallback to default
    } finally {
      setLoading(false);
    }
  }, [window.location.href]); // Re-run when URL changes

  // If we haven't loaded yet, return a default to prevent UI flicker
  if (loading && !city) {
    return { city: 'NRW', loading, error };
  }

  return { city: city || 'NRW', loading, error };
};
