
# Netlify Functions Setup

## MaxMind IP-Geolocation Function

### Environment Variables
Set the following environment variable in your Netlify dashboard:

```
MAXMIND_API_KEY=your_maxmind_api_key_here
```

### Function Endpoint
The function will be available at:
```
/.netlify/functions/detect-city
```

### Setup Steps
1. Go to your Netlify dashboard
2. Navigate to Site settings > Environment variables
3. Add `MAXMIND_API_KEY` with your MaxMind API key
4. Deploy your site

### Testing
You can test the function locally with Netlify CLI:
```bash
netlify dev
```

The function will handle CORS automatically and return city detection results based on the client's IP address.
