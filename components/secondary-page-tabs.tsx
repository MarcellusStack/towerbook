"use client";

import { Divider, Tabs, rem } from "@mantine/core";
import React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import {
  IconCalendar,
  IconFileCertificate,
  IconKey,
  IconLayoutDashboard,
  IconUser,
} from "@tabler/icons-react";

export type SecondaryPageTabsProps = {
  page: string;
  links: {
    value: string;
    icon: React.ReactNode;
    label: string;
  }[];
};

export const SecondaryPageTabs = ({ page, links }: SecondaryPageTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  return (
    <Tabs
      variant="pills"
      value={pathname.split("/")[3] ?? "/"}
      onChange={(value) => router.push(`/${page}/${id}/${value}`)}
    >
      <Tabs.List>
        {links.map((link) => (
          <Tabs.Tab key={link.value} value={link.value} leftSection={link.icon}>
            {link.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Divider mt="sm" />
    </Tabs>
  );
};
