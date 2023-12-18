"use client";
import { openTowerDay } from "@server/actions/open-tower-day";
import { useActionNotification } from "@hooks/use-action-notification";
import { Button, Card, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconDoorEnter } from "@tabler/icons-react";
import { useParams } from "next/navigation";

export const OpenTowerDayAction = () => {
  const { id } = useParams();
  const { execute, result, status } = useActionNotification({
    action: openTowerDay,
    executeNotification: `Turm Tag wird eröffnet`,
  });
  return (
    <Card padding="lg" radius="sm" withBorder>
      <Stack gap="md" align="center">
        <ThemeIcon size="xl" variant="light">
          <IconDoorEnter style={{ width: "70%", height: "70%" }} />
        </ThemeIcon>
        <Text fw={700} size="xl">
          Eröffnen sie den Turm-Tag
        </Text>
        <Button
          loading={status === "executing"}
          onClick={() => {
            execute({ id: id });
          }}
        >
          Öffnen
        </Button>
      </Stack>
    </Card>
  );
};
