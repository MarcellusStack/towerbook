"use client";
import { Box, Card, SimpleGrid, Stack, ThemeIcon, Text } from "@mantine/core";
import { IconWriting } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export type Protocol = {
  id: string;
  link: string;
  name: string;
  icon: React.ReactNode;
};

export const Protocol = ({ props }: { props: Protocol }) => {
  return (
    <Card
      key={props.id}
      component={Link}
      href={props.link}
      padding="lg"
      radius="sm"
      withBorder
    >
      <Stack gap="md" align="center">
        <Box />
        <ThemeIcon size="xl" variant="light">
          {props.icon}
        </ThemeIcon>
        <Text fw={700} size="xl" ta="center">
          {props.name}
        </Text>
      </Stack>
    </Card>
  );
};

export const Protocols = ({ protocols }: { protocols: Protocol[] }) => {
  return (
    <SimpleGrid cols={6} spacing="sm" verticalSpacing="sm">
      {protocols.map((protocol) => (
        <Protocol key={protocol.id} props={protocol} />
      ))}
    </SimpleGrid>
  );
};

export default Protocols;
