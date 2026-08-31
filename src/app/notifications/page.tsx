import { requireProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { markAllRead } from "@/app/notifications/actions";
import { formatDateTime } from "@/lib/format";
import type { Notification } from "@/lib/supabase/types";

export default async function NotificationsPage() {
  const profile = await requireProfile();
  const supabase = await createClient();

  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: false })
    .returns<Notification[]>();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Notifications</h1>
        <form action={markAllRead}>
          <button className="text-sm text-emerald-700 hover:underline">Mark all read</button>
        </form>
      </div>
      <p className="mt-1 text-xs text-stone-400">Simulates the WhatsApp/SMS alerts described in the PRD — mocked for this build.</p>

      <div className="mt-6 divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
        {(notifications ?? []).map((n) => (
          <div key={n.id} className={`p-4 ${n.read_at ? "" : "bg-emerald-50/50"}`}>
            <p className="text-sm text-stone-900">{n.message}</p>
            <p className="mt-1 text-xs text-stone-400">{formatDateTime(n.created_at)}</p>
          </div>
        ))}
        {(!notifications || notifications.length === 0) && <p className="p-4 text-sm text-stone-500">No notifications yet.</p>}
      </div>
    </div>
  );
}
