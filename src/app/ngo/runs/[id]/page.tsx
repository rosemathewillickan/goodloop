import { requireRole } from "@/lib/profile";
import { RunDetailView } from "@/components/RunDetailView";

export default async function NgoRunDetailPage({ params }: PageProps<"/ngo/runs/[id]">) {
  const { id } = await params;
  const profile = await requireRole("ngo");
  return <RunDetailView runId={id} profile={profile} />;
}
