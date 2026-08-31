"use client";

import dynamic from "next/dynamic";

const MapPicker = dynamic(() => import("@/components/MapPicker").then((m) => m.MapPicker), {
  ssr: false,
  loading: () => <div className="h-[280px] animate-pulse rounded-md border border-stone-300 bg-stone-100" />,
});

export function MapView({ lat, lng }: { lat: number; lng: number }) {
  return <MapPicker value={{ lat, lng }} readOnly />;
}
