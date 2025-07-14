// Einfache Stadt-Erkennung über Netlify-Funktion
export interface CityData {
  name: string;
  plz: string;
}

export async function detectCity(): Promise<CityData> {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("kw") || urlParams.get("loc_physical_ms") || urlParams.get("city_id");

  if (!id) {
    return { name: "Ihrer Stadt", plz: "00000" };
  }

  try {
    const response = await fetch(`/.netlify/functions/resolve-id?id=${id}`);
    const data = await response.json();

    if (data.stadt) {
      const cityData = { name: data.stadt, plz: "00000" };
      sessionStorage.setItem("cityName", data.stadt);
      sessionStorage.setItem("cityData", JSON.stringify(cityData));
      return cityData;
    }
  } catch (e) {
    console.error("Stadt konnte nicht geladen werden", e);
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