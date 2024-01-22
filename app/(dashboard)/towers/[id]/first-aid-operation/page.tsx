import { QuickSearchAdd } from "@/components/quick-search-add";
import { TowerFirstAidOperationTable } from "@components/tables/tower-first-aid-operation-table";
import { getTowerFirstAidOperations } from "@server/queries/get-tower-first-aid-operations";
import { CreateTowerFirstAidOperationForm } from "@components/forms/create-tower-first-aid-operation-form";
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
    queryKey: ["tower-first-aid-operations", id],
    queryFn: async () => await getTowerFirstAidOperations(id, []),
    staleTime: 0,
  });

  return (
    <>
      <QuickSearchAdd
        modalTitle="Einsatz anlegen"
        modalDescription="Erstellen Sie hier einen Einsatz. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerFirstAidOperationForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TowerFirstAidOperationTable />
      </HydrationBoundary>
    </>
  );
}
