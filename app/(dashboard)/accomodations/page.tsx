import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { Accomodations } from "@services/accomodation/components/accomodations";
import { getAccomodations } from "@/services/accomodation/queries";
import { CreateAccomodationForm } from "@/services/accomodation/components/create-accomodation-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const accomodations = await getAccomodations("", ["admin"]);

  return (
    <>
      <PrimaryAppHeading title="Unterkünfte" />
      <QuickSearchAdd
        modalTitle="Unterkunft anlegen"
        modalDescription="Erstellen Sie hier eine Unterkunft. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateAccomodationForm />}
      />
      <Accomodations accomodations={accomodations || []} />
    </>
  );
}
