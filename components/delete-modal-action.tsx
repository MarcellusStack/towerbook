import { useActionNotification } from "@hooks/use-action-notification";
import { Button, Stack, Text } from "@mantine/core";

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
      <Text c="dimmed" size="sm">
        Diese Aktion ist unwiderruflich.
      </Text>

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
    </Stack>
  );
};
