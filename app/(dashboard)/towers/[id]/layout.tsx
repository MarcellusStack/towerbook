import RoleBadge from "@components/role-badge";
import { SecondaryAppHeading } from "@/components/typography/secondary-app-heading";
import { getUser } from "@server/queries/get-user";
import { UserTabs } from "@components/user-tabs";
import { Group, Text } from "@mantine/core";
import { getTower } from "@/server/queries/get-tower";
import { SecondaryPageTabs } from "@/components/secondary-page-tabs";
import {
  IconBroadcast,
  IconCalendarPin,
  IconCheckupList,
  IconClipboardPlus,
  IconLayoutDashboard,
  IconUserSearch,
  IconUsersGroup,
} from "@tabler/icons-react";

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
    label: "Suchliste",
  },
  {
    value: "group-registration",
    icon: <IconUsersGroup size={16} stroke={1.5} />,
    label: "Gruppen Anmeldung",
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
  const tower = await getTower(id, ["admin"]);
  return (
    <>
      <SecondaryAppHeading
        title={`Turm ${tower.number}`}
        extraInfo={
          <Group>
            <Text size="lg" c="dimmed">
              {tower.name}
            </Text>
            <Text size="lg" c="dimmed">
              {tower.location}
            </Text>
          </Group>
        }
      />
      <SecondaryPageTabs page="towers" links={links} />
      {children}
    </>
  );
}
