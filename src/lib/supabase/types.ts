// Hand-written to match supabase/migrations/0001_init.sql.
// Once the Supabase project exists, regenerate the real thing with:
//   npx supabase gen types typescript --project-id <ref> > src/lib/supabase/types.ts

export type Role = "restaurant" | "volunteer" | "ngo" | "admin";
export type VerificationStatus = "pending" | "verified" | "rejected";
export type DonationStatus = "available" | "assigned" | "picked_up" | "distributed" | "expired" | "cancelled";
export type NeedZoneStatus = "pending_verification" | "active" | "expired" | "rejected";
export type Urgency = "low" | "medium" | "high";
export type FoodRunStatus = "assigned" | "picked_up" | "distributed" | "failed";
export type IncidentCategory = "food_safety" | "pickup" | "volunteer" | "distribution" | "misinformation" | "other";
export type IncidentSeverity = "low" | "medium" | "high";
export type IncidentStatus = "open" | "resolved" | "escalated";
export type NotificationChannel = "app" | "whatsapp" | "sms";

export interface Profile {
  id: string;
  role: Role;
  name: string;
  phone: string | null;
  verification_status: VerificationStatus;
  needs_role_selection: boolean;
  created_at: string;
}

export interface Restaurant {
  profile_id: string;
  organization_name: string;
  address_text: string | null;
  lat: number | null;
  lng: number | null;
}

export interface Volunteer {
  profile_id: string;
  vehicle_type: string | null;
  service_radius_km: number;
  available: boolean;
}

export interface NgoPartner {
  profile_id: string;
  organization_name: string;
}

export interface Donation {
  id: string;
  restaurant_id: string;
  food_type: string;
  quantity_meals: number;
  dietary_info: string | null;
  pickup_deadline: string;
  address_text: string | null;
  lat: number;
  lng: number;
  status: DonationStatus;
  cancel_reason: string | null;
  created_at: string;
}

export interface DonationEvent {
  id: string;
  donation_id: string;
  event_type: string;
  actor_id: string | null;
  note: string | null;
  created_at: string;
}

export interface NeedZone {
  id: string;
  reporter_id: string;
  location_text: string;
  lat: number;
  lng: number;
  estimated_people: number | null;
  urgency: Urgency;
  recurring: boolean;
  status: NeedZoneStatus;
  verified_by: string | null;
  created_at: string;
}

export interface FoodRun {
  id: string;
  donation_id: string;
  need_zone_id: string;
  volunteer_id: string | null;
  ngo_id: string | null;
  status: FoodRunStatus;
  assigned_by: string;
  picked_up_at: string | null;
  distributed_at: string | null;
  meals_distributed: number | null;
  failure_reason: string | null;
  created_at: string;
}

export interface Incident {
  id: string;
  run_id: string | null;
  reporter_id: string;
  category: IncidentCategory;
  severity: IncidentSeverity;
  status: IncidentStatus;
  description: string | null;
  resolution_note: string | null;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  message: string;
  channel: NotificationChannel;
  read_at: string | null;
  created_at: string;
}

export interface SupporterPledge {
  id: string;
  supporter_name: string | null;
  amount_inr: number;
  message: string | null;
  created_at: string;
}

// Minimal shape satisfying @supabase/ssr's generic constraint without
// hand-modeling every Insert/Update/Relationships variant.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Database = any;
