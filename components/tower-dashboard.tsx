"use client";

import React from "react";
import {
  Avatar,
  Card,
  Group,
  List,
  Select,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { Calendar } from "@mantine/dates";
import {
  IconBuildingBroadcastTower,
  IconCalendar,
  IconMail,
  IconPhone,
  IconUser,
  IconWriting,
} from "@tabler/icons-react";
import FullCalendar from "@fullcalendar/react";
import deLocale from "@fullcalendar/core/locales/de";
import { IconAlertCircle } from "@tabler/icons-react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { TowerOverviewProps } from "@/server/queries/get-tower-overview";
import Image from "next/image";
import { useActionNotification } from "@/hooks/use-action-notification";
import { updateTowerStatus } from "@/server/queries/tower";
import { towerStatus } from "@/constants";

export const TowerDashboard = ({ tower }: { tower: TowerOverviewProps }) => {
  const { execute, result, status } = useActionNotification({
    action: updateTowerStatus,
    executeNotification: `Turm Status wird aktualisiert`,
  });
  return (
    <>
      <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm">
        <Card withBorder>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={700} size="xl">
                Status
              </Text>
              <Image
                src={`/${tower.status}.jpg`}
                alt="status"
                width={32}
                height={32}
              />
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
