
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
          throw new Error('City not found in IP data');
        }
      } catch (error) {
        console.error('Error fetching location from IP:', error);
        setLocationData({
          city: 'Hamburg', // Fallback city if all methods fail
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    const fetchLocationFromGPS = () => {
      return new Promise<string>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocation is not supported by this browser'));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              // Using reverse geocoding to get the city name from coordinates
              const { latitude, longitude } = position.coords;
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
              );

              if (!response.ok) {
                throw new Error('Failed to fetch location data from coordinates');
              }

              const data = await response.json();
              
              // Extracting city from OpenStreetMap response
              const city = data.address?.city || 
                           data.address?.town || 
                           data.address?.village || 
                           data.address?.municipality ||
                           null;
                           
              if (city) {
                resolve(city);
              } else {
                reject(new Error('City not found in GPS data'));
              }
            } catch (error) {
              reject(error);
            }
          },
          (error) => {
            reject(new Error(`GPS Error: ${error.message}`));
          },
          { 
            enableHighAccuracy: false, 
            timeout: 5000, 
            maximumAge: 0 
          }
        );
      });
    };

    const determineLocation = async () => {
      try {
        // First try GPS
        const city = await fetchLocationFromGPS();
        setLocationData({
          city,
          loading: false,
          error: null
        });
      } catch (gpsError) {
        console.error('GPS location failed, trying IP-based location:', gpsError);
        // If GPS fails, try IP-based location
        await fetchLocationFromIP();
      }
    };

    determineLocation();
  }, []);

  return locationData;
}
