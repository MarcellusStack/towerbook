import { useActionNotification } from "@hooks/use-action-notification";
import { deleteUser } from "@server/actions/delete-user";
import { Button, Group, Stack, Text } from "@mantine/core";
import React from "react";

export const DeleteUserAction = ({ userId }: { userId: string }) => {
  const { execute, result, status } = useActionNotification({
    action: deleteUser,
    executeNotification: "Benutzer wird gelöscht",
    hideModals: true,
  });
  return (
    <Stack gap="md">
      <Text size="sm">
        Sind sie sicher, dass Sie diesen Benutzer löschen wollen? Diese Aktion
        ist unwiderruflich.
      </Text>
      <Group gap="sm">
        <Button
          fullWidth
          color="red"
          loading={status === "executing"}
          onClick={() => {
            execute({ id: userId });
          }}
        >
          Benutzer löschen
        </Button>
      </Group>
    </Stack>
  );
};
