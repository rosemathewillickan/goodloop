"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Leaflet's default marker icon references image files that don't resolve
// through Next.js's bundler unless we point them at the CDN explicitly.
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const DEFAULT_CENTER: [number, number] = [19.076, 72.8777]; // Mumbai, as a sane default

function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function MapPicker({
  value,
  onChange,
  readOnly = false,
}: {
  value: { lat: number; lng: number } | null;
  onChange?: (v: { lat: number; lng: number }) => void;
  readOnly?: boolean;
}) {
  const [center] = useState<[number, number]>(value ? [value.lat, value.lng] : DEFAULT_CENTER);

  return (
    <div className="overflow-hidden rounded-md border border-stone-300">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: 280, width: "100%" }}
        dragging={!readOnly}
        scrollWheelZoom={!readOnly}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {!readOnly && onChange && <ClickHandler onPick={(lat, lng) => onChange({ lat, lng })} />}
        {value && <Marker position={[value.lat, value.lng]} icon={markerIcon} />}
      </MapContainer>
      {!readOnly && (
        <p className="border-t border-stone-200 bg-stone-50 px-3 py-1.5 text-xs text-stone-500">
          {value ? `Pinned: ${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}` : "Click the map to drop a pin at the location."}
        </p>
      )}
    </div>
  );
}
