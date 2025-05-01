
// Simple utility to get city from URL parameters
export function getLocationFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  let city = params.get("city");

  // Function to format city name properly
  function formatCityName(name: string): string {
    // Split by spaces or hyphens
    const words = name.split(/[\s-]+/);
    return words.map(word => 
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }

  if (city) {
    // Decode URI components and trim
    city = decodeURIComponent(city.replace(/\+/g, ' ')).trim();
    
    // Handle Google Ads placeholder
    if (city === '{Location(City)}' || 
        city.toLowerCase() === '%7blocation(city)%7d') {
      return 'NRW';
    }
    
    // Limit length to prevent abuse
    if (city.length > 30) {
      return 'NRW';
    }
    
    return formatCityName(city);
  }
  
  // Extract city from path if it exists
  const pathParts = window.location.pathname.split('/');
  if (pathParts.length > 1 && pathParts[1] && pathParts[1] !== 'impressum' && pathParts[1] !== 'agb') {
    const pathCity = pathParts[1];
    
    // Handle Google Ads placeholder in path
    if (pathCity === '{Location(City)}' || 
        pathCity.toLowerCase() === '%7blocation(city)%7d') {
      return 'NRW';
    }
    
    return formatCityName(pathCity);
  }
  
  // Default fallback
  return 'NRW';
}

// Legacy function for backward compatibility
export async function getCity(): Promise<string> {
  return getLocationFromUrl();
}
