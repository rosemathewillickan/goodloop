"use client";

import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import { DEMO_MAP_RESTAURANTS, DEMO_MAP_ZONES } from "@/lib/demoData";

const PIN_SVG = (color: string) => `
<svg width="26" height="36" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="${color}"/>
  <circle cx="15" cy="15" r="6" fill="white"/>
</svg>`;

function pinIcon(color: string) {
  return L.divIcon({
    html: PIN_SVG(color),
    className: "",
    iconSize: [26, 36],
    iconAnchor: [13, 36],
    popupAnchor: [0, -32],
  });
}

const restaurantIcon = pinIcon("var(--color-role-restaurant)");

export function DemoMap() {
  return (
    <MapContainer center={[19.078, 72.88]} zoom={12} style={{ height: 360, width: "100%" }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {DEMO_MAP_RESTAURANTS.map((r) => (
        <Marker key={r.name} position={[r.lat, r.lng]} icon={restaurantIcon}>
          <Popup>
            <strong>{r.name}</strong>
            <br />
            {r.meals} meals available
          </Popup>
        </Marker>
      ))}
      {DEMO_MAP_ZONES.map((z) => (
        <Circle
          key={z.name}
          center={[z.lat, z.lng]}
          radius={550}
          pathOptions={{ color: "var(--color-role-ngo)", fillColor: "var(--color-role-ngo)", fillOpacity: 0.25 }}
        >
          <Popup>
            <strong>{z.name}</strong>
            <br />
            ~{z.people} people · approximate zone
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
}
