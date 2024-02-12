"use client";

import { Divider, Loader, Tabs } from "@mantine/core";
import React, { useTransition } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export type SecondaryPageTabsProps = {
  page: string;
  links: {
    value: string;
    icon: React.ReactNode;
    label: string;
    disabled?: boolean;
  }[];
};

export const SecondaryPageTabs = ({ page, links }: SecondaryPageTabsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { id } = useParams();
  const [isPending, startTransition] = useTransition();
  const [loadingTab, setLoadingTab] = useState<string | null>(null);

  return (
    <Tabs
      variant="pills"
      value={pathname.split("/")[3] ?? "/"}
      onChange={(value) => {
        setLoadingTab(value);
        startTransition(() => router.push(`/${page}/${id}/${value}`));
      }}
    >
      <Tabs.List>
        {links.map((link) => (
          <Tabs.Tab
            disabled={link.disabled && link.disabled}
            key={link.value}
            value={link.value}
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
