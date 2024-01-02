"use client";

import { Divider, Tabs } from "@mantine/core";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

export type PageTabsProps = {
  page: string;
  links: {
    value: string;
    icon: React.ReactNode;
    label: string;
  }[];
};

export const PageTabs = ({ page, links }: PageTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Tabs
      variant="pills"
      value={pathname.split("/")[2] ?? "/"}
      onChange={(value) => router.push(`/${page}/${value}`)}
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
