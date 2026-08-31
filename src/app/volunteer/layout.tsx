import { requireRole } from "@/lib/profile";

export default async function VolunteerLayout({ children }: LayoutProps<"/volunteer">) {
  await requireRole("volunteer");
  return <div className="mx-auto max-w-4xl px-4 py-8">{children}</div>;
}
