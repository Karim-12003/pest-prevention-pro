
import { useState, useEffect } from 'react';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        setLoading(true);
        setCity(null); // Reset city bei jedem Aufruf
        
        // Versuche zuerst die Browser-Geolocation API
        if (navigator.geolocation) {
          try {
            // Browser-Geolocation verwenden
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                resolve, 
                reject, 
                {
                  enableHighAccuracy: true, // Höchste Genauigkeit anfordern
                  timeout: 5000, // Timeout auf 5 Sekunden setzen
                  maximumAge: 0 // Kein Caching, immer aktuelle Position
                }
              );
            });
            
            const { latitude, longitude } = position.coords;
            console.log("GPS-Koordinaten:", latitude, longitude);
            
            // Aktualisierter API-Key für OpenCage
            const apiKey = "d5540c95e6a9483fa33633b4bd474c48"; // Neuer API-Key
            const timestamp = new Date().getTime(); // Cache-Busting
            const response = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&language=de&pretty=1&no_annotations=1&t=${timestamp}`
            );
            
            if (!response.ok) {
              throw new Error(`OpenCage API error: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              const components = data.results[0].components;
              const detectedCity = components.city || components.town || components.village || components.county || components.state;
              
              if (detectedCity) {
                console.log("Stadt aus GPS ermittelt:", detectedCity);
                setCity(detectedCity);
                setLoading(false);
                return;
              }
            }
          } catch (geoError) {
            console.error("GPS-Ermittlungsfehler:", geoError);
            // Weiter zu anderen Methoden, wenn GPS fehlschlägt
          }
        }

        // Als Fallback: IP-Geolocation (ipapi.co)
        try {
          const timestamp = new Date().getTime(); // Cache-Busting
          const ipResponse = await fetch(`https://ipapi.co/json/?t=${timestamp}`);
          
          if (!ipResponse.ok) {
            throw new Error(`IP API error: ${ipResponse.status}`);
          }
          
          const ipData = await ipResponse.json();
          
          if (ipData && ipData.city) {
            console.log("Stadt aus IP ermittelt:", ipData.city);
            setCity(ipData.city);
            setLoading(false);
            return;
          }
        } catch (ipError) {
          console.error("IP-Geo-Fehler:", ipError);
        }
        
        // Letzte Alternative: Geolocation-DB
        try {
          const timestamp = new Date().getTime(); // Cache-Busting
          const geoResponse = await fetch(`https://geolocation-db.com/json/?t=${timestamp}`);
          
          if (!geoResponse.ok) {
            throw new Error(`Geolocation DB error: ${geoResponse.status}`);
          }
          
          const geoData = await geoResponse.json();
          
          if (geoData && geoData.city && geoData.city !== "Not found") {
            console.log("Stadt aus alternativer Quelle:", geoData.city);
            setCity(geoData.city);
            setLoading(false);
            return;
          }
        } catch (altGeoError) {
          console.error("Alt-Geo-Fehler:", altGeoError);
        }
        
        setCity(null);
        setLoading(false);
      } catch (error) {
        console.error("Allgemeiner Standortfehler:", error);
        setError(error instanceof Error ? error : new Error('Unbekannter Fehler bei der Standortermittlung'));
        setLoading(false);
      }
    };

    // Sofort beim ersten Laden ausführen
    detectLocation();
    
    // Außerdem bei jedem Fokus auf das Fenster erneut ausführen (wenn User zurückkehrt)
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
  }, []); // Leere Dependency-Liste bedeutet, der Effekt läuft nur beim Mounting

  return { city, loading, error };
};
