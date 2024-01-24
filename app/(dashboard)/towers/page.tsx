import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { getTowers } from "@/server/queries/tower";
import { CreateTowerForm } from "@/components/forms/create-tower-form";
import { TowerTable } from "@/components/tables/tower-table";

import {
  QueryClient,
  HydrationBoundary,
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

  await queryClient.prefetchQuery({
    queryKey: ["towers"],
    queryFn: async () => await getTowers(search, []),
    staleTime: 0,
  });

  return (
    <>
      <PrimaryAppHeading title="Türme" />
      <QuickSearchAdd
        modalTitle="Turm anlegen"
        modalDescription="Erstellen Sie hier einen Turm für Ihre Organisation. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TowerTable />
      </HydrationBoundary>
    </>
  );
}
