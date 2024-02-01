import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { getPermissions } from "@permissions/_actions";
import { CreatePermissionForm } from "@permissions/_components/create-permissions-form";
import { PermissionsTable } from "@permissions/_components/permissions-table";

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
      <PrimaryAppHeading title="Berechtigungen" />
      <QuickSearchAdd
        modalTitle="Berechtigung anlegen"
        modalDescription="Erstellen Sie hier eine Berechtigung für Ihre Organisation. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreatePermissionForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PermissionsTable />
      </HydrationBoundary>
    </>
  );
}
