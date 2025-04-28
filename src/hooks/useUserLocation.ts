
import { useState } from 'react';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>('NRW');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // No geolocation detection anymore, just return the default value
  return { city, loading, error };
};
