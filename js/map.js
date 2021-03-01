let mymap, myIcon;

export function mapInit() {
  const initialZoom = 17;
  mymap = L.map(
    "ip-map",
    {
      minZoom: 0,
      maxZoom: 18,
      zoomSnap: 0,
      zoomDelta: 0.25,
      zoomControl: false,
    },
    initialZoom
  );

  myIcon = L.icon({
    iconUrl: "../assets/icon-location.svg",
    iconSize: [46, 56], // size of the icon
    iconAnchor: [30, 56], // point of the icon which will correspond to marker's location
  });
  const layer = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
//   const layer = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png";

  L.tileLayer(layer, {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mymap);
}

export async function upgradeMap(ipInfo) {
  const {
    location: { lat },
    location: { lng },
  } = ipInfo;

  L.marker([lat, lng], { icon: myIcon }).addTo(mymap);
  mymap.setView([lat, lng], 10);
}
