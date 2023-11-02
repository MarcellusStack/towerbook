import { useActionNotification } from "@hooks/use-action-notification";
import { Button, Group, Stack, Text } from "@mantine/core";

export const DeleteModalAction = ({
  id,
  action,
  model,
}: {
  id: string;
  action: any;
  model: string;
}) => {
  const { execute, result, status } = useActionNotification({
    action: action,
    executeNotification: `${model} wird gelöscht`,
    hideModals: true,
  });
  return (
    <Stack gap="md">
      <Text size="sm">
        Sind sie sicher, dass Sie diesen {model} löschen wollen? Diese Aktion
        ist unwiderruflich.
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
          {model} löschen
        </Button>
      </Group>
    </Stack>
  );
};
