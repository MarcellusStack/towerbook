import { convertDate } from "@/utils";
import {
  Card,
  Group,
  Stack,
  Text,
  List,
  ThemeIcon,
  Divider,
  Avatar,
} from "@mantine/core";
import {
  IconUser,
  IconWriting,
  IconMail,
  IconPhone,
  IconCalendarUser,
} from "@tabler/icons-react";
import React from "react";
import { UserLayoutProps } from "@users/[id]/_actions";

export const UserOverview = ({ user }: { user: UserLayoutProps }) => {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={700} size="xl">
            Benutzer
          </Text>
          <ThemeIcon variant="white" color="black" size="lg">
            <IconUser stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Divider />
        <Avatar color="blue" radius="xl">
          {user.firstName?.charAt(0)}
          {user.lastName?.charAt(0)}
        </Avatar>
        <List center spacing="sm">
          <List.Item
            icon={
              <ThemeIcon variant="light">
                <IconWriting style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {user.firstName} {user.lastName}
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon variant="light">
                <IconMail style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {user.email}
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon variant="light">
                <IconCalendarUser style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {convertDate(new Date(user.birthDate))}
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon variant="light">
                <IconPhone style={{ width: "70%", height: "70%" }} />
              </ThemeIcon>
            }
          >
            {user.phone}
          </List.Item>
        </List>
      </Stack>
    </Card>
  );
};
