import { requireRole } from "@/lib/profile";
import { DonationDetailView } from "@/components/DonationDetailView";

export default async function AdminDonationDetailPage({ params }: PageProps<"/admin/donations/[id]">) {
  const { id } = await params;
  const profile = await requireRole("admin");
  return <DonationDetailView donationId={id} profile={profile} />;
}
