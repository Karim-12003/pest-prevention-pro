// Stadt-Mapping direkt eingebettet (erweitert für die wichtigsten IDs)
const stadtMap = {
  // Direkte Städte
  "1004625": "Essen",
  "1004576": "Aachen", 
  "1004611": "Dortmund",
  "1004612": "Duisburg",
  "1004615": "Düsseldorf",
  "1004596": "Bochum",
  
  // PLZ-Mappings (häufige IDs)
  "9043934": "45141", // Essen
  "9044462": "63741", // Aschaffenburg  
  "9113395": "94121", // Passau
  
  // Weitere aus der Map
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

  // FALLBACK: Wenn ID unbekannt ist, versuche die ID selbst als PLZ
  if (!value) {
    console.log(`ID ${id} nicht in Map gefunden, versuche als PLZ...`);
    
    // Versuche die ID direkt als PLZ
    if (/^\d{5}$/.test(id)) {
      const apiUrl = `https://openplzapi.org/de/Localities?postalCode=${id}`;
      
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const stadt = data?.[0]?.name || "";
        
        if (stadt) {
          return {
            statusCode: 200,
            body: JSON.stringify({ id, typ: "plz-fallback", stadt, plz: id }),
          };
        }
      } catch (e) {
        console.error("PLZ-Fallback Fehler:", e);
      }
    }
    
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Unbekannte ID", id }),
    };
  }

  let stadt = "";
  let typ = "";

  if (/^\d{5}$/.test(value)) {
    // Wert ist eine PLZ → nutze OpenPLZ API
    typ = "plz-lookup";

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
            plz: value
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
    body: JSON.stringify({ id, typ, stadt, plz: typ === "plz-lookup" ? value : null }),
  };
};
