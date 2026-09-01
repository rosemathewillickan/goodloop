import { BadgeCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/StatusBadge";
import { VerifyButtons } from "@/components/VerifyButtons";
import { EmptyState } from "@/components/EmptyState";
import { AvatarFace } from "@/components/illustrations/AvatarFace";
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
        <div className="mt-6 divide-y divide-sand-200 overflow-hidden rounded-2xl border-2 border-sand-200 bg-white">
          {profiles.map((p) => {
            const meta = ROLE_META[p.role];
            const Icon = meta.icon;
            return (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
                <div className="flex items-center gap-3">
                  <span className="relative shrink-0">
                    <AvatarFace seed={p.id} className="h-10 w-10 rounded-full" />
                    <span
                      className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full ring-2 ring-white"
                      style={{ color: meta.color, backgroundColor: meta.bg }}
                    >
                      <Icon className="h-3 w-3" strokeWidth={2.5} />
                    </span>
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
