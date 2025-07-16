const fs = require("fs");
const fetch = require("node-fetch");

const stadtMap = JSON.parse(fs.readFileSync(__dirname + "/stadt_map.json", "utf-8"));

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

      return {
        statusCode: 200,
        body: JSON.stringify({ id, typ, stadt, plz: value }),
      };

    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "API-Fehler", details: e.message }),
      };
    }
  }

  // Wenn der Wert direkt ein Stadtname ist
  typ = "direkt";
  stadt = value;

  return {
    statusCode: 200,
    body: JSON.stringify({ id, typ, stadt }),
  };
};
