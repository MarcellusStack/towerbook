"use client";
import { TableLoader } from "@/components/loader/table-loader";
import { useGetTowerdays } from "@/data/towerdays";
import { Divider, Tabs } from "@mantine/core";
import { IconBroadcast, IconCalendarEvent } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { TowerdaysTable } from "@towerdays/_components/tower-days-table";
import { DailyTowerdaysTable } from "@towerdays/_components/daily-towerdays-table";

export const Towerdays = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: towerdays, isPending } = useGetTowerdays(search as string);

  if (isPending || !towerdays) return <TableLoader />;
  return (
    <>
      <Tabs variant="pills" defaultValue="towerdays">
        <Tabs.List>
          <Tabs.Tab
            value="towerdays"
            leftSection={<IconBroadcast size={16} stroke={1.5} />}
          >
            Alle Turmtage
          </Tabs.Tab>
          <Tabs.Tab
            value="daily-towerdays"
            leftSection={<IconCalendarEvent size={16} stroke={1.5} />}
          >
            Tägliche Turmtage
          </Tabs.Tab>
        </Tabs.List>
        <Divider my="sm" />

        <Tabs.Panel value="towerdays">
          <TowerdaysTable towerdays={towerdays} />
        </Tabs.Panel>

        <Tabs.Panel value="daily-towerdays">
          <DailyTowerdaysTable towerdays={towerdays} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};
