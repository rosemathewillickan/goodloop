// Static sample data for the logged-out "explore before you join" experience.
// None of this is read from or written to Supabase — it exists purely so a
// visitor can understand and try the product before creating an account.

export const DEMO_DONATION = {
  foodType: "Vegetarian meals",
  quantity: 40,
  preparedAt: "8:00 PM",
  pickupDeadline: "9:30 PM",
};

export const DEMO_MATCH_OPTIONS = [
  {
    id: "a",
    zone: "Zone A",
    distanceKm: 2.4,
    urgency: "high" as const,
    mealsNeeded: 35,
    time: "12 min away",
  },
  {
    id: "b",
    zone: "Zone B",
    distanceKm: 6.8,
    urgency: "medium" as const,
    mealsNeeded: 20,
    time: "28 min away",
  },
  {
    id: "c",
    zone: "Zone C",
    distanceKm: 3.1,
    urgency: "low" as const,
    mealsNeeded: 60,
    time: "15 min away",
  },
];

// The "correct" answer for the matching demo, with the reasoning GoodLoop
// actually uses (distance + urgency + a deadline that's still reachable).
export const DEMO_MATCH_RECOMMENDED_ID = "a";
export const DEMO_MATCH_EXPLANATION =
  "Zone A is the best fit: it's close enough to reach well before the 9:30 PM deadline, urgency is high, and its need (35 meals) is a close match for the 40 meals available — with minimal waste. Zone C needs more meals than are available, and Zone B is both farther away and less urgent.";

export const DEMO_RUN = {
  restaurant: "Green Leaf Kitchen",
  distanceToPickupKm: 2.1,
  meals: 40,
  pickupDeadline: "9:30 PM",
  distanceToDropoffKm: 1.8,
  estimatedMinutes: 32,
};

export const DEMO_RUN_STEPS = [
  { key: "accepted", label: "Accepted", detail: "You've claimed this run — the restaurant has been notified." },
  { key: "to_pickup", label: "Going to pickup", detail: "Heading to Green Leaf Kitchen, 2.1 km away." },
  { key: "picked_up", label: "Food picked up", detail: "40 meals collected and loaded up." },
  { key: "in_transit", label: "In transit", detail: "En route to the distribution zone, 1.8 km away." },
  { key: "distributed", label: "Distribution completed", detail: "Food has reached the people who needed it." },
] as const;

export const DEMO_DONATE_RESULTS = [
  {
    zone: "Riverside Community Zone",
    distanceKm: 2.9,
    urgency: "high" as const,
    note: "Recurring high-need zone, verified by a local NGO partner.",
  },
  {
    zone: "Central Station Zone",
    distanceKm: 4.6,
    urgency: "medium" as const,
    note: "Reported this week, awaiting a second verification pass.",
  },
];

// Coordinates are hand-placed approximations around a sample micro-market —
// not real addresses, and need zones are deliberately shown as an area, not
// a precise point (GoodLoop never pinpoints beneficiaries).
export const DEMO_MAP_RESTAURANTS = [
  { name: "Restaurant A", meals: 40, lat: 19.084, lng: 72.881 },
  { name: "Restaurant B", meals: 25, lat: 19.07, lng: 72.87 },
  { name: "Hotel C", meals: 60, lat: 19.078, lng: 72.893 },
];

export const DEMO_MAP_ZONES = [
  { name: "Need Zone A", people: 35, lat: 19.073, lng: 72.885 },
  { name: "Need Zone B", people: 20, lat: 19.089, lng: 72.875 },
  { name: "Need Zone C", people: 50, lat: 19.065, lng: 72.882 },
];

export const DEMO_AVAILABLE_RUNNERS = 6;

// Labeled as an "example" per the product principle: never present invented
// numbers as real production metrics.
export const DEMO_IMPACT_STATS = [
  { label: "Meals redistributed", value: "12,480" },
  { label: "Food partners", value: "86" },
  { label: "Food runners", value: "214" },
  { label: "Verified need zones", value: "31" },
  { label: "Successful runs", value: "3,420" },
];
