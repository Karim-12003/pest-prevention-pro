// Netlify Functions haben bereits fetch verfügbar

// PLZ-zu-Stadt-Mapping für häufige IDs (kann erweitert werden)
const direkteStadtMap = {
  "1004625": "Essen",
  "1004576": "Aachen", 
  "1004611": "Dortmund",
  "1004612": "Duisburg",
  "1004615": "Düsseldorf",
  "1004596": "Bochum"
};

// PLZ-Map für IDs die zu PLZ führen
const plzMap = {
  "9043934": "45141", // Essen
  "9044462": "63741"  // Aschaffenburg
};

exports.handler = async (event) => {
  const id = event.queryStringParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "ID fehlt" }),
    };
  }

  // Erst direkte Stadt-Map prüfen
  let value = direkteStadtMap[id];
  
  // Falls nicht gefunden, PLZ-Map prüfen
  if (!value) {
    value = plzMap[id];
  }

  if (!value) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Unbekannte ID", id }),
    };
  }

  let stadt = "";
  let typ = "";

  if (/^\d{5}$/.test(value)) {
    // Wert ist eine PLZ → nutze OpenPLZ API
    typ = "stadt-id";

    const apiUrl = `https://openplzapi.org/de/Localities?postalCode=${value}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      stadt = data?.[0]?.name || "";

      if (!stadt) {
        return {
          statusCode: 404,
          body: JSON.stringify({
            error: "Stadt nicht gefunden",
            details: "Keine Stadt zu dieser PLZ in OpenPLZ",
          }),
        };
      }
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API-Fehler", details: e.message }),
      };
    }

  } else {
    // Stadtname liegt direkt vor
    typ = "direkt";
    stadt = value;
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ id, typ, stadt }),
  };
};
