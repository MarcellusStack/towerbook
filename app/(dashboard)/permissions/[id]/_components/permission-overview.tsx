import {
  Card,
  Group,
  Stack,
  Text,
  List,
  ListItem,
  ThemeIcon,
  Divider,
} from "@mantine/core";
import {
  IconUserShield,
  IconUsers,
  IconFileDescription,
  IconShield,
} from "@tabler/icons-react";
import React from "react";
import { PermissionProps } from "@permissions/[id]/_actions";

export const PermissionOverview = ({
  permission,
}: {
  permission: PermissionProps;
}) => {
  return (
    <Card withBorder>
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={700} size="xl">
            Berechtigung
          </Text>
          <IconUserShield size={28} stroke={1.5} />
        </Group>
        <Divider />
        <List center spacing="sm">
          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconShield
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            {permission.name}
          </ListItem>

          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconFileDescription
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            {permission.description}
          </ListItem>
          <ListItem
            icon={
              <ThemeIcon variant="light">
                <IconUsers
                  style={{ width: "70%", height: "70%" }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            {permission.users.length}
          </ListItem>
        </List>
      </Stack>
    </Card>
  );
};
