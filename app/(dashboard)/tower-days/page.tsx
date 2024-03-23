import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { getTowerDays } from "@/server/queries/tower-days";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { CreateTowerDaysForm } from "@towerdays/_components/create-towerdays-form";
import { Towerdays } from "@towerdays/_components/towerdays";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { createdAt: string };
}) {
  const { createdAt } = searchParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tower-days", createdAt],
    queryFn: async () => await getTowerDays(createdAt),
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
        <Towerdays />
      </HydrationBoundary>
    </>
  );
}
