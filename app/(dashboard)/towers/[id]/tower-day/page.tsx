import { QuickSearchAdd } from "@/components/quick-search-add";
import { TowerDayTable } from "@/components/tables/tower-day-table";
import { CreateTowerDayForm } from "@/components/forms/create-tower-day-form";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getTowerTowerDays } from "@/server/queries/tower";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["towerdays", id],
    queryFn: async () => await getTowerTowerDays(id, []),
    staleTime: 0,
  });

  return (
    <>
      <QuickSearchAdd
        modalTitle="Turm Tag anlegen"
        modalDescription="Erstellen Sie hier Tage für Ihren Turm. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerDayForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TowerDayTable />
      </HydrationBoundary>
    </>
  );
}
