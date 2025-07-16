// Einfache Stadt-Erkennung über Netlify-Funktion
export interface CityData {
  name: string;
  plz: string;
}

export async function detectCity(): Promise<CityData> {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("kw") || urlParams.get("loc_physical_ms") || urlParams.get("city_id");

  console.log("🔍 DEBUG: Stadt-Erkennung startet mit URL:", window.location.search);
  console.log("🔍 DEBUG: Gefundene ID:", id);

  if (!id) {
    console.log("❌ DEBUG: Keine ID gefunden");
    return { name: "Ihrer Stadt", plz: "00000" };
  }

  try {
    const apiUrl = `/.netlify/functions/resolve-id?id=${id}`;
    console.log("🌐 DEBUG: API-Aufruf:", apiUrl);
    
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    console.log("📥 DEBUG: API-Antwort:", data);
    console.log("📥 DEBUG: data.stadt Wert:", data.stadt);
    console.log("📥 DEBUG: Vollständige Response:", JSON.stringify(data, null, 2));

    if (data.stadt) {
      const cityData = { name: data.stadt, plz: "00000" };
      console.log("✅ DEBUG: Stadt erkannt:", cityData);
      
      sessionStorage.setItem("cityName", data.stadt);
      sessionStorage.setItem("cityData", JSON.stringify(cityData));
      return cityData;
    } else {
      console.log("❌ DEBUG: Keine Stadt in API-Antwort");
    }
  } catch (e) {
    console.error("❌ DEBUG: Fehler bei API-Aufruf:", e);
  }

  return { name: "Ihrer Stadt", plz: "00000" };
}

export function getCityFromParams(): CityData {
  // Erst aus sessionStorage versuchen
  const storedCity = sessionStorage.getItem("cityName");
  if (storedCity && storedCity !== "Ihrer Stadt") {
    return { name: storedCity, plz: "00000" };
  }

  // Dann URL-Parameter prüfen
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("kw") || urlParams.get("loc_physical_ms") || urlParams.get("city_id");
  
  if (id) {
    // Async Stadt-Erkennung starten
    detectCity().then(cityData => {
      if (cityData.name !== "Ihrer Stadt") {
        updateCityElements(cityData.name);
      }
    });
  }

  return { name: "Ihrer Stadt", plz: "00000" };
}

export function updateCityElements(city: string): void {
  // Alle Elemente mit cityName-Klassen aktualisieren
  document.querySelectorAll(".cityName, .city-placeholder, .city-welcome, .cityname").forEach(el => {
    if (el.textContent) {
      el.textContent = city;
    }
  });

  // Data-city Attribute aktualisieren
  document.querySelectorAll("[data-city]").forEach(el => {
    el.setAttribute("data-city", city);
  });
}

export function updateDynamicCityTags(cityData: CityData): void {
  updateCityElements(cityData.name);
}