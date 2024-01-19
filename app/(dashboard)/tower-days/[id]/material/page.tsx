import { notFound } from "next/navigation";
import { getTowerDayMaterial } from "@/server/queries/get-tower-day-material";
import { TowerDayMaterialForm } from "@/components/forms/tower-day-material-form";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const towerday = await getTowerDayMaterial(id, ["admin"]);

  if (!towerday) {
    notFound();
  }

  return <TowerDayMaterialForm towerday={towerday} />;
}
