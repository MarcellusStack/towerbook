import { QuickSearchAdd } from "@/components/quick-search-add";
import { getTowerSearchLists } from "@server/queries/get-tower-search-list";
import { TowerSearchListTable } from "@components/tables/tower-search-list-table";
import { CreateTowerSearchListForm } from "@components/forms/create-tower-search-list-form";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const searchlists = await getTowerSearchLists(id, ["admin"]);

  return (
    <>
      <QuickSearchAdd
        modalTitle="Suche anlegen"
        modalDescription="Erstellen Sie hier einen Sucheintrag. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerSearchListForm />}
      />
      <TowerSearchListTable searchlists={searchlists} />
    </>
  );
}
