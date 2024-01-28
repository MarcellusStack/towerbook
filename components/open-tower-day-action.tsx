"use client";
import { openTowerDay } from "@server/actions/open-tower-day";
import { useActionNotification } from "@hooks/use-action-notification";
import { Button, Card, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { IconDoorEnter } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useForm, zodResolver } from "@mantine/form";
import { openTowerdaySchema } from "@/schemas";
import { TimeInput } from "@mantine/dates";

export const OpenTowerDayAction = () => {
  const { id } = useParams();
  const { execute, result, status } = useActionNotification({
    action: openTowerDay,
    executeNotification: `Turm Tag wird eröffnet`,
  });

  const form = useForm({
    validate: zodResolver(openTowerdaySchema),
    initialValues: {
      id: id,
      startedAt: "",
    },
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
        <form
          className="w-full"
          onSubmit={form.onSubmit((values) => {
            execute(values);
          })}
        >
          <Group gap="sm" align="end" justify="center">
            <TimeInput
              className="min-w-[250px]"
              label="Öffnungszeit"
              {...form.getInputProps("startedAt")}
            />
            <Button type="submit" loading={status === "executing"}>
              Öffnen
            </Button>
          </Group>
        </form>
      </Stack>
    </Card>
  );
};
