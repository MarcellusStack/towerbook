import { QuickSearchAdd } from "@/components/quick-search-add";
import { TowerFirstAidOperationTable } from "@components/tables/tower-first-aid-operation-table";
import { getTowerFirstAidOperations } from "@server/queries/get-tower-first-aid-operations";
import { CreateTowerFirstAidOperationForm } from "@components/forms/create-tower-first-aid-operation-form";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const operations = await getTowerFirstAidOperations(id, ["admin"]);

  return (
    <>
      <QuickSearchAdd
        modalTitle="Einsatz anlegen"
        modalDescription="Erstellen Sie hier einen Einsatz. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerFirstAidOperationForm />}
      />
      <TowerFirstAidOperationTable operations={operations} />
    </>
  );
}
