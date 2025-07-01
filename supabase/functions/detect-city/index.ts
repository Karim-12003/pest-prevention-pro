
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const MAXMIND_API_KEY = Deno.env.get('MAXMIND_API_KEY')

interface MaxMindResponse {
  city?: {
    names?: {
      de?: string;
      en?: string;
    }
  };
  country?: {
    names?: {
      de?: string;
      en?: string;
    }
  };
}

serve(async (req) => {
  // CORS Headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  }

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('[Edge Function] Starting MaxMind city detection...')
    
    if (!MAXMIND_API_KEY) {
      throw new Error('MaxMind API key not configured')
    }

    // Get client IP from request headers
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'me' // MaxMind endpoint for current IP

    console.log('[Edge Function] Detecting city for IP:', clientIP === 'me' ? 'current' : clientIP)

    // Call MaxMind API
    const maxmindResponse = await fetch(`https://geoip.maxmind.com/geoip/v2.1/city/${clientIP}`, {
      headers: {
        'Authorization': `Basic ${btoa(MAXMIND_API_KEY + ':')}`
      }
    })

    if (!maxmindResponse.ok) {
      throw new Error(`MaxMind API error: ${maxmindResponse.status}`)
    }

    const data: MaxMindResponse = await maxmindResponse.json()
    
    // Extract city name (prefer German, fallback to English)
    const cityName = data.city?.names?.de || 
                     data.city?.names?.en || 
                     null

    console.log('[Edge Function] MaxMind result:', {
      city: cityName,
      country: data.country?.names?.de || data.country?.names?.en
    })

    return new Response(
      JSON.stringify({
        success: !!cityName,
        city: cityName,
        source: 'maxmind',
        timestamp: new Date().toISOString()
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
      },
    )
  } catch (error) {
    console.error('[Edge Function] Error:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        city: null,
        error: error.message,
        source: 'maxmind',
        timestamp: new Date().toISOString()
      }),
      {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 500,
      },
    )
  }
})
