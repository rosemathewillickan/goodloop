import { MessageCircle } from "lucide-react";
import { requireProfile } from "@/lib/profile";
import { createClient } from "@/lib/supabase/server";
import { markAllRead } from "@/app/notifications/actions";
import { EmptyState } from "@/components/EmptyState";
import { EmptyNotificationsIllustration } from "@/components/illustrations/EmptyNotifications";
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
        <h1 className="text-2xl font-semibold text-sand-900">Notifications</h1>
        <form action={markAllRead}>
          <button className="text-sm font-medium text-brand-700 hover:underline">Mark all read</button>
        </form>
      </div>
      <p className="mt-1 text-xs text-sand-400">Simulates the WhatsApp/SMS alerts described in the PRD — mocked for this build.</p>

      {!notifications || notifications.length === 0 ? (
        <div className="mt-6">
          <EmptyState illustration={<EmptyNotificationsIllustration />} title="No notifications yet" />
        </div>
      ) : (
        <div className="mt-6 divide-y divide-sand-200 overflow-hidden rounded-2xl border border-sand-200 bg-white">
          {notifications.map((n) => (
            <div key={n.id} className={`flex gap-3 p-4 ${n.read_at ? "" : "bg-brand-50/60"}`}>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <MessageCircle className="h-4 w-4" strokeWidth={2.25} />
              </span>
              <div>
                <p className="text-sm text-sand-900">{n.message}</p>
                <p className="mt-1 text-xs text-sand-400">{formatDateTime(n.created_at)}</p>
              </div>
              {!n.read_at && <span className="ml-auto mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-600" />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
