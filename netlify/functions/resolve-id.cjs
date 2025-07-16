const fs = require("fs");
const path = require("path");

// Lade die komplette Stadt-Map
let stadtMap = {};
try {
  const stadtMapPath = path.join(__dirname, "stadt_map.json");
  stadtMap = JSON.parse(fs.readFileSync(stadtMapPath, "utf8"));
} catch (error) {
  console.error("Error loading stadt_map.json:", error);
  // Fallback für häufige Städte
  stadtMap = {
    "1004625": "Essen",
    "1004576": "Aachen", 
    "1004611": "Dortmund",
    "1004612": "Duisburg",
    "1004615": "Düsseldorf",
    "1004596": "Bochum"
  };
}

exports.handler = async (event) => {
  const id = event.queryStringParameters?.id;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "ID fehlt" }),
    };
  }

  const value = stadtMap[id];

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
