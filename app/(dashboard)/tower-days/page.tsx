import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { getTowerDays } from "@/server/queries/tower-days";
import { TowerDaysTable } from "@/components/tables/tower-days-table";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { CreateTowerDaysForm } from "@towerdays/_components/create-towerdays-form";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tower-days"],
    queryFn: async () => await getTowerDays(search, []),
    staleTime: 0,
  });

  return (
    <>
      <PrimaryAppHeading title="Turm Tage" />
      <QuickSearchAdd
        modalTitle="Turm Tag anlegen"
        modalDescription="Erstellen Sie hier Turm Tage für Ihre Organisation. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerDaysForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TowerDaysTable />
      </HydrationBoundary>
    </>
  );
}
