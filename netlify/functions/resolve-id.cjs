const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

let stadtMap;

// Datei beim ersten Aufruf laden
try {
  const jsonPath = path.join(__dirname, "stadt_map.json");
  const jsonContent = fs.readFileSync(jsonPath, "utf-8");
  stadtMap = JSON.parse(jsonContent);
} catch (error) {
  console.error("❌ Fehler beim Laden von stadt_map.json:", error);
  stadtMap = {}; // Fallback: leeres Objekt
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

  // Wenn der Wert eine PLZ ist
  if (/^\d{5}$/.test(value)) {
    typ = "plz-lookup";

    const url = `https://openplzapi.org/de/Localities?postalCode=${value}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      stadt = data?.[0]?.name || "";

      if (!stadt) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Keine Stadt zu dieser PLZ", plz: value }),
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ id, typ, stadt, plz: value }),
      };
    } catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Fehler beim Abrufen von OpenPLZ", details: err.message }),
      };
    }
  } else {
    // Wert ist direkt ein Stadtname
    typ = "direkt";
    stadt = value;

    return {
      statusCode: 200,
      body: JSON.stringify({ id, typ, stadt }),
    };
  }
};