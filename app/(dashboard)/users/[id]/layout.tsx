import { SecondaryPageTabs } from "@/components/secondary-page-tabs";
import {
  IconCalendar,
  IconFileCertificate,
  IconKey,
  IconLayoutDashboard,
  IconUser,
} from "@tabler/icons-react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getUserLayout } from "./_actions";
import { notFound } from "next/navigation";
import { UserLayout } from "@user/[id]/_components/user-layout";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

export const links = [
  {
    value: "/",
    icon: <IconLayoutDashboard size={16} stroke={1.5} />,
    label: "Übersicht",
  },
  {
    value: "account",
    icon: <IconUser size={16} stroke={1.5} />,
    label: "Stammdaten",
  },
  {
    value: "certificate",
    icon: <IconFileCertificate size={16} stroke={1.5} />,
    label: "Zertifikate",
  },
  {
    value: "permission",
    icon: <IconKey size={16} stroke={1.5} />,
    label: "Berechtigungen",
  },
  {
    value: "duty-plan",
    icon: <IconCalendar size={16} stroke={1.5} />,
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

  const user = await queryClient.fetchQuery({
    queryKey: ["user-layout", id],
    queryFn: async () => await getUserLayout(id),
    staleTime: 0,
  });

  if (!user) {
    notFound();
  }
  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserLayout />
      </HydrationBoundary>
      <SecondaryPageTabs page="users" links={links} />
      {children}
    </>
  );
}
