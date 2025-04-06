
import { useState } from 'react';

export const useUserLocation = () => {
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // No location detection functionality, just return null values
  return { city, loading, error };
};
