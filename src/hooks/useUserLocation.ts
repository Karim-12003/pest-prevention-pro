
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

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
        
        // 1. Versuche zuerst die Browser-Geolocation API mit höchster Genauigkeit
        if (navigator.geolocation) {
          try {
            // Erweiterte Geolocation-Optionen für maximale Genauigkeit
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(
                resolve,
                reject,
                {
                  enableHighAccuracy: true,
                  timeout: 10000,
                  maximumAge: 0
                }
              );
            });

            const { latitude, longitude } = position.coords;
            console.log("GPS Koordinaten:", latitude, longitude);

            // Mozilla Location Service für WLAN & Mobilfunk Triangulation
            try {
              const mls_response = await fetch(`https://location.services.mozilla.com/v1/geolocate?key=test`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  considerIp: true,
                  wifiAccessPoints: [], // Browser füllt dies automatisch
                  cellTowers: [], // Browser füllt dies automatisch
                }),
              });

              if (mls_response.ok) {
                const mlsData = await mls_response.json();
                console.log("MLS Daten:", mlsData);
                
                // Kombiniere GPS mit WLAN/Mobilfunk für höhere Genauigkeit
                const refinedLat = (latitude + mlsData.location.lat) / 2;
                const refinedLng = (longitude + mlsData.location.lng) / 2;
                
                console.log("Verfeinerte Koordinaten:", refinedLat, refinedLng);
                
                // OpenCage Reverse Geocoding mit verfeinerter Position
                const opencage_response = await fetch(
                  `https://api.opencagedata.com/geocode/v1/json?q=${refinedLat}+${refinedLng}&key=9404c85230654d5abc450964c2f3e7f1&language=de&pretty=1&no_annotations=1&t=${Date.now()}`
                );

                if (opencage_response.ok) {
                  const geocodeData = await opencage_response.json();
                  
                  if (geocodeData.results && geocodeData.results.length > 0) {
                    const components = geocodeData.results[0].components;
                    const detectedCity = components.city || components.town || components.village || components.suburb || components.county || components.state;
                    
                    if (detectedCity) {
                      console.log("Stadt ermittelt:", detectedCity);
                      setCity(detectedCity);
                      setLoading(false);
                      return;
                    }
                  }
                }
              }
            } catch (mlsError) {
              console.error("MLS Fehler:", mlsError);
            }
          } catch (geoError) {
            console.error("GPS Fehler:", geoError);
          }
        }

        // Fallback: IP-basierte Geolocation
        try {
          const ipResponse = await fetch(`https://ipapi.co/json/?t=${Date.now()}`);
          
          if (ipResponse.ok) {
            const ipData = await ipResponse.json();
            
            if (ipData && ipData.city) {
              console.log("Stadt über IP ermittelt:", ipData.city);
              setCity(ipData.city);
              setLoading(false);
              return;
            }
          }
        } catch (ipError) {
          console.error("IP-Geo Fehler:", ipError);
          toast({
            title: "Standortermittlung fehlgeschlagen",
            description: "Bitte erlauben Sie die Standortermittlung in Ihrem Browser.",
            variant: "destructive",
          });
        }
        
        setCity(null);
        setLoading(false);
      } catch (error) {
        console.error("Allgemeiner Fehler:", error);
        setError(error instanceof Error ? error : new Error('Unbekannter Fehler bei der Standortermittlung'));
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
  }, []);

  return { city, loading, error };
};
