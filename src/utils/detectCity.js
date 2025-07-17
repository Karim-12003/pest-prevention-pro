export function detectCity(updateDom) {
  const stadtFallback = "Ihrer Stadt";
  let cityName = stadtFallback;

  const params = new URLSearchParams(window.location.search);
  const kw = params.get("kw");
  const cityId = params.get("loc_physical_ms");

  if (kw) {
    cityName = decodeURIComponent(kw).replace(/\+/g, " ");
    updateDom(cityName);
    return;
  }

  if (cityId) {
    fetch(`/.netlify/functions/resolve-id?id=${cityId}`)
      .then(res => res.json())
      .then(data => {
        cityName = data?.stadt || stadtFallback;
        updateDom(cityName);
      })
      .catch(() => updateDom(cityName));
    return;
  }

  updateDom(cityName);
}