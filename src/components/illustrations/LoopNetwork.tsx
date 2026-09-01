// An abstract "city network" visual — no map API needed. Nodes (restaurant,
// hotel, volunteers, NGO, community) scattered across a soft canvas and
// joined by animated, colour-shifting loop connections, each node pulsing
// gently. Positions are percentage-based so the SVG connections and the HTML
// icon nodes always line up regardless of container size.
import { ChefHat, UtensilsCrossed, Bike, HeartHandshake, Heart } from "lucide-react";

const NODES = [
  { id: "restaurant", x: 10, y: 22, icon: ChefHat, color: "var(--color-role-restaurant)", bg: "var(--color-role-restaurant-bg)", label: "Restaurant" },
  { id: "hotel", x: 26, y: 62, icon: UtensilsCrossed, color: "var(--color-role-restaurant)", bg: "var(--color-role-restaurant-bg)", label: "Hotel" },
  { id: "volunteer1", x: 48, y: 14, icon: Bike, color: "var(--color-role-volunteer)", bg: "var(--color-role-volunteer-bg)", label: "Volunteer" },
  { id: "volunteer2", x: 55, y: 68, icon: Bike, color: "var(--color-role-volunteer)", bg: "var(--color-role-volunteer-bg)", label: "Volunteer" },
  { id: "ngo", x: 78, y: 30, icon: HeartHandshake, color: "var(--color-role-ngo)", bg: "var(--color-role-ngo-bg)", label: "NGO" },
  { id: "community", x: 88, y: 66, icon: Heart, color: "var(--color-role-supporter)", bg: "var(--color-role-supporter-bg)", label: "Community" },
] as const;

const CONNECTIONS = [
  { from: "restaurant", to: "volunteer1", via: [30, 8], color: "var(--color-brand-400)" },
  { from: "hotel", to: "volunteer2", via: [40, 74], color: "var(--color-brand-400)" },
  { from: "volunteer1", to: "ngo", via: [65, 10], color: "var(--color-sky-500)" },
  { from: "volunteer2", to: "ngo", via: [68, 58], color: "var(--color-sky-500)" },
  { from: "ngo", to: "community", via: [85, 40], color: "var(--color-berry-500)" },
] as const;

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!;
}

export function LoopNetwork({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[16/10] w-full ${className}`}>
      <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {CONNECTIONS.map((c, i) => {
          const from = nodeById(c.from);
          const to = nodeById(c.to);
          const d = `M${from.x} ${from.y + 3} Q${c.via[0]} ${c.via[1]} ${to.x} ${to.y - 3}`;
          return (
            <path
              key={i}
              d={d}
              stroke={c.color}
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeDasharray="3 2.4"
              fill="none"
              className="gl-animate-dash"
              opacity="0.85"
            />
          );
        })}
      </svg>

      {NODES.map((n) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <span
            className="gl-animate-pulse flex h-9 w-9 items-center justify-center rounded-full sm:h-11 sm:w-11"
            style={{ backgroundColor: n.bg, color: n.color, boxShadow: "0 0 0 4px var(--color-sand-50)" }}
          >
            <n.icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.25} />
          </span>
        </div>
      ))}
    </div>
  );
}
