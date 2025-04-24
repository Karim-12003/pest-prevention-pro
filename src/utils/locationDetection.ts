
interface GoogleGeoResponse {
  location: {
    lat: number;
    lng: number;
  };
  accuracy: number;
}

interface OpenCageResponse {
  results: Array<{
    components: {
      city?: string;
      town?: string;
      village?: string;
      county?: string;
    };
  }>;
}

const GOOGLE_API_KEY = 'AIzaSyBZm2zqFlx7qzHk9TPXPfZIK6H2Y5nKoT4';
const OPENCAGE_API_KEY = '9404c85230654d5abc450964c2f3e7f1';
const IPINFO_TOKEN = '86bd4c7e187c28';

async function getCityFromGoogleGeoAPI(): Promise<string | null> {
  try {
    const body = {
      considerIp: true,
      wifiAccessPoints: [] // Could be enhanced with real WiFi data if needed
    };

    const geoRes = await fetch(
      `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    );

    if (!geoRes.ok) {
      console.error('Google Geolocation API error:', await geoRes.text());
      return null;
    }

    const geoData: GoogleGeoResponse = await geoRes.json();
    const { lat, lng } = geoData.location;

    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${OPENCAGE_API_KEY}&language=de&pretty=1&no_annotations=1`
    );

    if (!response.ok) {
      console.error('OpenCage API error:', await response.text());
      return null;
    }

    const data: OpenCageResponse = await response.json();
    
    const city = 
      data.results[0]?.components?.city ||
      data.results[0]?.components?.town ||
      data.results[0]?.components?.village ||
      data.results[0]?.components?.county ||
      null;

    return city;
  } catch (e) {
    console.error('Error in Google Geolocation process:', e);
    return null;
  }
}

async function getCityFromIP(): Promise<string> {
  try {
    const response = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`);
    
    if (!response.ok) {
      console.error('IPinfo API error:', await response.text());
      return 'Unbekannt';
    }

    const data = await response.json();
    return data.city || 'Unbekannt';
  } catch (e) {
    console.error('IP Geolocation error:', e);
    return 'Unbekannt';
  }
}

export async function getCity(): Promise<string> {
  const googleLocation = await getCityFromGoogleGeoAPI();
  if (googleLocation) {
    console.log('Location found via Google Geolocation API:', googleLocation);
    return googleLocation;
  }

  const ipLocation = await getCityFromIP();
  console.log('Fallback to IP-based location:', ipLocation);
  return ipLocation;
}
