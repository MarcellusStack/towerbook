import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { getUsers } from "@server/queries/get-users";
import { InviteUserForm } from "@/components/forms/invite-user-form";
import { getInvitations } from "@server/queries/get-invitations";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Users } from "@users/_components/users";
import { UserForm } from "@users/_components/user-form";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["users", search],
    queryFn: async () => await getUsers(search),
    staleTime: 0,
  });

  await queryClient.prefetchQuery({
    queryKey: ["invitations", search],
    queryFn: async () => await getInvitations(search),
    staleTime: 0,
  });

  return (
    <>
      <PrimaryAppHeading title="Benutzer" />
      <QuickSearchAdd
        modalTitle="Benutzer einladen"
        modalDescription="Laden Sie hier Benutzer für Ihre Organisation ein. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<UserForm />}
      />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Users />
      </HydrationBoundary>
    </>
  );
}
