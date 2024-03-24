import { Card, type CardProps, Group, Stack, Text } from "@mantine/core";
import React from "react";

export type DashboardCardProps = CardProps & {
  title: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export const DashboardCard = ({
  title,
  icon,
  children,
  ...props
}: DashboardCardProps) => {
  return (
    <Card {...props} withBorder p="sm" h="100%">
      <Stack gap="sm" justify="space-between" h="100%">
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
