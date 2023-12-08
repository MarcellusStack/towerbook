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
import { CreateUserForm } from "@components/forms/create-user-form";
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
import { FirstAidOperationTable } from "@components/tables/first-aid-operation-table";
import { getFirstAidOperations } from "@server/queries/get-first-aid-operations";
import { CreateFirstAidOperationForm } from "@components/forms/create-first-aid-operation-form";

export const dynamic = "force-dynamic";

export default async function Page() {
  const operations = await getFirstAidOperations("", ["admin"]);

  return (
    <>
      <PrimaryAppHeading title="Erste-Hilfe Einsatz" />
      <QuickSearchAdd
        modalTitle="Einsatz anlegen"
        modalDescription="Erstellen Sie hier einen Einsatz. Klicken Sie auf 'Hinzufügen', wenn Sie fertig sind."
        modalContent={<CreateFirstAidOperationForm />}
      />
      <FirstAidOperationTable operations={operations} />
    </>
  );
}
