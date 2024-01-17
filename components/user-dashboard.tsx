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
import { type Profile } from "@prisma/client";
import { UserOverviewProps } from "@/server/queries/get-user-overview";

const UserDashboard = ({ user }: { user: UserOverviewProps }) => {
  return (
    <>
      <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm">
        <Card withBorder>
          <Stack gap="sm">
            <Group justify="space-between">
              <Text fw={700} size="xl">
                Informationen
              </Text>
              <IconUser size={28} stroke={1.5} />
            </Group>
            <Avatar color="blue" radius="xl">
              {user.firstName?.charAt(0)}
              {user.lastName?.charAt(0)}
            </Avatar>
            <List center spacing="sm">
              <List.Item
                icon={
                  <ThemeIcon size="md" variant="light">
                    <IconWriting style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                }
              >
                {user.firstName} {user.lastName}
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon size="md" variant="light">
                    <IconMail style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                }
              >
                {user.email}
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon size="md" variant="light">
                    <IconPhone style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                }
              >
                {user.phone}
              </List.Item>
            </List>
          </Stack>
        </Card>
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
      <SimpleGrid cols={2} spacing="sm" verticalSpacing="sm">
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
      </SimpleGrid>
    </>
  );
};

export default UserDashboard;
