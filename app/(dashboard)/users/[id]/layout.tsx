import RoleBadge from "@components/role-badge";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { getUser } from "@server/queries/get-user";
import { UserTabs } from "@components/user-tabs";
import { SecondaryPageTabs } from "@/components/secondary-page-tabs";
import {
  IconCalendar,
  IconFileCertificate,
  IconKey,
  IconLayoutDashboard,
  IconUser,
} from "@tabler/icons-react";
import { Group, Text } from "@mantine/core";

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
  const user = await getUser(id, ["admin"]);
  return (
    <>
      <SecondaryAppHeading
        title={`Benutzer`}
        extraInfo={
          <Group gap="sm">
            <Text size="lg" c="dimmed">
              {user.firstName} {user.lastName}
            </Text>
            <RoleBadge user={user} />
          </Group>
        }
      />
      <SecondaryPageTabs page="users" links={links} />
      {children}
    </>
  );
}
