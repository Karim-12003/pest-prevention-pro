
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getCity } from '@/utils/locationDetection';

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

    // Execute immediately on first load
    detectLocation();
    
    // Re-run when window gets focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        detectLocation();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [toast]);

  return { city, loading, error };
};
