
const DEFAULT_CITY = "Ihrer Stadt";
const DEFAULT_ZIP = "00000";

// Deine echte Mapping-Tabelle hier einfügen
const cityMapping: { [key: string]: { name: string; plz: string } } = {
  "duisburg": { name: "Duisburg", plz: "47051" },
  "essen": { name: "Essen", plz: "45127" },
  "koeln": { name: "Köln", plz: "50667" },
  "koln": { name: "Köln", plz: "50667" }, // Alternative Schreibweise ohne Umlaut
  "cologne": { name: "Köln", plz: "50667" }, // Englische Schreibweise
  "dortmund": { name: "Dortmund", plz: "44135" },
  "oberhausen": { name: "Oberhausen", plz: "46045" },
  "101": { name: "Köln", plz: "50667" },
  "102": { name: "Dortmund", plz: "44135" },
  "103": { name: "Duisburg", plz: "47051" },
  "104": { name: "Oberhausen", plz: "46045" },
  "1004625": { name: "Essen", plz: "45127" },
  // … dein kompletter Satz kann hier erweitert werden
};

export function getCityFromParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const kw = urlParams.get("kw")?.toLowerCase()?.trim();
  const loc = urlParams.get("loc_physical_ms");
  const cityId = urlParams.get("city_id");

  console.log("🔍 Stadt-Parameter:", { 
    kw: kw || "nicht vorhanden", 
    loc: loc || "nicht vorhanden", 
    cityId: cityId || "nicht vorhanden",
    allParams: Object.fromEntries(urlParams.entries())
  });

  // Versuche zuerst kw (keyword)
  if (kw && cityMapping[kw]) {
    console.log("✅ Stadt über 'kw' gefunden:", cityMapping[kw]);
    return cityMapping[kw];
  }

  // Dann loc_physical_ms
  if (loc && cityMapping[loc]) {
    console.log("✅ Stadt über 'loc_physical_ms' gefunden:", cityMapping[loc]);
    return cityMapping[loc];
  }

  // Dann city_id
  if (cityId && cityMapping[cityId]) {
    console.log("✅ Stadt über 'city_id' gefunden:", cityMapping[cityId]);
    return cityMapping[cityId];
  }

  console.log("❌ Keine Stadt gefunden, verwende Standard:", { name: DEFAULT_CITY, plz: DEFAULT_ZIP });
  console.log("🔍 Verfügbare Mappings:", Object.keys(cityMapping));
  
  return { name: DEFAULT_CITY, plz: DEFAULT_ZIP };
}

export { DEFAULT_CITY, DEFAULT_ZIP };
