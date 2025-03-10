
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
    const fetchLocation = async () => {
      try {
        // Using ipapi.co which provides a free IP geolocation API
        const response = await fetch('https://ipapi.co/json/');
        
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
        } else {
          setLocationData({
            city: 'Hamburg', // Fallback city if we can't detect
            loading: false,
            error: 'City not found'
          });
        }
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocationData({
          city: 'Hamburg', // Fallback city if the API fails
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    fetchLocation();
  }, []);

  return locationData;
}
