
import { useState, useEffect } from 'react';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        setLoading(true);
        
        // Method 1: Use IP Geolocation API
        try {
          const ipResponse = await fetch('https://ipapi.co/json/');
          const ipData = await ipResponse.json();
          
          if (ipData && ipData.city) {
            console.log("Location detected from IP:", ipData.city);
            setCity(ipData.city);
            setLoading(false);
            return;
          }
        } catch (ipError) {
          console.error("IP Geolocation error:", ipError);
          // Continue to fallback if IP geolocation fails
        }
        
        // Method 2: Alternative IP geolocation service
        try {
          const geoResponse = await fetch('https://geolocation-db.com/json/');
          const geoData = await geoResponse.json();
          
          if (geoData && geoData.city && geoData.city !== "Not found") {
            console.log("Location detected from alt source:", geoData.city);
            setCity(geoData.city);
            setLoading(false);
            return;
          }
        } catch (altGeoError) {
          console.error("Alternative Geolocation error:", altGeoError);
        }
        
        // If we get here, all methods failed
        setCity(null);
        setLoading(false);
      } catch (error) {
        console.error("Location detection error:", error);
        setError(error instanceof Error ? error : new Error('Unknown error occurred'));
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

  return { city, loading, error };
};
