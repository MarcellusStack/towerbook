"use client";
import {
  Box,
  Card,
  SimpleGrid,
  Stack,
  ThemeIcon,
  Text,
  ActionIcon,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";

export type Protocol = {
  id: string;
  link: string;
  name: string;
  icon: React.ReactNode;
};

export const Protocol = ({ props }: { props: Protocol }) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Card
      key={props.id}
      component={Link}
      href={props.link}
      onClick={() => startTransition(() => router.push(props.link))}
      padding="lg"
      radius="sm"
      withBorder
    >
      <Stack gap="md" align="center">
        <Box />
        <ActionIcon loading={isPending} size="xl" variant="light">
          {props.icon}
        </ActionIcon>
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
