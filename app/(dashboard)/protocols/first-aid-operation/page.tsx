import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { FirstAidOperationTable } from "@components/tables/first-aid-operation-table";
import { getFirstAidOperations } from "@server/queries/get-first-aid-operations";
import { CreateFirstAidOperationForm } from "@components/forms/create-first-aid-operation-form";
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

  await queryClient.prefetchQuery({
    queryKey: ["first-aid-operations"],
    queryFn: async () => await getFirstAidOperations(search, []),
    staleTime: 0,
  });

  return (
    <>
      <PrimaryAppHeading title="Erste-Hilfe Einsatz" />
      <QuickSearchAdd
        modalTitle="Einsatz anlegen"
        modalDescription="Erstellen Sie hier einen Einsatz. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateFirstAidOperationForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <FirstAidOperationTable />
      </HydrationBoundary>
    </>
  );
}
