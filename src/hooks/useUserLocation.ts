
import { useState, useEffect } from 'react';
import { getLocationFromUrl } from '@/utils/locationDetection';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const detectLocation = () => {
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
    };

    detectLocation();
  }, []); // Remove dependency on window.location.href to prevent rerendering loops

  return { city: city || 'NRW', loading, error };
};
