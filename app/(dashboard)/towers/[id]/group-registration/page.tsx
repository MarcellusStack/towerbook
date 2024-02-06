import { QuickSearchAdd } from "@/components/quick-search-add";
import { CreateTowerGroupRegistrationForm } from "@/components/forms/create-tower-group-registration-form";
import { getTowerGroupRegistrations } from "@server/queries/get-tower-group-registrations";
import { TowerGroupRegistrationTable } from "@components/tables/tower-group-registration-table";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tower-group-registrations", id],
    queryFn: async () => await getTowerGroupRegistrations(id),
    staleTime: 0,
  });

  return (
    <>
      <QuickSearchAdd
        modalTitle="Gruppe anlegen"
        modalDescription="Erstellen Sie hier eine Gruppe. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerGroupRegistrationForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TowerGroupRegistrationTable />
      </HydrationBoundary>
    </>
  );
}
