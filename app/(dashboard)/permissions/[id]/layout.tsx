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

import { notFound } from "next/navigation";
import { PermissionLayout } from "./_components/permission-layout";
import { getPermission } from "@permissions/[id]/_actions";

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
    label: "Dienstplan",
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

  const permission = await queryClient.fetchQuery({
    queryKey: ["permission", id],
    queryFn: async () => await getPermission(id),
    staleTime: 0,
  });

  if (!permission) {
    return notFound();
  }
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PermissionLayout />
      </HydrationBoundary>
      {children}
    </>
  );
}
