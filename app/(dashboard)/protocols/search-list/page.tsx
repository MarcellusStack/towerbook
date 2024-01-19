import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { SearchListTable } from "@components/tables/search-list-table";
import { CreateSearchListForm } from "@components/forms/create-search-list-form";
import { getSearchLists } from "@/server/queries/get-search-lists";

export const dynamic = "force-dynamic";

export default async function Page() {
  const searchlists = await getSearchLists("", ["admin"]);
  return (
    <>
      <PrimaryAppHeading title="Personen Suchliste" />
      <QuickSearchAdd
        modalTitle="Suche anlegen"
        modalDescription="Erstellen Sie hier einen Sucheintrag. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateSearchListForm />}
      />
      <SearchListTable searchlists={searchlists} />
    </>
  );
}
