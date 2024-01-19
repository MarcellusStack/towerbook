import { notFound } from "next/navigation";
import { TowerDayWatchmanPlanForm } from "@/components/forms/tower-day-watchman-plan-form";
import { getTowerDayWatchmanPlan } from "@/server/queries/get-tower-day-watchman-plan";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const towerday = await getTowerDayWatchmanPlan(id, ["admin"]);

  if (!towerday) {
    notFound();
  }

  return <TowerDayWatchmanPlanForm towerday={towerday} />;
}
