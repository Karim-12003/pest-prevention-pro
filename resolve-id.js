const mappings = require("./stadt_map.json");
const fetch = require("node-fetch");

exports.handler = async (event) => {
  const id = event.queryStringParameters.id;
  if (!id) {
    return { statusCode: 400, body: "Parameter 'id' fehlt" };
  }

  // 1. Direktes Mapping: ID → Stadtname
  if (mappings[id]) {
    return {
      statusCode: 200,
      body: JSON.stringify({ id, typ: "stadt-id", stadt: mappings[id] }),
    };
  }

  // 2. Fallback: PLZ → Stadt über OpenDataSoft API
  const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/georef-germany-postleitzahl/records?where=plz="${id}"&limit=1`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.results && data.results.length > 0) {
    return {
      statusCode: 200,
      body: JSON.stringify({ id, typ: "plz-id", stadt: data.results[0].ort }),
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({ id, fehler: "Unbekannte ID" }),
  };
};
