"use client";

import { Divider, Tabs } from "@mantine/core";
import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

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
        <Tabs.Tab value="/">Übersicht</Tabs.Tab>
        <Tabs.Tab value="account">Stammdaten</Tabs.Tab>
        <Tabs.Tab value="certificate">Zertifikate</Tabs.Tab>
        <Tabs.Tab value="permission">Berechtigungen</Tabs.Tab>
        <Tabs.Tab value="duty-plan">Dienstplan</Tabs.Tab>
      </Tabs.List>
      <Divider mt="sm" />
    </Tabs>
  );
};
