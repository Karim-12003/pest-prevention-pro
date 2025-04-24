
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
        
        if (detectedCity && detectedCity !== 'Unbekannt') {
          setCity(detectedCity);
        } else {
          setCity(null);
          // Fehlerbenachrichtigung entfernt
          console.log('Keine Stadt erkannt, aber keine Benachrichtigung anzeigen');
        }
      } catch (error) {
        console.error("Standortermittlung fehlgeschlagen:", error);
        setError(error instanceof Error ? error : new Error('Unbekannter Fehler bei der Standortermittlung'));
        // Fehlerbenachrichtigung entfernt
      } finally {
        setLoading(false);
      }
    };

    // Bei erstem Laden ausführen
    detectLocation();
    
    // Bei Window Focus erneut ausführen
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        detectLocation();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return { city, loading, error };
};
