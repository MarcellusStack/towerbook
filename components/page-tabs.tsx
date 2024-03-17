"use client";

import { Divider, Loader, Tabs } from "@mantine/core";
import React, { useTransition } from "react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export type PageTabsProps = {
  page: string;
  links: {
    value: string;
    icon: React.ReactNode;
    label: string;
    disabled?: boolean;
  }[];
};

export const PageTabs = ({ page, links }: PageTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [loadingTab, setLoadingTab] = useState<string | null>(null);

  return (
    <Tabs
      variant="pills"
      value={pathname.split("/")[2] ?? "/"}
      onChange={(value) => {
        setLoadingTab(value);
        startTransition(() => router.push(`/${page}/${value}`));
      }}
    >
      <Tabs.List>
        {links.map((link) => (
          <Tabs.Tab
            key={link.value}
            value={link.value}
            disabled={link.disabled}
            leftSection={
              isPending && loadingTab === link.value ? (
                <Loader color="blue" size="xs" />
              ) : (
                link.icon
              )
            }
          >
            {link.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      <Divider mt="sm" />
    </Tabs>
  );
};
