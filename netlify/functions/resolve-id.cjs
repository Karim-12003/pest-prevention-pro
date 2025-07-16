const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Stadt-Mapping direkt eingebettet für bessere Deployment-Kompatibilität
const stadtMap = {
  "1004625": "Essen",
  "1004576": "Aachen",
  "1004577": "Ahaus",
  "1004578": "Ahlen",
  "1004579": "Alfter",
  "1004580": "Alsdorf"
  // Füge hier weitere Städte hinzu falls nötig
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
