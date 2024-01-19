import { QuickSearchAdd } from "@/components/quick-search-add";
import { getTowerDays } from "@/server/queries/get-tower-days";
import { TowerDayTable } from "@/components/tables/tower-day-table";
import { CreateTowerDayForm } from "@/components/forms/create-tower-day-form";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const { towerdays } = await getTowerDays(id, ["admin"]);

  return (
    <>
      <QuickSearchAdd
        modalTitle="Turm Tag anlegen"
        modalDescription="Erstellen Sie hier Tage für Ihren Turm. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerDayForm />}
      />
      <TowerDayTable towerdays={towerdays ?? []} />
    </>
  );
}
