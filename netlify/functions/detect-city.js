
const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  const MAXMIND_API_KEY = process.env.MAXMIND_API_KEY;
  
  if (!MAXMIND_API_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false,
        error: "MaxMind API key not configured",
        city: "Ihrer Stadt"
      }),
    };
  }

  // Get client IP from Netlify headers
  const ip = event.headers["x-nf-client-connection-ip"] || 
            event.headers["x-forwarded-for"] || 
            "me"; // MaxMind endpoint for current IP

  console.log(`[Netlify Function] Detecting city for IP: ${ip === 'me' ? 'current' : ip}`);

  try {
    const response = await fetch(`https://geoip.maxmind.com/geoip/v2.1/city/${ip}`, {
      headers: {
        Authorization: `Basic ${Buffer.from(MAXMIND_API_KEY + ':').toString('base64')}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error(`[Netlify Function] MaxMind API error: ${response.status}`);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: false,
          city: "Ihrer Stadt",
          error: `MaxMind API returned ${response.status}`
        }),
      };
    }

    const data = await response.json();
    
    // Extract city name (prefer German, fallback to English)
    const cityName = data?.city?.names?.de || 
                     data?.city?.names?.en || 
                     null;

    console.log(`[Netlify Function] MaxMind result:`, {
      city: cityName,
      country: data?.country?.names?.de || data?.country?.names?.en
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: !!cityName,
        city: cityName || "Ihrer Stadt",
        source: "maxmind",
        timestamp: new Date().toISOString()
      }),
    };

  } catch (error) {
    console.error(`[Netlify Function] Error:`, error);
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: false,
        city: "Ihrer Stadt",
        error: error.message,
        source: "maxmind"
      }),
    };
  }
};
