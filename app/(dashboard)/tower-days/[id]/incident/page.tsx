import { notFound } from "next/navigation";
import { getTowerDayIncident } from "@/server/queries/get-tower-day-incident";
import { TowerDayIncidentForm } from "@/components/forms/tower-day-incident-form";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const towerday = await getTowerDayIncident(id, ["admin"]);

  if (!towerday) {
    notFound();
  }

  return <TowerDayIncidentForm towerday={towerday} />;
}
