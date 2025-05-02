
import { useState, useEffect } from 'react';
import { getLocationFromUrl } from '@/utils/locationDetection';

export const useUserLocation = () => {
  const [city, setCity] = useState<string>('Ihrer Stadt');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      
      // Holen Sie die Stadt aus der URL - einfache Implementierung
      // Die tatsächliche Stadteinstellung wird durch das Script in index.html behandelt
      const detectedCity = getLocationFromUrl();
      console.log("useUserLocation detected city:", detectedCity);
      
      // Stadt einstellen
      setCity(detectedCity);
    } catch (err) {
      console.error("Error detecting location:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // Bei einem Fehler wollen wir trotzdem etwas anzeigen
      setCity('Ihrer Stadt');
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    city, 
    loading, 
    error 
  };
};
