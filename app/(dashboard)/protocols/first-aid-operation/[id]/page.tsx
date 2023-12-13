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
import { TowerDayWeatherForm } from "@/components/forms/tower-day-weather-form";
import { getTowerDayWeather } from "@/server/queries/get-tower-day-weather";
import { getSearchList } from "@server/queries/get-search-list";
import { SearchListForm } from "@components/forms/search-list-form";
import { getFirstAidOperation } from "@server/queries/get-first-aid-operation";
import { FirstAidOperationBigForm } from "@/components/forms/first-aid-operation-big-form";
import { TableOfContents } from "@components/table-of-contents";
import { FirstAidOperationSmallForm } from "@components/forms/first-aid-operation-small-form";

export const dynamic = "force-dynamic";

const links = [
  { label: "Einsatz Informationen", link: "#operation-infos" },
  { label: "Insert your title here", link: "#insert-your-title-here" },
  { label: "Alarmierung durch", link: "#alarm" },
  { label: "Eingesetzte Kräfte", link: "#forces-deployed" },
  { label: "Eingesetzte Rettungsmittel", link: "#rescue-equipment-used" },
  { label: "weitere Einsatzkräfte", link: "#additional-emergency-services" },
  { label: "Einsatzart", link: "#type-of-use" },
  { label: "Erkrankungen", link: "#diseases" },
  { label: "Notfallgeschehen", link: "#emergency-event" },
  { label: "Verletzungen", link: "#diseases" },
  { label: "Messwerte", link: "#measurements" },
  { label: "Bewusstsein", link: "#conciousness" },
  { label: "Atmung", link: "#breathing" },
  { label: "Kreislauf", link: "#circuit" },
  { label: "Schmerzen", link: "#pain" },
  { label: "Maßnahmen", link: "#measures" },
  { label: "Ergebnis", link: "#result" },
  { label: "Übergabe an", link: "#handover-to" },
  { label: "Ersthelfer / Zeuge", link: "#first-responder-witness" },
];

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const operation = await getFirstAidOperation(id, ["admin"]);

  return (
    <>
      {operation.type === "big" ? (
        <FirstAidOperationBigForm operation={operation} />
      ) : (
        <FirstAidOperationSmallForm operation={operation} />
      )}
      <TableOfContents links={links} />
    </>
  );
}
