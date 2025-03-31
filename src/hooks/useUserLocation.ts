
import { useState, useEffect } from 'react';

type LocationData = {
  city: string;
  loading: boolean;
  error: string | null;
};

export function useUserLocation(): LocationData {
  const [locationData, setLocationData] = useState<LocationData>({
    city: 'Hamburg', // Default city
    loading: false, // We're not really loading anymore since we're using a default
    error: null
  });

  // We're no longer attempting to get the user's location dynamically
  // This provides a consistent experience and prevents incorrect location detection

  return locationData;
}
