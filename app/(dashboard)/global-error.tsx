"use client";

import { Card, Stack, ThemeIcon, Text, Button, Group } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Stack
      gap="sm"
      align="center"
      justify="center"
      top="50%"
      left="50%"
      pos="absolute"
      className="-translate-x-1/2 -translate-y-1/2"
    >
      <Card withBorder>
        <Stack gap="sm" align="center" justify="center">
          <ThemeIcon size="xl">
            <IconExclamationCircle style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>
          <Text fw={700} size="lg" ta="center">
            Sie haben keinen Zugriff auf diese Seite oder es ist ein Fehler
            aufgetreten!
          </Text>
          <Text fw={500} size="md" ta="center" c="red">
            {error.message}
          </Text>
          <Group gap="sm">
            <Button component={Link} href="/" variant="light">
              Zur Startseite
            </Button>
            <Button variant="filled" onClick={() => reset()}>
              Erneut versuchen
            </Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
