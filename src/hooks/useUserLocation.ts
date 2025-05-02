
import { useState, useEffect } from 'react';
import { getLocationFromUrl } from '@/utils/locationDetection';

export const useUserLocation = () => {
  const [city, setCity] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const detectLocation = () => {
      try {
        setLoading(true);
        
        // Get the city from the URL
        const detectedCity = getLocationFromUrl();
        console.log("useUserLocation detected city:", detectedCity);
        
        // Set the city
        setCity(detectedCity);
      } catch (err) {
        console.error("Error detecting location:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        // On error, we still want to show something
        setCity('Düsseldorf');
      } finally {
        setLoading(false);
      }
    };

    // Run the detection immediately
    detectLocation();
    
    // Add event listeners for navigation
    window.addEventListener('popstate', detectLocation);
    
    // Explicitly handle when the URL changes without a page reload
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
      // Call the original function
      // @ts-ignore
      originalPushState.apply(this, arguments);
      // Then run our handler
      detectLocation();
    };
    
    // Clean up
    return () => {
      window.removeEventListener('popstate', detectLocation);
      window.history.pushState = originalPushState;
    };
  }, []);

  return { 
    city, 
    loading, 
    error 
  };
};
