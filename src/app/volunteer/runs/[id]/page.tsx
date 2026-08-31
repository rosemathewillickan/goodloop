import { requireRole } from "@/lib/profile";
import { RunDetailView } from "@/components/RunDetailView";

export default async function VolunteerRunDetailPage({ params }: PageProps<"/volunteer/runs/[id]">) {
  const { id } = await params;
  const profile = await requireRole("volunteer");
  return <RunDetailView runId={id} profile={profile} />;
}
