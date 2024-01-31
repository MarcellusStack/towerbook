import { QuickSearchAdd } from "@/components/quick-search-add";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { CreateTowerDaysForm } from "@towerdays/_components/create-towerdays-form";
import { getPermissions } from "@permissions/_actions";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["permissions", search],
    queryFn: async () => await getPermissions(search),
    staleTime: 0,
  });

  return (
    <>
      <QuickSearchAdd
        modalTitle="Berechtigung anlegen"
        modalDescription="Erstellen Sie hier Berechtigungen für Ihre Organisation. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreatePermissionForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PermissionsTable />
      </HydrationBoundary>
    </>
  );
}
