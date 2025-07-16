const stadtMap = {
  // Direkte Städte
  "1004625": "Essen",
  "1004576": "Aachen", 
  "1004611": "Dortmund",
  "1004612": "Duisburg",
  "1004615": "Düsseldorf",
  "1004596": "Bochum",
  
  // PLZ-Mappings
  "9043934": "45141", // Essen
  "9044462": "63741", // Aschaffenburg  
  "9113395": "94121", // Passau
  "9113385": "94545", // Moos (Niederbayern)
  
  // Weitere
  "9048141": "Aldenhoven",
  "9048146": "Alpen", 
  "9048151": "Altena"
};

exports.handler = async (event) => {
  const id = event.queryStringParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "ID fehlt" }),
    };
  }

  const value = stadtMap[id];

  // 1. ID nicht bekannt, aber evtl. ist sie eine PLZ
  if (!value) {
    console.log(`ID ${id} nicht in Map – versuche ID selbst als PLZ`);
    if (/^\d{5}$/.test(id)) {
      return await fetchCityFromPLZ(id, id, "plz-fallback");
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Unbekannte ID", id }),
      };
    }
  }

  // 2. value ist ein Stadtname
  if (isNaN(value)) {
    return {
      statusCode: 200,
      body: JSON.stringify({ id, typ: "direkt", stadt: value }),
    };
  }

  // 3. value ist eine PLZ → über OpenPLZ API auflösen
  if (/^\d{5}$/.test(value)) {
    return await fetchCityFromPLZ(id, value, "plz-lookup");
  }

  // Fallback
  return {
    statusCode: 404,
    body: JSON.stringify({ error: "Kein valider Mapping-Eintrag", id }),
  };
};

async function fetchCityFromPLZ(id, plz, typ) {
  const apiUrl = `https://openplzapi.org/de/Localities?postalCode=${plz}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const stadt = data?.[0]?.municipality?.name || data?.[0]?.name || "";

    if (stadt) {
      return {
        statusCode: 200,
        body: JSON.stringify({ id, typ, stadt, plz }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Stadt nicht gefunden", id, plz }),
      };
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API-Fehler", details: e.message }),
    };
  }
}
