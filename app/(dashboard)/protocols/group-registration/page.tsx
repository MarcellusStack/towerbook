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
  Card,
  Stack,
  Box,
  ThemeIcon,
  SimpleGrid,
} from "@mantine/core";
import { prisma } from "@/server/db";
import SignUpForm from "@/components/forms/sign-up-form";
import { redirect } from "next/navigation";
import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { UsersTable } from "@/components/tables/user-table";
import { getUsers } from "@server/queries/get-users";
import { CreateUserForm } from "@/components/forms/invite-user-form";
import { getTowers } from "@/server/queries/get-towers";
import { CreateTowerForm } from "@/components/forms/create-tower-form";
import { TowerTable } from "@/components/tables/tower-table";
import { Tower } from "@prisma/client";
import {
  IconFirstAidKit,
  IconUserSearch,
  IconWriting,
} from "@tabler/icons-react";
import { Protocols } from "@/components/protocols";
import { protocolLinks } from "@constants/protocol-links";
import { Suspense } from "react";
import { SearchListTable } from "@components/tables/search-list-table";
import { CreateSearchListForm } from "@components/forms/create-search-list-form";
import { getSearchLists } from "@/server/queries/get-search-lists";
import { getGroupRegistrations } from "@server/queries/get-group-registrations";
import { GroupRegistrationTable } from "@/components/tables/group-registration-table";
import { CreateGroupRegistrationForm } from "@components/forms/create-group-registration-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const groups = await getGroupRegistrations("", ["admin"]);
  return (
    <>
      <PrimaryAppHeading title="Gruppenanmeldung" />
      <QuickSearchAdd
        modalTitle="Gruppe anlegen"
        modalDescription="Erstellen Sie hier eine Gruppe. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateGroupRegistrationForm />}
      />
      <GroupRegistrationTable groups={groups} />
    </>
  );
}
