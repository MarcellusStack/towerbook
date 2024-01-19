"use client";
import { Button, Card, Stack, Text, ThemeIcon } from "@mantine/core";
import { useRouter } from "next/navigation";
import { IconError404 } from "@tabler/icons-react";

export default function NotFound() {
  const router = useRouter();
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
            <IconError404 style={{ width: "70%", height: "70%" }} />
          </ThemeIcon>
          <Text fw={700} size="lg" ta="center">
            Die von Ihnen gesuchte Seite ist nicht verfügbar!
          </Text>
          <Button
            variant="filled"
            onClick={() => {
              router.back();
            }}
          >
            Zurück
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}
