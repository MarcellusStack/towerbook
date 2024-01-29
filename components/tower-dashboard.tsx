"use client";

import React from "react";
import {
  Button,
  Card,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import Image from "next/image";
import { useActionNotification } from "@/hooks/use-action-notification";
import { updateTowerStatus } from "@/server/queries/tower";
import { towerStatus } from "@/constants";
import { useParams } from "next/navigation";
import { useGetTowerOverview } from "@data/tower";
import { TowerStatus } from "@towers/_components/tower-status";

export const TowerDashboard = () => {
  const { execute, result, status } = useActionNotification({
    action: updateTowerStatus,
    executeNotification: `Turm Status wird aktualisiert`,
  });
  const { id } = useParams();
  const { data: tower, isPending } = useGetTowerOverview(id as string);

  if (isPending || !tower) return "Loading...";

  return (
    <>
      <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm">
        <Card withBorder>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={700} size="xl">
                Status
              </Text>
              <TowerStatus status={tower.status} />
            </Group>
            <Select
              disabled={status === "executing"}
              data={towerStatus}
              value={tower.status}
              onChange={(value: string | null) =>
                execute({ id: tower.id, status: value })
              }
            />
          </Stack>
        </Card>
      </SimpleGrid>
    </>
  );
};
