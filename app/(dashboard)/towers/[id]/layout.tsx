import { getTower } from "@/server/queries/get-tower";
import { SecondaryPageTabs } from "@/components/secondary-page-tabs";
import {
  IconBroadcast,
  IconCalendarPin,
  IconClipboardPlus,
  IconLayoutDashboard,
  IconUserSearch,
  IconUsersGroup,
} from "@tabler/icons-react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import { TowerHeading } from "@/components/towers/tower/tower-heading";
import { notFound } from "next/navigation";

export const links = [
  {
    value: "/",
    icon: <IconLayoutDashboard size={16} stroke={1.5} />,
    label: "Übersicht",
  },
  {
    value: "tower-day",
    icon: <IconBroadcast size={16} stroke={1.5} />,
    label: "Turm Tag",
  },
  {
    value: "first-aid-operation",
    icon: <IconClipboardPlus size={16} stroke={1.5} />,
    label: "EH Einsätze",
  },
  {
    value: "search-list",
    icon: <IconUserSearch size={16} stroke={1.5} />,
    label: "Personen Suchliste",
  },
  {
    value: "group-registration",
    icon: <IconUsersGroup size={16} stroke={1.5} />,
    label: "Dokumentation Kinder Gruppen",
  },
  {
    value: "duty-plan",
    icon: <IconCalendarPin size={16} stroke={1.5} />,
    label: "Wachplan",
    disabled: true,
  },
];

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  const queryClient = new QueryClient();

  const tower = await queryClient.fetchQuery({
    queryKey: ["tower", id],
    queryFn: async () => await getTower(id),
    staleTime: 0,
  });

  if (!tower) {
    return notFound();
  }
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TowerHeading />
      </HydrationBoundary>
      <SecondaryPageTabs page="towers" links={links} />
      {children}
    </>
  );
}
