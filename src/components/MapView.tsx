"use client";

import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/MapPicker").then((m) => m.MapPicker), {
  ssr: false,
  loading: () => <div className="h-[280px] animate-pulse rounded-xl border border-sand-300 bg-sand-100" />,
});

export function MapView({ lat, lng, pinColor }: { lat: number; lng: number; pinColor?: "brand" | "accent" }) {
  return <MapPicker value={{ lat, lng }} readOnly pinColor={pinColor} />;
}
