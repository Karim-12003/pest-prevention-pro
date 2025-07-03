
const DEFAULT_CITY = "Ihrer Stadt";
const DEFAULT_ZIP = "00000";

// Deine echte Mapping-Tabelle hier einfügen
const cityMapping: { [key: string]: { name: string; plz: string } } = {
  "duisburg": { name: "Duisburg", plz: "47051" },
  "essen": { name: "Essen", plz: "45127" },
  "koeln": { name: "Köln", plz: "50667" },
  "101": { name: "Köln", plz: "50667" },
  "102": { name: "Dortmund", plz: "44135" },
  "103": { name: "Duisburg", plz: "47051" },
  "104": { name: "Oberhausen", plz: "46045" },
  "1004625": { name: "Essen", plz: "45127" },
  // … dein kompletter Satz kann hier erweitert werden
};

export function getCityFromParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const kw = urlParams.get("kw")?.toLowerCase();
  const loc = urlParams.get("loc_physical_ms");
  const cityId = urlParams.get("city_id");

  console.log("🔍 Stadt-Parameter:", { kw, loc, cityId });

  if (kw && cityMapping[kw]) {
    console.log("✅ Stadt über 'kw' gefunden:", cityMapping[kw]);
    return cityMapping[kw];
  }
  if (loc && cityMapping[loc]) {
    console.log("✅ Stadt über 'loc_physical_ms' gefunden:", cityMapping[loc]);
    return cityMapping[loc];
  }
  if (cityId && cityMapping[cityId]) {
    console.log("✅ Stadt über 'city_id' gefunden:", cityMapping[cityId]);
    return cityMapping[cityId];
  }

  console.log("❌ Keine Stadt gefunden, verwende Standard:", { name: DEFAULT_CITY, plz: DEFAULT_ZIP });
  return { name: DEFAULT_CITY, plz: DEFAULT_ZIP };
}

export { DEFAULT_CITY, DEFAULT_ZIP };
