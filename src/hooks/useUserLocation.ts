
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getLocationFromUrl } from '@/utils/locationDetection';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>('NRW');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Use our improved location detection function
      const detectedCity = getLocationFromUrl();
      setCity(detectedCity);
    } catch (err) {
      console.error("Error detecting location:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      setCity('NRW'); // Fallback to default
    }
  }, [window.location.href]); // Re-run when URL changes

  return { city, loading, error };
};
