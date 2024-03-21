"use client";
import { ButtonAction } from "@/components/button-action";
import { ButtonModalAction } from "@/components/button-modal-action";
import { DashboardCard } from "@/components/dashboard-card";
import { TableLoader } from "@/components/loader/table-loader";
import { TowerDayProcess } from "@/components/process";
import { useGetTowerdays } from "@/data/towerdays";
import { Stack, Title, Group, Text, rem, ScrollArea } from "@mantine/core";
import { IconBroadcast, IconChecklist } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import React from "react";
import { completeTowerDays } from "@towerdays/_actions";

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
            <ScrollArea w="100%">
              <Group wrap="nowrap" gap="sm">
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
            </ScrollArea>
          ))}
          <ButtonModalAction
            className="self-end"
            color="green"
            leftSection={<IconChecklist />}
            content={
              <ButtonAction
                label="Aktion wird ausgeführt"
                action={completeTowerDays}
                values={{ ids: towerdays.map((towerday) => towerday.id) }}
              >
                Alle Turmtage abschließen
              </ButtonAction>
            }
          >
            Alle Turmtage abschließen
          </ButtonModalAction>
        </Stack>
      </DashboardCard>
    </>
  );
};
