import { requireRole } from "@/lib/profile";

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  await requireRole("admin");
  return <div className="mx-auto max-w-5xl px-4 py-8">{children}</div>;
}
