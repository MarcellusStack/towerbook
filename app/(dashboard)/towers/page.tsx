import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { getTowers } from "@/server/queries/get-towers";
import { CreateTowerForm } from "@/components/forms/create-tower-form";
import { TowerTable } from "@/components/tables/tower-table";
import { Tower } from "@prisma/client";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;
  const towers = (await getTowers(search, [])) as Tower[];

  return (
    <>
      <PrimaryAppHeading title="Türme" />

      <QuickSearchAdd
        modalTitle="Turm anlegen"
        modalDescription="Erstellen Sie hier einen Turm für Ihre Organisation. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerForm />}
      />
      <TowerTable towers={towers ?? []} />
    </>
  );
}
