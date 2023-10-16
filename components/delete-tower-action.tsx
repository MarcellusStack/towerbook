import { useActionNotification } from "@hooks/use-action-notification";
import { Button, Group, Stack, Text } from "@mantine/core";
import React from "react";
import { deleteTower } from "@server/actions/delete-tower";

export const DeleteTowerAction = ({ id }: { id: string }) => {
  const { execute, result, status } = useActionNotification({
    action: deleteTower,
    executeNotification: "Turm wird gelöscht",
    hideModals: true,
  });
  return (
    <Stack gap="md">
      <Text size="sm">
        Sind sie sicher, dass Sie diesen Turm löschen wollen? Diese Aktion ist
        unwiderruflich.
      </Text>

      <Group gap="sm">
        <Button
          fullWidth
          color="red"
          loading={status === "executing"}
          onClick={() => {
            execute({ id: id });
          }}
        >
          Turm löschen
        </Button>
      </Group>
    </Stack>
  );
};
