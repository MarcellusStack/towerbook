"use client";
import { DashboardCard } from "@/components/dashboard-card";
import { TableLoader } from "@/components/loader/table-loader";
import { TowerDayProcess } from "@/components/process";
import { useGetTowerdays } from "@/data/towerdays";
import { Stack, Title, Group, Text, rem } from "@mantine/core";
import { IconBroadcast } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React from "react";

export const DailyTowerdays = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data: towerdays, isPending } = useGetTowerdays(search as string);

  if (isPending || !towerdays) return <TableLoader />;

  return (
    <>
      <DashboardCard
        title={`Tägliche Turmtage vom ${new Date().toLocaleDateString()}`}
        icon={<IconBroadcast size={28} stroke={1.5} />}
      >
        <Stack gap="sm" align="center">
          {towerdays?.map((towerday) => (
            <Group wrap="nowrap">
              <Stack gap={rem(2)}>
                <Text fw={500}>
                  {towerday.tower.name} {towerday.tower.number}
                </Text>
                <Text size="sm" c="dimmed">
                  {towerday.tower.location}
                </Text>
              </Stack>
              <TowerDayProcess towerday={towerday} key={towerday.id} />
              <Stack gap={rem(2)} align="center">
                <Text fw={500}>1/6</Text>
                <Text size="sm" c="dimmed">
                  Prozesse
                </Text>
              </Stack>
            </Group>
          ))}
        </Stack>
      </DashboardCard>
    </>
  );
};
