import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { CreateTowerForm } from "@/components/forms/create-tower-form";
import { getTowerDays } from "@/server/queries/tower-days";
import { TowerDaysTable } from "@/components/tables/tower-days-table";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;
  const towerdays = await getTowerDays(search, ["admin"]);

  return (
    <>
      <PrimaryAppHeading title="Turm Tage" />
      <QuickSearchAdd
        modalTitle="Turm Tag anlegen"
        modalDescription="Erstellen Sie hier Turm Tage für Ihre Organisation. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerForm />}
      />
      <TowerDaysTable towerdays={towerdays} />
    </>
  );
}
