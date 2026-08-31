import { requireRole } from "@/lib/profile";

export default async function NgoLayout({ children }: LayoutProps<"/ngo">) {
  await requireRole("ngo");
  return <div className="mx-auto max-w-4xl px-4 py-8">{children}</div>;
}
