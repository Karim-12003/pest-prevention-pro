
import { useState, useEffect } from 'react';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        setLoading(true);
        
        // Method 1: Use Geolocation API + reverse geocoding
        if (navigator.geolocation) {
          try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
              });
            });
            
            const { latitude, longitude } = position.coords;
            console.log("Geolocation coordinates:", latitude, longitude);
            
            // Use reverse geocoding with OpenCage Data API
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=e4bf4a8f1fe94c5bb6d8e47fc67dfc5c&language=de&pretty=1`);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              const components = data.results[0].components;
              const detectedCity = components.city || components.town || components.village || components.county;
              
              if (detectedCity) {
                console.log("Location detected from coordinates:", detectedCity);
                setCity(detectedCity);
                setLoading(false);
                return;
              }
            }
          } catch (geoError) {
            console.error("Geolocation error:", geoError);
            // Continue to other methods if geolocation fails
          }
        }

        // Method 2: Use IP Geolocation API
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
        
        // Method 3: Alternative IP geolocation service
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
