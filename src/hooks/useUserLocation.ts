
import { useState, useEffect } from 'react';

type LocationData = {
  city: string;
  loading: boolean;
  error: string | null;
};

export function useUserLocation(): LocationData {
  const [locationData, setLocationData] = useState<LocationData>({
    city: '',
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchLocationFromIP = async () => {
      try {
        // Using ipinfo.io which is more reliable for IP geolocation
        const response = await fetch('https://ipinfo.io/json?token=0c3c074b95e9d7');
        
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        
        if (data.city) {
          setLocationData({
            city: data.city,
            loading: false,
            error: null
          });
          console.log('Location detected:', data.city);
        } else {
          throw new Error('City not found in IP data');
        }
      } catch (error) {
        console.error('Error fetching location from IP:', error);
        setLocationData({
          city: 'Hamburg', // Fallback city if IP detection fails
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    // Always fetch location on component mount
    fetchLocationFromIP();

    // Don't add dependencies to avoid re-fetching
  }, []);

  return locationData;
}
