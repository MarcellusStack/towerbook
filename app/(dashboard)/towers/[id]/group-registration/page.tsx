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
  Tabs,
  Badge,
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
import { SecondaryAppHeading } from "@components/typography/secondary-app-heading";
import { getUser } from "@server/queries/get-user";
import type { Profile } from "@prisma/client";
import { roles } from "@/constants/roles";
import RoleBadge from "@/components/role-badge";
import UserDashboard from "@components/user-dashboard";
import { getUserOverview } from "@/server/queries/get-user-overview";
import { CreateTowerGroupRegistrationForm } from "@/components/forms/create-tower-group-registration-form";
import { getTowerGroupRegistrations } from "@server/queries/get-tower-group-registrations";
import { TowerGroupRegistrationTable } from "@components/tables/tower-group-registration-table";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const groups = await getTowerGroupRegistrations(id, ["admin"]);

  return (
    <>
      <QuickSearchAdd
        modalTitle="Gruppe anlegen"
        modalDescription="Erstellen Sie hier eine Gruppe. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerGroupRegistrationForm />}
      />
      <TowerGroupRegistrationTable groups={groups} />
    </>
  );
}
