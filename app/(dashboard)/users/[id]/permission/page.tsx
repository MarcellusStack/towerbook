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
  GridCol,
  Grid,
} from "@mantine/core";
import { prisma } from "@/server/db";
import SignUpForm from "@/components/forms/sign-up-form";
import { notFound, redirect } from "next/navigation";
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
import { UserPermissionForm } from "@components/forms/user-permission-form";
import { getUserPermission } from "@server/queries/get-user-permission";
import { getTowers } from "@server/queries/get-towers";
import { TableOfContents } from "@/components/table-of-contents";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const user = await getUserPermission(id, ["admin"]);
  const towers = await getTowers(undefined, ["admin"]);

  if (!user) {
    notFound();
  }

  return (
    <Grid>
      <GridCol span={10}>
        <UserPermissionForm user={user} towers={towers ?? []} />
      </GridCol>
      <GridCol span={2}>
        <TableOfContents />
      </GridCol>
    </Grid>
  );
}
