
export async function getCity(): Promise<string> {
  try {
    // Get location from Google Geolocation API
    const geoResponse = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDrSesAAmJnHIlMlqc4Qdq0ajYWOQDi5sA', {
      method: 'POST'
    });
    const geoData = await geoResponse.json();
    const lat = geoData.location.lat;
    const lng = geoData.location.lng;

    // Reverse geocode to get city name
    const geoCodeResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDrSesAAmJnHIlMlqc4Qdq0ajYWOQDi5sA`);
    const geoCodeData = await geoCodeResponse.json();

    const city = geoCodeData.results.find(res => res.types.includes('locality'))?.address_components.find(comp => comp.types.includes('locality'))?.long_name;

    return city || 'NRW';
  } catch (error) {
    console.error('Fehler bei der Standortbestimmung:', error);
    return 'NRW';
  }
}
