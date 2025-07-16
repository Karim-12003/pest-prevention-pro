const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

let stadtMap = {};
try {
  const jsonPath = path.join(__dirname, "stadt_map.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  stadtMap = JSON.parse(raw);
  console.log("✅ stadt_map.json geladen mit", Object.keys(stadtMap).length, "IDs");
} catch (err) {
  console.error("❌ Fehler beim Laden von stadt_map.json:", err);
}

exports.handler = async (event) => {
  const id = event.queryStringParameters?.id;

  if (!id) {
    console.log("❌ Anfrage ohne ID");
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "ID fehlt" }),
    };
  }

  console.log("🔍 Anfrage für ID:", id);

  const value = stadtMap[id];

  if (!value) {
    console.warn("⚠️ ID nicht in Mapping-Datei:", id);
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Unbekannte ID", id }),
    };
  }

  let stadt = "";
  let typ = "";

  if (/^\d{5}$/.test(value)) {
    typ = "plz-lookup";
    const url = `https://openplzapi.org/de/Localities?postalCode=${value}`;
    console.log("🌐 Abruf von OpenPLZ für PLZ:", value);

    try {
      const response = await fetch(url);
      const data = await response.json();

      stadt = data?.[0]?.name || "";

      if (!stadt) {
        console.warn("❌ Keine Stadt gefunden für PLZ:", value);
        return {
          statusCode: 404,
          body: JSON.stringify({
            error: "Stadt nicht gefunden",
            details: "Keine Stadt zu dieser PLZ in OpenPLZ",
            plz: value
          }),
        };
      }

      console.log("🏙️ Stadt gefunden:", stadt);
      return {
        statusCode: 200,
        body: JSON.stringify({ id, typ, stadt, plz: value }),
      };
    } catch (err) {
      console.error("❌ Fehler bei Anfrage an OpenPLZ:", err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Fehler bei OpenPLZ", details: err.message }),
      };
    }

  } else {
    typ = "direkt";
    stadt = value;
    console.log("✅ Direkter Stadtname aus Mapping:", stadt);

    return {
      statusCode: 200,
      body: JSON.stringify({ id, typ, stadt }),
    };
  }
};