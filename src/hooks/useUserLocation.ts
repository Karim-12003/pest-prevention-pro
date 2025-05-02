
import { useState, useEffect } from 'react';
import { getLocationFromUrl } from '@/utils/locationDetection';

export const useUserLocation = () => {
  // Initialize with empty string to avoid briefly showing "Ihrer Stadt" before actual value
  const [city, setCity] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      
      // Holen Sie die Stadt aus der URL - einfache Implementierung
      const detectedCity = getLocationFromUrl();
      console.log("useUserLocation detected city:", detectedCity);
      
      // Stadt einstellen
      setCity(detectedCity);
      
      // Auch alle .city-placeholder Elemente aktualisieren, falls sie bereits existieren
      // Dies stellt sicher, dass unsere React-Komponente mit dem Script in index.html zusammenarbeitet
      const placeholders = document.querySelectorAll('.city-placeholder');
      if (placeholders.length > 0) {
        console.log(`Updating ${placeholders.length} existing city placeholders to: ${detectedCity}`);
        placeholders.forEach(el => {
          el.textContent = detectedCity;
        });
      }
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
