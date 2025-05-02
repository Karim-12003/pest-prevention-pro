
// Simple utility to get city from URL parameters
export function getLocationFromUrl(): string {
  console.log("Getting location from URL:", window.location.href);
  
  // First check for city in query parameter
  const params = new URLSearchParams(window.location.search);
  let city = params.get("city");
  
  if (city) {
    // Decode URI components and trim
    city = decodeURIComponent(city.replace(/\+/g, ' ')).trim();
    
    // Handle Google Ads placeholder
    if (city === '{Location(City)}' || 
        city.toLowerCase() === '%7blocation(city)%7d') {
      console.log("Found placeholder in query parameter, defaulting to NRW");
      return 'NRW';
    }
    
    // Validate city - only return non-empty strings
    if (city.length === 0) {
      console.log("Empty city param, defaulting to NRW");
      return 'NRW';
    }
    
    // Limit length to prevent abuse
    if (city.length > 30) {
      console.log("City name too long, defaulting to NRW");
      return 'NRW';
    }
    
    console.log("Successfully extracted city from query parameter:", city);
    return formatCityName(city);
  }
  
  // Extract city from path if it exists
  const pathParts = window.location.pathname.split('/');
  if (pathParts.length > 1 && pathParts[1]) {
    // Skip special paths
    if (pathParts[1] === 'impressum' || pathParts[1] === 'agb') {
      console.log("Special page detected, defaulting to NRW");
      return 'NRW';
    }
    
    const pathCity = decodeURIComponent(pathParts[1].replace(/\+/g, ' ')).trim();
    
    // Handle empty path segment
    if (pathCity.length === 0) {
      console.log("Empty path segment, defaulting to NRW");
      return 'NRW';
    }
    
    // Handle Google Ads placeholder in path
    if (pathCity === '{Location(City)}' || 
        pathCity.toLowerCase() === '%7blocation(city)%7d') {
      console.log("Found placeholder in path, defaulting to NRW");
      return 'NRW';
    }
    
    console.log("Successfully extracted city from path:", pathCity);
    return formatCityName(pathCity);
  }
  
  // For homepage (root path)
  if (window.location.pathname === '/' || window.location.pathname === '') {
    console.log("Root path detected, using default city: Düsseldorf");
    return 'Düsseldorf';
  }
  
  // Default fallback - should rarely happen
  console.log("No valid city detected, defaulting to Düsseldorf");
  return 'Düsseldorf';
}

// Format city name properly (capitalize first letter of each word)
function formatCityName(name: string): string {
  // Split by spaces or hyphens
  const words = name.split(/[\s-]+/);
  return words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

// Legacy function for backward compatibility
export async function getCity(): Promise<string> {
  return getLocationFromUrl();
}
