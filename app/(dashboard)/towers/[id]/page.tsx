import { notFound } from "next/navigation";
import { TowerDashboard } from "@/components/tower-dashboard";
import { getTowerOverview } from "@/server/queries/get-tower-overview";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { towerId: string };
}) {
  const { towerId } = params;
  const tower = await getTowerOverview(towerId, ["admin"]);

  if (!tower) {
    return notFound();
  }

  return <TowerDashboard tower={tower} />;
}
