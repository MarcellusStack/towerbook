import { Title, Divider } from "@mantine/core";
import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { UsersTable } from "@/components/tables/user-table";
import { getUsers } from "@server/queries/get-users";
import { InviteUserForm } from "@/components/forms/invite-user-form";
import { UserInvitationsTable } from "@components/tables/user-invitation-table";
import { getInvitations } from "@server/queries/get-invitations";

export const dynamic = "force-dynamic";

export default async function Page({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const { search } = searchParams;
  const usersPromise = getUsers(search, ["admin"]);
  const invitationsPromise = getInvitations([]);

  const [users, invitations] = await Promise.all([
    usersPromise,
    invitationsPromise,
  ]);

  return (
    <>
      <PrimaryAppHeading title="Benutzer" />
      <QuickSearchAdd
        modalTitle="Benutzer anlegen"
        modalDescription="Erstellen Sie hier Benutzer für Ihre Organisation. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<InviteUserForm />}
      />
      <UsersTable users={users ?? []} />
      <Title order={2} size="h2" fw={700}>
        Einladungen
      </Title>
      <Divider />
      <UserInvitationsTable invitations={invitations} />
    </>
  );
}
