import { useActionNotification } from "@/hooks/use-action-notification";
import { completeTowerDayFormStatus } from "@/server/actions/complete-tower-day-form-status";
import { Button, Group } from "@mantine/core";
import { IconShieldLock } from "@tabler/icons-react";
import React from "react";
import { useParams } from "next/navigation";

export const TowerDayFormAction = ({
  updateStatus,
  form,
}: {
  updateStatus: boolean;
  form: string;
}) => {
  const complete = useActionNotification({
    action: completeTowerDayFormStatus,
    executeNotification: `Turm Tag wird aktualisiert`,
  });
  const { id } = useParams();
  return (
    <Group justify="flex-end" gap="sm">
      <Button variant="outline" type="submit" loading={updateStatus}>
        Speichern
      </Button>
      <Button
        leftSection={<IconShieldLock />}
        loading={complete.status === "executing"}
        onClick={() => {
          complete.execute({ id: id, form: form });
        }}
      >
        Abschließen
      </Button>
    </Group>
  );
};
