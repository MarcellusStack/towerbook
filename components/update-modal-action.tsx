import { useActionNotification } from "@hooks/use-action-notification";
import { Button, Group, Stack, Text } from "@mantine/core";

export const UpdateModalAction = ({
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
    executeNotification: `${model} wird aktualisiert`,
    hideModals: true,
  });
  return (
    <Stack gap="md">
      <Text size="sm">
        Sind sie sicher, dass Sie diesen {model} aktualisieren wollen? Diese
        Aktion ist unwiderruflich.
      </Text>
      <Group gap="sm">
        <Button
          fullWidth
          loading={status === "executing"}
          onClick={() => {
            execute({ id: id });
          }}
        >
          {model} aktualisieren
        </Button>
      </Group>
    </Stack>
  );
};
