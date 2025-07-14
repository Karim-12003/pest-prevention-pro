const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const fs = require("fs");
const path = require("path");

const stadtMapPath = path.join(__dirname, "stadt_map.json");
const stadtMap = JSON.parse(fs.readFileSync(stadtMapPath, "utf8"));

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
