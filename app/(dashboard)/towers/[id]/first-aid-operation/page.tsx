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
import { SecondaryAppHeading } from "@components/typography/secondary-app-heading";
import { getUser } from "@server/queries/get-user";
import type { Profile } from "@prisma/client";
import { roles } from "@/constants/roles";
import RoleBadge from "@/components/role-badge";
import UserDashboard from "@components/user-dashboard";
import { getUserOverview } from "@/server/queries/get-user-overview";
import { TowerFirstAidOperationTable } from "@components/tables/tower-first-aid-operation-table";
import { getTowerFirstAidOperations } from "@server/queries/get-tower-first-aid-operations";
import { CreateTowerFirstAidOperationForm } from "@components/forms/create-tower-first-aid-operation-form";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const operations = await getTowerFirstAidOperations(id, ["admin"]);

  return (
    <>
      <QuickSearchAdd
        modalTitle="Einsatz anlegen"
        modalDescription="Erstellen Sie hier einen Einsatz. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateTowerFirstAidOperationForm />}
      />
      <TowerFirstAidOperationTable operations={operations} />
    </>
  );
}
