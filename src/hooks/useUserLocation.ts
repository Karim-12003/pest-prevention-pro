
import { useState, useEffect } from 'react';
import { getLocationFromUrl } from '@/utils/locationDetection';

export const useUserLocation = () => {
  const [city, setCity] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      
      // Get the city from the URL - basic implementation
      // Note: The actual city setting will be handled by the script in index.html
      const detectedCity = getLocationFromUrl();
      console.log("useUserLocation detected city:", detectedCity);
      
      // Set the city
      setCity(detectedCity);
    } catch (err) {
      console.error("Error detecting location:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
      // On error, we still want to show something
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
