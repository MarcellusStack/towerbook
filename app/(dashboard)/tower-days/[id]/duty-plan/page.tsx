import { notFound } from "next/navigation";
import { TowerDayDutyPlanForm } from "@/components/forms/tower-day-duty-plan-form";
import { getTowerDayDutyPlan } from "@/server/queries/get-tower-day-duty-plan";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const towerday = await getTowerDayDutyPlan(id, ["admin"]);

  if (!towerday) {
    notFound();
  }

  return <TowerDayDutyPlanForm towerday={towerday} />;
}
