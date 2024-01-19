import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { FirstAidOperationTable } from "@components/tables/first-aid-operation-table";
import { getFirstAidOperations } from "@server/queries/get-first-aid-operations";
import { CreateFirstAidOperationForm } from "@components/forms/create-first-aid-operation-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const operations = await getFirstAidOperations("", ["admin"]);

  return (
    <>
      <PrimaryAppHeading title="Erste-Hilfe Einsatz" />
      <QuickSearchAdd
        modalTitle="Einsatz anlegen"
        modalDescription="Erstellen Sie hier einen Einsatz. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateFirstAidOperationForm />}
      />
      <FirstAidOperationTable operations={operations} />
    </>
  );
}
