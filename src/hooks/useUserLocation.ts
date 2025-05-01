
import { useState, useEffect } from 'react';
import { getLocationFromUrl } from '@/utils/locationDetection';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Explicitly define the detection function inside the effect
    const detectLocation = () => {
      try {
        setLoading(true);
        
        // Force the URL reading to happen now
        const url = window.location.href; // Reading this to ensure the effect captures current URL
        console.log("Current URL in useUserLocation:", url);
        
        // Use our improved location detection function
        const detectedCity = getLocationFromUrl();
        
        console.log("useUserLocation detected city:", detectedCity);
        
        // Update state with the detected city
        setCity(detectedCity);
      } catch (err) {
        console.error("Error detecting location:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };

    // Run the detection immediately
    detectLocation();
    
    // Add an event listener to detect URL changes
    window.addEventListener('popstate', detectLocation);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('popstate', detectLocation);
    };
  }, []); // Dependencies array is empty to run only once on mount

  return { 
    city: city || 'NRW', // Default to NRW only if city is null
    loading, 
    error 
  };
};
