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
import { CreateUserForm } from "@components/forms/create-user-form";
import { SecondaryAppHeading } from "@components/typography/secondary-app-heading";
import { getUser } from "@server/queries/get-user";
import type { Profile } from "@prisma/client";
import { roles } from "@/constants/roles";
import RoleBadge from "@/components/role-badge";
import UserDashboard from "@components/user-dashboard";
import { getUserOverview } from "@/server/queries/get-user-overview";
import { getTowerDayOverview } from "@/server/queries/get-tower-day-overview";
import { TowerDayWatchmanPlanForm } from "@/components/forms/tower-day-watchman-plan-form";
import { getTowerDayWatchmanPlan } from "@/server/queries/get-tower-day-watchman-plan";
import { getTowerDayTodo } from "@/server/queries/get-tower-day-todo";
import { TowerDayTodoForm } from "@/components/forms/tower-day-todo-form";
import { getTowerDayIncident } from "@/server/queries/get-tower-day-incident";
import { TowerDayIncidentForm } from "@/components/forms/tower-day-incident-form";
import { TowerDayDutyPlanForm } from "@/components/forms/tower-day-duty-plan-form";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  /* const towerday = await getTowerDayIncident(id, ["admin"]); */

  return <TowerDayDutyPlanForm />;
}
