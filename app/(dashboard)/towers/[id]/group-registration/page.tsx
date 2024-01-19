import { QuickSearchAdd } from "@/components/quick-search-add";
import { CreateTowerGroupRegistrationForm } from "@/components/forms/create-tower-group-registration-form";
import { getTowerGroupRegistrations } from "@server/queries/get-tower-group-registrations";
import { TowerGroupRegistrationTable } from "@components/tables/tower-group-registration-table";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const groups = await getTowerGroupRegistrations(id, ["admin"]);

  return (
    <>
      <QuickSearchAdd
        modalTitle="Gruppe anlegen"
        modalDescription="Erstellen Sie hier eine Gruppe. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerGroupRegistrationForm />}
      />
      <TowerGroupRegistrationTable groups={groups} />
    </>
  );
}
