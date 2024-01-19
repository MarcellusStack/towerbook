import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { getGroupRegistrations } from "@server/queries/get-group-registrations";
import { GroupRegistrationTable } from "@/components/tables/group-registration-table";
import { CreateGroupRegistrationForm } from "@components/forms/create-group-registration-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const groups = await getGroupRegistrations("", ["admin"]);

  return (
    <>
      <PrimaryAppHeading title="Dokumentation Kinder Gruppen" />
      <QuickSearchAdd
        modalTitle="Gruppe anlegen"
        modalDescription="Erstellen Sie hier eine Gruppe. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateGroupRegistrationForm />}
      />
      <GroupRegistrationTable groups={groups} />
    </>
  );
}
