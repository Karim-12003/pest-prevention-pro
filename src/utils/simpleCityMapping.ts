
const DEFAULT_CITY = "Ihrer Stadt";
const DEFAULT_ZIP = "00000";

// Erweiterte Mapping-Tabelle für Stadt-Erkennung
const cityMapping: { [key: string]: { name: string; plz: string } } = {
  // Direkte Stadtnamen
  "duisburg": { name: "Duisburg", plz: "47051" },
  "essen": { name: "Essen", plz: "45127" },
  "koeln": { name: "Köln", plz: "50667" },
  "koln": { name: "Köln", plz: "50667" },
  "cologne": { name: "Köln", plz: "50667" },
  "dortmund": { name: "Dortmund", plz: "44135" },
  "oberhausen": { name: "Oberhausen", plz: "46045" },
  "bochum": { name: "Bochum", plz: "44787" },
  "herne": { name: "Herne", plz: "44623" },
  "gelsenkirchen": { name: "Gelsenkirchen", plz: "45879" },
  "bottrop": { name: "Bottrop", plz: "46236" },
  "muelheim": { name: "Mülheim", plz: "45468" },
  "mülheim": { name: "Mülheim", plz: "45468" },
  "hagen": { name: "Hagen", plz: "58135" },
  "berlin": { name: "Berlin", plz: "10115" },
  "hamburg": { name: "Hamburg", plz: "20095" },
  "muenchen": { name: "München", plz: "80331" },
  "münchen": { name: "München", plz: "80331" },
  "frankfurt": { name: "Frankfurt", plz: "60311" },
  "stuttgart": { name: "Stuttgart", plz: "70173" },
  
  // Kammerjäger + Stadt Kombinationen
  "kammerjaeger-duisburg": { name: "Duisburg", plz: "47051" },
  "kammerjaeger-essen": { name: "Essen", plz: "45127" },
  "kammerjaeger-koeln": { name: "Köln", plz: "50667" },
  "kammerjaeger-dortmund": { name: "Dortmund", plz: "44135" },
  "kammerjaeger-oberhausen": { name: "Oberhausen", plz: "46045" },
  "kammerjaeger-bochum": { name: "Bochum", plz: "44787" },
  "kammerjaeger-herne": { name: "Herne", plz: "44623" },
  "kammerjaeger-gelsenkirchen": { name: "Gelsenkirchen", plz: "45879" },
  "kammerjäger-duisburg": { name: "Duisburg", plz: "47051" },
  "kammerjäger-essen": { name: "Essen", plz: "45127" },
  "kammerjäger-köln": { name: "Köln", plz: "50667" },
  "kammerjäger-dortmund": { name: "Dortmund", plz: "44135" },
  
  // Numerische IDs
  "101": { name: "Köln", plz: "50667" },
  "102": { name: "Dortmund", plz: "44135" },
  "103": { name: "Duisburg", plz: "47051" },
  "104": { name: "Oberhausen", plz: "46045" },
  "1004625": { name: "Essen", plz: "45127" },
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

  // Funktion zum Extrahieren der Stadt aus kw-Parameter
  function extractCityFromKeyword(keyword: string) {
    // Entferne häufige Präfixe/Suffixe
    const cleanKeyword = keyword
      .replace(/^(kammerjäger|kammerjaeger)[-\s]+/i, '')
      .replace(/[-\s]+(kammerjäger|kammerjaeger)$/i, '')
      .toLowerCase()
      .trim();
    
    // Prüfe direkte Übereinstimmung
    if (cityMapping[cleanKeyword]) {
      return cityMapping[cleanKeyword];
    }
    
    // Prüfe ursprünglichen Keyword
    if (cityMapping[keyword]) {
      return cityMapping[keyword];
    }
    
    // Suche nach Teilübereinstimmungen
    for (const [key, value] of Object.entries(cityMapping)) {
      if (key.includes(cleanKeyword) || cleanKeyword.includes(key)) {
        return value;
      }
    }
    
    return null;
  }

  // Versuche zuerst kw (keyword) - häufigster Fall
  if (kw) {
    const cityFromKw = extractCityFromKeyword(kw);
    if (cityFromKw) {
      console.log("✅ Stadt über 'kw' gefunden:", cityFromKw);
      return cityFromKw;
    }
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
  return { name: DEFAULT_CITY, plz: DEFAULT_ZIP };
}

export function updateDynamicCityTags(city: { name: string; plz: string }) {
  console.log("🔄 Aktualisiere DOM-Elemente mit Stadt:", city);
  
  // Aktualisiere [data-city] Elemente  
  document.querySelectorAll("[data-city]").forEach(el => {
    console.log("Aktualisiere data-city Element:", el.textContent, "->", city.name);
    el.textContent = city.name;
  });

  // Aktualisiere [data-city-pre] Elemente (für "aus Stadt")
  document.querySelectorAll("[data-city-pre]").forEach(el => {
    console.log("Aktualisiere data-city-pre Element:", el.textContent, "->", `aus ${city.name}`);
    el.textContent = `aus ${city.name}`;
  });

  // Aktualisiere [data-zip] Elemente
  document.querySelectorAll("[data-zip]").forEach(el => {
    console.log("Aktualisiere data-zip Element:", el.textContent, "->", city.plz);
    el.textContent = city.plz;
  });
  
  // Aktualisiere auch .city-welcome Klassen (für Kompatibilität)
  document.querySelectorAll(".city-welcome").forEach(el => {
    console.log("Aktualisiere city-welcome Element:", el.textContent, "->", city.name);
    el.textContent = city.name;
  });
}

export { DEFAULT_CITY, DEFAULT_ZIP };
