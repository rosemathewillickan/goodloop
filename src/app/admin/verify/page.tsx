import { BadgeCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/StatusBadge";
import { VerifyButtons } from "@/components/VerifyButtons";
import { EmptyState } from "@/components/EmptyState";
import { ROLE_META } from "@/lib/roles";
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
      <h1 className="text-2xl font-semibold text-sand-900">Verify accounts</h1>

      {!profiles || profiles.length === 0 ? (
        <div className="mt-6">
          <EmptyState icon={BadgeCheck} title="No accounts yet" />
        </div>
      ) : (
        <div className="mt-6 divide-y divide-sand-200 overflow-hidden rounded-2xl border border-sand-200 bg-white">
          {profiles.map((p) => {
            const meta = ROLE_META[p.role];
            const Icon = meta.icon;
            return (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ color: meta.color, backgroundColor: meta.bg }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  <div>
                    <p className="font-medium text-sand-900">
                      {p.name || "(no name)"} <span className="font-normal text-sand-500">· {meta.label}</span>
                    </p>
                    <p className="text-sm text-sand-500">{p.phone || "no phone"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={p.verification_status} />
                  {p.verification_status !== "verified" && <VerifyButtons profileId={p.id} />}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
