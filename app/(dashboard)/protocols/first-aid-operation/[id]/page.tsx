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
import { TowerDayWeatherForm } from "@/components/forms/tower-day-weather-form";
import { getTowerDayWeather } from "@/server/queries/get-tower-day-weather";
import { getSearchList } from "@server/queries/get-search-list";
import { SearchListForm } from "@components/forms/search-list-form";
import { getFirstAidOperation } from "@server/queries/get-first-aid-operation";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const operation = await getFirstAidOperation(id, ["admin"]);

  return "Formular Operation";
}
