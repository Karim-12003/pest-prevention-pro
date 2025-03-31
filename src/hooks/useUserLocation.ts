
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

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
        // Using a different IP geolocation service that works in browser environments
        const response = await fetch('https://api.ipgeolocation.io/ipgeo?apiKey=b63a737e37e0407fb933f8dde6b9ac18');
        
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
        
        // Try alternative API if first one fails
        try {
          const alternativeResponse = await fetch('https://api.ipapi.com/api/check?access_key=c18d34bfef2f8a3db4ae7b2f14c4a3d4');
          
          if (!alternativeResponse.ok) {
            throw new Error('Failed to fetch location data from alternative source');
          }
          
          const alternativeData = await alternativeResponse.json();
          
          if (alternativeData.city) {
            setLocationData({
              city: alternativeData.city,
              loading: false,
              error: null
            });
            console.log('Location detected from alternative source:', alternativeData.city);
            return;
          }
        } catch (secondError) {
          console.error('Error fetching location from alternative source:', secondError);
        }
        
        // If all APIs fail, use navigator.geolocation as last resort
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                const geoResponse = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=de`);
                
                if (!geoResponse.ok) throw new Error('Failed to reverse geocode');
                
                const geoData = await geoResponse.json();
                
                if (geoData.city) {
                  setLocationData({
                    city: geoData.city,
                    loading: false,
                    error: null
                  });
                  console.log('Location detected from browser geolocation:', geoData.city);
                  return;
                }
              } catch (geoError) {
                console.error('Error with geolocation reverse lookup:', geoError);
              }
              
              // If reverse geocoding fails, fall back to Hamburg
              setLocationData({
                city: 'Hamburg',
                loading: false,
                error: 'Failed to get precise location'
              });
            },
            () => {
              // Geolocation permission denied or error
              setLocationData({
                city: 'Hamburg',
                loading: false,
                error: 'Geolocation not available'
              });
            }
          );
        } else {
          // Browser doesn't support geolocation
          setLocationData({
            city: 'Hamburg',
            loading: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    };

    // Always fetch location on component mount
    fetchLocationFromIP();

    // Don't add dependencies to avoid re-fetching
  }, []);

  return locationData;
}
