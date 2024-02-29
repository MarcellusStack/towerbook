import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { AccomodationsTable } from "@accomodations/_components/accomodations-table";
import { getAccomodations } from "@accomodations/_actions";
import { CreateAccomodationForm } from "@accomodations/_components/create-accomodation-form";
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
    queryKey: ["accomodations", search],
    queryFn: async () => await getAccomodations(search),
    staleTime: 0,
  });

  return (
    <>
      <PrimaryAppHeading title="Unterkünfte" />
      <QuickSearchAdd
        modalTitle="Unterkunft anlegen"
        modalDescription="Erstellen Sie hier eine Unterkunft. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateAccomodationForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AccomodationsTable />
      </HydrationBoundary>
    </>
  );
}
