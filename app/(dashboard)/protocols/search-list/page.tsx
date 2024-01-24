import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { SearchListTable } from "@components/tables/search-list-table";
import { CreateSearchListForm } from "@components/forms/create-search-list-form";
import { getSearchLists } from "@/server/queries/get-search-lists";
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
    queryKey: ["search-lists"],
    queryFn: async () => await getSearchLists(search, []),
    staleTime: 0,
  });
  return (
    <>
      <PrimaryAppHeading title="Personen Suchliste" />
      <QuickSearchAdd
        modalTitle="Suche anlegen"
        modalDescription="Erstellen Sie hier einen Sucheintrag. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateSearchListForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SearchListTable />
      </HydrationBoundary>
    </>
  );
}
