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
} from "@mantine/core";
import { prisma } from "@/server/db";
import SignUpForm from "@/components/forms/sign-up-form";
import { redirect } from "next/navigation";
import { PrimaryAppHeading } from "@components/typography/primary-app-heading";
import { QuickSearchAdd } from "@/components/quick-search-add";
import { UsersTable } from "@/components/tables/user-table";
import { getUsers } from "@server/queries/get-users";
import { CreateUserForm } from "@components/forms/create-user-form";
import { SecondaryAppHeading } from "@components/typography/secondary-app-heading";
import { getUser } from "@server/queries/get-user";
import UserTabs from "@/components/user-tabs";
import type { Profile } from "@prisma/client";
import { roles } from "@/constants/roles";
import RoleBadge from "@/components/role-badge";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  const user = await getUser(userId, ["admin"]);

  //query towers that belong to the organization for permissions

  return (
    <>
      {/* <SecondaryAppHeading
        title={`Benutzer`}
        childName={`${user.firstName} ${user.lastName}`}
        extraInfo={<RoleBadge user={user} />}
      /> */}
      {/* <UserTabs  /> */}
    </>
  );
}
