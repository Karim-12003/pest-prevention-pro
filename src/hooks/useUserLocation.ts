
import { useState, useEffect } from 'react';
import { getCity } from '@/utils/locationDetection';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        setLoading(true);
        setCity(null);
        
        const detectedCity = await getCity();
        setCity(detectedCity);
      } catch (error) {
        console.error("Standortermittlung fehlgeschlagen:", error);
        setError(error instanceof Error ? error : new Error('Unbekannter Fehler bei der Standortermittlung'));
        setCity('NRW');
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  return { city, loading, error };
};
