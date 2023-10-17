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

const UserDashboard = () => {
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
              TE
            </Avatar>
            <List center spacing="sm">
              <List.Item
                icon={
                  <ThemeIcon size="md" variant="light">
                    <IconWriting style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                }
              >
                Herr Vorname Nachname
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon size="md" variant="light">
                    <IconMail style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                }
              >
                E-Mail
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon size="md" variant="light">
                    <IconPhone style={{ width: "70%", height: "70%" }} />
                  </ThemeIcon>
                }
              >
                01756352642
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
              <IconUser size={28} stroke={1.5} />
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
              events={[
                {
                  title: "Rettungsschwimmer",
                  date: new Date("2023-10-17T09:00:00"),
                },
                {
                  title: "Rettungsschwimmer",
                  date: new Date("2023-10-18T10:00:00"),
                },
                {
                  title: "Rettungsschwimmer",
                  date: new Date("2023-10-19T11:00:00"),
                },
                {
                  title: "Wachleiter",
                  date: new Date("2023-10-20T11:00:00"),
                },
              ]}
            />
          </Stack>
        </Card>
      </SimpleGrid>
    </>
  );
};

export default UserDashboard;
