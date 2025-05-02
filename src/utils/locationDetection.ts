
// Simple utility to get city from URL parameters - simplified
// Note: The main city detection now happens in the index.html script
export function getLocationFromUrl(): string {
  console.log("Getting location from URL:", window.location.href);
  
  // First check for city in query parameter
  const params = new URLSearchParams(window.location.search);
  let city = params.get("city");
  
  if (city) {
    // Decode URI components and trim
    city = decodeURIComponent(city.replace(/\+/g, ' ')).trim();
    
    // Limit length to prevent abuse
    if (city.length > 30) {
      console.log("City name too long, defaulting to Ihrer Stadt");
      return 'Ihrer Stadt';
    }
    
    console.log("Successfully extracted city from query parameter:", city);
    return formatCityName(city);
  }
  
  // Default fallback
  console.log("No valid city detected, defaulting to Ihrer Stadt");
  return 'Ihrer Stadt';
}

// Format city name properly (capitalize first letter)
function formatCityName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// Legacy function for backward compatibility
export async function getCity(): Promise<string> {
  return getLocationFromUrl();
}
