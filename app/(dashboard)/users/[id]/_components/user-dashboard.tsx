"use client";
import React from "react";
import {
  Avatar,
  Card,
  Group,
  List,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
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
import dayGridPlugin from "@fullcalendar/daygrid";
import { DashboardLoader } from "@/components/loader/dashboard-loader";
import { useParams } from "next/navigation";
import { useGetUserOverview } from "@users/[id]/_data";

export const UserDashboard = () => {
  const { id } = useParams();
  const { data: user, isPending } = useGetUserOverview(id as string);

  if (isPending || !user) return <DashboardLoader />;
  return (
    <Stack gap="sm">
      <SimpleGrid cols={3} spacing="sm" verticalSpacing="sm">
        <Card withBorder>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={700} size="xl">
                Turm Berechtigungen
              </Text>
              <IconBuildingBroadcastTower size={28} stroke={1.5} />
            </Group>
          </Stack>
        </Card>
        <Card withBorder></Card>
        <Card withBorder></Card>
      </SimpleGrid>

      <Card withBorder>
        <Stack>
          <Group justify="space-between">
            <Text fw={700} size="xl">
              Dienstplan
            </Text>
            <IconCalendar size={28} stroke={1.5} />
          </Group>
          <FullCalendar
            height={720}
            locales={[deLocale]}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={user.shifts.map((shift, index) => ({
              index: index,
              id: shift.id,

              /* title: `${shift.user.firstName} ${shift.user.lastName}`, */
              start: shift.startTime,
              end: shift.endTime,
              color: shift.type === "duty" ? "green" : "gray",
            }))}
          />
        </Stack>
      </Card>
    </Stack>
  );
};
