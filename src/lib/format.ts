export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// An "available" donation whose deadline has passed reads as expired even
// though nothing has touched its `status` column yet (no scheduled job flips it).
export function effectiveStatus(status: string, pickupDeadline: string): string {
  if (status === "available" && new Date(pickupDeadline).getTime() < Date.now()) return "expired";
  return status;
}

export function timeUntil(iso: string) {
  const diffMs = new Date(iso).getTime() - Date.now();
  const abs = Math.abs(diffMs);
  const mins = Math.round(abs / 60000);
  const label = mins < 60 ? `${mins}m` : mins < 1440 ? `${Math.round(mins / 60)}h` : `${Math.round(mins / 1440)}d`;
  return diffMs < 0 ? `${label} ago` : `in ${label}`;
}
