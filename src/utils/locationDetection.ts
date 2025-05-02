
// Simple utility that always returns the default city
export function getLocationFromUrl(): string {
  return 'Ihrer Stadt';
}

// Legacy function for backward compatibility
export async function getCity(): Promise<string> {
  return 'Ihrer Stadt';
}
