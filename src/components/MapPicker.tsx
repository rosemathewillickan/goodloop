"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

const PIN_SVG = (color: string) => `
<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
  <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="${color}"/>
  <circle cx="15" cy="15" r="6" fill="white"/>
</svg>`;

function pinIcon(color: string) {
  return L.divIcon({
    html: PIN_SVG(color),
    className: "",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -38],
  });
}

const PIN_COLORS = {
  brand: "var(--color-brand-600)",
  accent: "var(--color-accent-600)",
};

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
  pinColor = "brand",
}: {
  value: { lat: number; lng: number } | null;
  onChange?: (v: { lat: number; lng: number }) => void;
  readOnly?: boolean;
  pinColor?: "brand" | "accent";
}) {
  const [center] = useState<[number, number]>(value ? [value.lat, value.lng] : DEFAULT_CENTER);

  return (
    <div className="overflow-hidden rounded-xl border-2 border-sand-300">
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
        {value && <Marker position={[value.lat, value.lng]} icon={pinIcon(PIN_COLORS[pinColor])} />}
      </MapContainer>
      {!readOnly && (
        <p className="border-t border-sand-200 bg-sand-50 px-3 py-1.5 text-xs text-sand-500">
          {value ? `Pinned: ${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}` : "Click the map to drop a pin at the location."}
        </p>
      )}
    </div>
  );
}
