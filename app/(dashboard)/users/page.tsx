import { useDisclosure } from "@mantine/hooks";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  Title,
  Text,
  Button,
  AppShell,
  Burger,
  Group,
  Skeleton,
  Anchor,
  Center,
  Loader,
  Divider,
} from "@mantine/core";
import { prisma } from "@/server/db";
import SignUpForm from "@/components/forms/sign-up-form";
import { redirect } from "next/navigation";
import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { UsersTable } from "@/components/tables/user-table";
import { getUsers } from "@server/queries/get-users";
import { InviteUserForm } from "@/components/forms/invite-user-form";
import { QuickSearch } from "@components/quick-search";
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
