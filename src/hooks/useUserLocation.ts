
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>('NRW');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  // Get city from URL params or query params
  const { city: urlCity } = useParams();
  const [searchParams] = useSearchParams();
  const cityQueryParam = searchParams.get('city');

  useEffect(() => {
    // First check route params (/:city), then query params (?city=), then default to NRW
    if (urlCity) {
      const formattedCity = urlCity
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setCity(formattedCity);
    } else if (cityQueryParam) {
      // Handle the placeholder from Google Ads
      if (cityQueryParam === '{Location(City)}') {
        setCity('NRW');
        return;
      }
      
      // Handle the query parameter from Google Ads
      const formattedCity = cityQueryParam
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setCity(formattedCity);
    }
  }, [urlCity, cityQueryParam]);

  return { city, loading, error };
};
