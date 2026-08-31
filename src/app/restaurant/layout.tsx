import { requireRole } from "@/lib/profile";

export default async function RestaurantLayout({ children }: LayoutProps<"/restaurant">) {
  await requireRole("restaurant");
  return <div className="mx-auto max-w-4xl px-4 py-8">{children}</div>;
}
