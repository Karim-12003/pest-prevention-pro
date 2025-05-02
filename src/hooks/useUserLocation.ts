
import { useState } from 'react';

export const useUserLocation = () => {
  const [city] = useState<string>('Ihrer Stadt');
  const [loading] = useState(false);
  const [error] = useState<Error | null>(null);

  return { 
    city, 
    loading, 
    error 
  };
};
