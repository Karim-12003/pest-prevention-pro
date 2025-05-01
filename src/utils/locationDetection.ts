
import { useParams, useSearchParams } from 'react-router-dom';

export async function getCity(): Promise<string> {
  // This function is kept for backward compatibility
  return 'NRW';
}

export function getLocationFromUrl(): string {
  const urlParams = new URLSearchParams(window.location.search);
  const cityParam = urlParams.get('city');
  
  if (cityParam) {
    // Handle the {Location(City)} placeholder from Google Ads
    if (cityParam === '{Location(City)}') {
      return 'NRW';
    }
    
    return cityParam
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  
  // Extract city from path if it exists
  const pathParts = window.location.pathname.split('/');
  if (pathParts.length > 1 && pathParts[1]) {
    return pathParts[1]
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }
  
  return 'NRW';
}
