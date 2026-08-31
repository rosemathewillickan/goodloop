import { requireRole } from "@/lib/profile";
import { DonationDetailView } from "@/components/DonationDetailView";

export default async function DonationDetailPage({ params }: PageProps<"/restaurant/donations/[id]">) {
  const { id } = await params;
  const profile = await requireRole("restaurant");
  return <DonationDetailView donationId={id} profile={profile} />;
}
