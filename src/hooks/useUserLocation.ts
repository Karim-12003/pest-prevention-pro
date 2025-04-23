
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const OPENCAGE_API_KEY = '9404c85230654d5abc450964c2f3e7f1';
const IPINFO_TOKEN = '86bd4c7e187c28';

async function getCityFromIP(): Promise<string> {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
    const data = await response.json();
    return data.city || 'Unbekannt';
  } catch (e) {
    console.error('IP-Geolocation Fehler:', e);
    return 'Unbekannt';
  }
}

async function getCity(): Promise<string> {
  return new Promise((resolve) => {
    // Browser Geolocation API als erste Option
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Reverse Geocoding mit OpenCage
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}&language=de&pretty=1&no_annotations=1`
            );
            
            if (!response.ok) {
              console.error('OpenCage API Fehler:', response.statusText);
              return resolve(await getCityFromIP());
            }

            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              const components = data.results[0].components;
              const city = components.city || 
                          components.town || 
                          components.village || 
                          components.suburb ||
                          components.county;
              
              if (city) {
                return resolve(city);
              }
            }
            
            // Fallback auf IP-basierte Geolokation
            resolve(await getCityFromIP());
          } catch (error) {
            console.error('Reverse Geocoding Fehler:', error);
            resolve(await getCityFromIP());
          }
        },
        async (error) => {
          // Wenn Geolocation verweigert oder fehlgeschlagen
          console.log('Browser Geolocation fehlgeschlagen:', error.message);
          resolve(await getCityFromIP());
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      // Fallback wenn Geolocation nicht unterstützt
      resolve(getCityFromIP());
    }
  });
}

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

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
          toast({
            title: "Standortermittlung fehlgeschlagen",
            description: "Die Standortermittlung konnte nicht durchgeführt werden.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Standortermittlung fehlgeschlagen:", error);
        setError(error instanceof Error ? error : new Error('Unbekannter Fehler bei der Standortermittlung'));
        toast({
          title: "Standortermittlung fehlgeschlagen",
          description: "Die Standortermittlung konnte nicht durchgeführt werden.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    // Sofort beim ersten Laden ausführen
    detectLocation();
    
    // Bei jedem Fokus auf das Fenster erneut ausführen
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        detectLocation();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [toast]);

  return { city, loading, error };
};
