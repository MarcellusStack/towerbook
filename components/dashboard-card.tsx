import { Card, Group, Stack, Text } from "@mantine/core";
import React from "react";

export type DashboardCardProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export const DashboardCard = ({
  title,
  icon,
  children,
}: DashboardCardProps) => {
  return (
    <Card withBorder p="sm">
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={700} size="xl">
            {title}
          </Text>
          {icon}
        </Group>
        {children}
      </Stack>
    </Card>
  );
};
