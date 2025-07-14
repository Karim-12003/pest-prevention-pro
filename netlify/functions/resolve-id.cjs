const fs = require("fs");
const https = require("https");

const stadtMap = JSON.parse(fs.readFileSync(__dirname + "/stadt_map.json", "utf-8"));

exports.handler = async function (event, context) {
  const id = event.queryStringParameters.id;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "ID fehlt" }),
    };
  }

  const result = { id };

  // Prüfe, ob ID in der Mapping-Datei vorhanden ist
  const mapped = stadtMap[id];

  // Wenn vorhanden und KEINE PLZ (z. B. keine reine 5-stellige Zahl)
  if (mapped && !/^\d{5}$/.test(mapped)) {
    result.typ = "stadt-id";
    result.stadt = mapped;
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  }

  // → Fallback: Anfrage an OpenDataSoft API mit PLZ (aus Mapping oder direkter ID)
  const plz = /^\d{5}$/.test(id) ? id : mapped;

  const apiUrl = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-germany-postleitzahl/records?where=plz=\"${plz}\"&limit=1`;

  try {
    const stadt = await new Promise((resolve, reject) => {
      https.get(apiUrl, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            const name = parsed.results?.[0]?.ort;
            if (name) resolve(name);
            else reject("Keine Stadt gefunden");
          } catch (err) {
            reject(err);
          }
        });
      }).on("error", (err) => reject(err));
    });

    result.typ = /^\d{5}$/.test(id) ? "plz-id" : "stadt-id";
    result.stadt = stadt;

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Stadt nicht gefunden", details: err.toString() }),
    };
  }
};