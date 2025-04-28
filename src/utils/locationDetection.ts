
export async function getCity(): Promise<string> {
  // Just return the default value, no geolocation detection
  return 'NRW';
}
