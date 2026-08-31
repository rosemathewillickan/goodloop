import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/StatusBadge";
import { VerifyButtons } from "@/components/VerifyButtons";
import type { Profile } from "@/lib/supabase/types";

export default async function VerifyPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .neq("role", "admin")
    .order("verification_status", { ascending: true })
    .order("created_at", { ascending: false })
    .returns<Profile[]>();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Verify accounts</h1>
      <div className="mt-6 divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
        {(profiles ?? []).map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-medium text-stone-900">
                {p.name || "(no name)"} <span className="font-normal text-stone-500">· {p.role}</span>
              </p>
              <p className="text-sm text-stone-500">{p.phone || "no phone"}</p>
            </div>
            <div className="flex items-center gap-3">
              <StatusBadge status={p.verification_status} />
              {p.verification_status !== "verified" && <VerifyButtons profileId={p.id} />}
            </div>
          </div>
        ))}
        {(!profiles || profiles.length === 0) && <p className="p-4 text-sm text-stone-500">No accounts yet.</p>}
      </div>
    </div>
  );
}
