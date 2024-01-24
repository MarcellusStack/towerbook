import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { getGroupRegistrations } from "@server/queries/get-group-registrations";
import { GroupRegistrationTable } from "@/components/tables/group-registration-table";
import { CreateGroupRegistrationForm } from "@components/forms/create-group-registration-form";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;

  const queryClient = new QueryClient();

  await queryClient.fetchQuery({
    queryKey: ["group-registrations"],
    queryFn: async () => await getGroupRegistrations(search, []),
    staleTime: 0,
  });

  return (
    <>
      <PrimaryAppHeading title="Dokumentation Kinder Gruppen" />
      <QuickSearchAdd
        modalTitle="Gruppe anlegen"
        modalDescription="Erstellen Sie hier eine Gruppe. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateGroupRegistrationForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GroupRegistrationTable />
      </HydrationBoundary>
    </>
  );
}
