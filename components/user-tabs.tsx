"use client";

import { Divider, Tabs } from "@mantine/core";
import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  IconCalendar,
  IconFileCertificate,
  IconKey,
  IconLayoutDashboard,
  IconUser,
} from "@tabler/icons-react";

export const UserTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useParams();
  return (
    <Tabs
      variant="pills"
      value={pathname.split("/")[3] ?? "/"}
      onChange={(value) => router.push(`/users/${userId}/${value}`)}
    >
      <Tabs.List>
        <Tabs.Tab
          value="/"
          leftSection={<IconLayoutDashboard size={16} stroke={1.5} />}
        >
          Übersicht
        </Tabs.Tab>
        <Tabs.Tab
          value="account"
          leftSection={<IconUser size={16} stroke={1.5} />}
        >
          Stammdaten
        </Tabs.Tab>
        <Tabs.Tab
          value="certificate"
          leftSection={<IconFileCertificate size={16} stroke={1.5} />}
        >
          Zertifikate
        </Tabs.Tab>
        <Tabs.Tab
          value="permission"
          leftSection={<IconKey size={16} stroke={1.5} />}
        >
          Berechtigungen
        </Tabs.Tab>
        <Tabs.Tab
          value="duty-plan"
          leftSection={<IconCalendar size={16} stroke={1.5} />}
        >
          Dienstplan
        </Tabs.Tab>
      </Tabs.List>
      <Divider mt="sm" />
    </Tabs>
  );
};
